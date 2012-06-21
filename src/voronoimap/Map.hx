package voronoimap;

import as3.ConversionCore;
import as3.PointCore;
import as3.Rectangle;
import as3.TypeDefs;
import com.nodename.delaunay.Voronoi;
import com.nodename.geom.LineSegment;
import de.polygonal.math.PM_PRNG;
import haxe.Timer;
import voronoimap.graph.Center;
import voronoimap.graph.Corner;
import voronoimap.graph.Edge;

using Lambda;
using as3.ConversionCore;
using as3.PointCore;

class Map {

    public var NUM_POINTS:Int;
    public var LAKE_THRESHOLD:Number;
    public var NUM_LLOYD_ITERATIONS:Int;
	public var RIVER_CHANCE:Int;

    // Passed in by the caller:
    public var SIZE:Size;
    
    // Island shape is controlled by the islandRandom seed and the
    // type of island, passed in when we set the island shape. The
    // islandShape function uses both of them to determine whether any
    // point should be water or land.
    public var islandShape:Point->Boolean;

    // Island details are controlled by this random generator. The
    // initial map upon loading is always deterministic, but
    // subsequent maps reset this random number generator with a
    // random seed.
    public var mapRandom:PM_PRNG;
	
    // These store the graph data
    public var points:Vector<Point>;  // Only useful during map construction
    public var centers:Vector<Center>;
    public var corners:Vector<Corner>;
    public var edges:Vector<Edge>;

	/**
	 * Make a new map.
	 * @param	size width and height of map
	 * @param	numPoints default = 1000
	 * @param	lakeThreshold 0 to 1, fraction of water corners for water polygon, default = 0.3
	 * @param	numlLloydIterations default = 2
	 * @param	riverChance 0 = no rivers, > 0 = more rivers, default = map area / 4
	 */
	public function new(size:Size, numPoints = 1000, lakeThreshold = 0.3, numlLloydIterations = 2, riverChance:Int = null) {
		mapRandom = new PM_PRNG();
		SIZE = size;
		NUM_POINTS = numPoints;
		LAKE_THRESHOLD = lakeThreshold;
		NUM_LLOYD_ITERATIONS = numlLloydIterations;
		RIVER_CHANCE = riverChance.isNull() ? Std.int((SIZE.width + SIZE.height) / 4) : riverChance;
		reset();
	}
	
    // Random parameters governing the overall shape of the island
    public function newIsland(islandShape:Point->Boolean, variant:Int):Void {
      this.islandShape = islandShape;
      mapRandom.seed = variant;
    }
    
    public function reset():Void {
      var p:Center, q:Corner, edge:Edge;

      // Break cycles so the garbage collector will release data.
      if (points != null) {
        points.splice(0, points.length);
      }
      if (edges != null) {
        for (edge in edges) {
            edge.d0 = edge.d1 = null;
            edge.v0 = edge.v1 = null;
          }
        edges.splice(0, edges.length);
      }
      if (centers != null) {
        for (p in centers) {
            p.neighbors.splice(0, p.neighbors.length);
            p.corners.splice(0, p.corners.length);
            p.borders.splice(0, p.borders.length);
          }
        centers.splice(0, centers.length);
      }
      if (corners != null) {
        for (q in corners) {
            q.adjacent.splice(0, q.adjacent.length);
            q.touches.splice(0, q.touches.length);
            q.protrudes.splice(0, q.protrudes.length);
            q.downslope = null;
            q.watershed = null;
          }
        corners.splice(0, corners.length);
      }
	      // Clear the previous graph data.
      if (points == null) points = new Vector<Point>();
      if (edges == null) edges = new Vector<Edge>();
      if (centers == null) centers = new Vector<Center>();
      if (corners == null) corners = new Vector<Corner>();
      
	  // Disabled for Haxe
      //System.gc();
    }
	
	/**
	 * Generate the initial random set of points.
	 */
	public function go0PlacePoints() : Void {
		reset();
		points = generateRandomPoints();
	}
	
	public function go1ImprovePoints() : Void {
		improveRandomPoints(points);
	}
	
	/**
	 * Create a graph structure from the Voronoi edge list. The
     * methods in the Voronoi object are somewhat inconvenient for
     * my needs, so I transform that data into the data I actually
     * need: edges connected to the Delaunay triangles and the
     * Voronoi polygons, a reverse map from those four points back
     * to the edge, a map from these four points to the points
     * they connect to (both along the edge and crosswise).
	 */
	public function go2BuildGraph() : Void {
	   var voronoi:Voronoi = new Voronoi(points, null, new Rectangle(0, 0, SIZE.width, SIZE.height));
	   buildGraph(points, voronoi);
	   improveCorners();
	   voronoi.dispose();
	   voronoi = null;
	   points = null;
	}
	
	public function go3AssignElevations() : Void {
		// Determine the elevations and water at Voronoi corners.
		assignCornerElevations();

		// Determine polygon and corner type: ocean, coast, land.
		assignOceanCoastAndLand();

		// Rescale elevations so that the highest is 1.0, and they're
		// distributed well. We want lower elevations to be more common
		// than higher elevations, in proportions approximately matching
		// concentric rings. That is, the lowest elevation is the
		// largest ring around the island, and therefore should more
		// land area than the highest elevation, which is the very
		// center of a perfectly circular island.
		redistributeElevations(landCorners(corners));

		// Assign elevations to non-land corners
		for (q in corners) {
			if (q.ocean || q.coast) {
				q.elevation = 0.0;
			}
		}

		// Polygon elevations are the average of their corners
		assignPolygonElevations();
	}
	
	public function go4AssignMoisture() : Void {
		// Determine downslope paths.
		calculateDownslopes();

		// Determine watersheds: for every corner, where does it flow
		// out into the ocean? 
		calculateWatersheds();

		// Create rivers.
		createRivers(RIVER_CHANCE);

		// Determine moisture at corners, starting at rivers
		// and lakes, but not oceans. Then redistribute
		// moisture to cover the entire range evenly from 0.0
		// to 1.0. Then assign polygon moisture as the average
		// of the corner moisture.
		assignCornerMoisture();
		redistributeMoisture(landCorners(corners));
		assignPolygonMoisture();		
	}
	
	public function go5DecorateMap() : Void {
		assignBiomes();
	}

    // Generate random points and assign them to be on the island or
    // in the water. Some water points are inland lakes; others are
    // ocean. We'll determine ocean later by looking at what's
    // connected to ocean.
    public function generateRandomPoints():Vector<Point> {
      var p:Point, i:Int, points:Vector<Point> = new Vector<Point>();
      for (i in 0...NUM_POINTS) {
        p = {x:mapRandom.nextDoubleRange(10, SIZE.width-10),
		y:mapRandom.nextDoubleRange(10, SIZE.height-10) };
        points.push(p);
      }
      return points;
    }
	
    // Improve the random set of points with Lloyd Relaxation.
    public function improveRandomPoints(points:Vector<Point>):Void {
      // We'd really like to generate "blue noise". Algorithms:
      // 1. Poisson dart throwing: check each new point against all
      //     existing points, and reject it if it's too close.
      // 2. Start with a hexagonal grid and randomly perturb points.
      // 3. Lloyd Relaxation: move each point to the centroid of the
      //     generated Voronoi polygon, then generate Voronoi again.
      // 4. Use force-based layout algorithms to push points away.
      // 5. More at http://www.cs.virginia.edu/~gfx/pubs/antimony/
      // Option 3 is implemented here. If it's run for too many iterations,
      // it will turn into a grid, but convergence is very slow, and we only
      // run it a few times.

      var i:Int, p:Point, q:Point, voronoi:Voronoi, region:Vector<Point>;
      for (i in 0...NUM_LLOYD_ITERATIONS) {
        voronoi = new Voronoi(points, null, new Rectangle(0, 0, SIZE.width, SIZE.height));
        for (p in points) {
            region = voronoi.region(p);
            p.x = 0.0;
            p.y = 0.0;
            for (q in region) {
                p.x += q.x;
                p.y += q.y;
              }
            p.x /= region.length;
            p.y /= region.length;
            region.splice(0, region.length);
          }
        voronoi.dispose();
      }
    }
	
    // Although Lloyd relaxation improves the uniformity of polygon
    // sizes, it doesn't help with the edge lengths. Short edges can
    // be bad for some games, and lead to weird artifacts on
    // rivers. We can easily lengthen short edges by moving the
    // corners, but **we lose the Voronoi property**.  The corners are
    // moved to the average of the polygon centers around them. Short
    // edges become longer. Long edges tend to become shorter. The
    // polygons tend to be more uniform after this step.
    public function improveCorners():Void {
      var newCorners:Vector<Point> = new Vector<Point>();
      var q:Corner, r:Center, point:Point, i:Int, edge:Edge;

      // First we compute the average of the centers next to each corner.
      for (q in corners) {
          if (q.border) {
            newCorners[q.index] = q.point;
          } else {
            point = {x:0.0, y:0.0};
            for (r in q.touches) {
                point.x += r.point.x;
                point.y += r.point.y;
              }
            point.x /= q.touches.length;
            point.y /= q.touches.length;
            newCorners[q.index] = point;
          }
        }

      // Move the corners to the new locations.
      for (i in 0...corners.length) {
        corners[i].point = newCorners[i];
      }

      // The edge midpoints were computed for the old corners and need
      // to be recomputed.
      for (edge in edges) {
          if (edge.v0 != null && edge.v1 != null) {
            edge.midpoint = PointCore.interpolate(edge.v0.point, edge.v1.point, 0.5);
          }
        }
    }
	
    // Create an array of corners that are on land only, for use by
    // algorithms that work only on land.  We return an array instead
    // of a vector because the redistribution algorithms want to sort
    // this array using Array.sortOn.
    public function landCorners(corners:Vector<Corner>):Array<Corner> {
      var q:Corner, locations:Array<Corner> = [];
      for (q in corners) {
          if (!q.ocean && !q.coast) {
            locations.push(q);
          }
        }
      return locations;
    }
	
    // Build graph data structure in 'edges', 'centers', 'corners',
    // based on information in the Voronoi results: point.neighbors
    // will be a list of neighboring points of the same type (corner
    // or center); point.edges will be a list of edges that include
    // that point. Each edge connects to four points: the Voronoi edge
    // edge.{v0,v1} and its dual Delaunay triangle edge edge.{d0,d1}.
    // For boundary polygons, the Delaunay edge will have one null
    // point, and the Voronoi edge may be null.
    public function buildGraph(points:Vector<Point>, voronoi:Voronoi):Void {
      var p:Center, q:Corner, point:Point, other:Point;
      var libedges:Vector<com.nodename.delaunay.Edge> = voronoi.edges();
      var centerLookup:Dictionary<Center> = new Dictionary<Center>();

      // Build Center objects for each of the points, and a lookup map
      // to find those Center objects again as we build the graph
      for (point in points) {
          p = new Center();
          p.index = centers.length;
          p.point = point;
          p.neighbors = new  Vector<Center>();
          p.borders = new Vector<Edge>();
          p.corners = new Vector<Corner>();
          centers.push(p);
          centerLookup.set(point.hash(), p);
        }
      
      // Workaround for Voronoi lib bug: we need to call region()
      // before Edges or neighboringSites are available
      for (p in centers) {
          voronoi.region(p.point);
        }
      
      // The Voronoi library generates multiple Point objects for
      // corners, and we need to canonicalize to one Corner object.
      // To make lookup fast, we keep an array of Points, bucketed by
      // x value, and then we only have to look at other Points in
      // nearby buckets. When we fail to find one, we'll create a new
      // Corner object.
      var _cornerMap:Array<Array<Corner>> = [];
      function makeCorner(point:Point):Corner {
        var q:Corner;
        
        if (point == null) return null;
		var bucket:Int;
		for (bucket in Std.int(point.x) - 1...Std.int(point.x) + 2) {
			if (_cornerMap[bucket] != null) {
				for (q in _cornerMap[bucket]) {
				  var dx:Number = point.x - q.point.x;
				  var dy:Number = point.y - q.point.y;
				  if (dx * dx + dy * dy < 1e-6) {
					return q;
				  }
				}
			}
        }
        bucket = Std.int(point.x);
        if (_cornerMap[bucket] == null) _cornerMap[bucket] = [];
        q = new Corner();
        q.index = corners.length;
        corners.push(q);
        q.point = point;
        q.border = (point.x == 0 || point.x == SIZE.width
                    || point.y == 0 || point.y == SIZE.height);
        q.touches = new Vector<Center>();
        q.protrudes = new Vector<Edge>();
        q.adjacent = new Vector<Corner>();
        _cornerMap[bucket].push(q);
        return q;
      }
    
      for (libedge in libedges) {
          var dedge:LineSegment = libedge.delaunayLine();
          var vedge:LineSegment = libedge.voronoiEdge();

          // Fill the graph data. Make an Edge object corresponding to
          // the edge from the voronoi library.
          var edge:Edge = new Edge();
          edge.index = edges.length;
          edge.river = 0;
          edges.push(edge);
          edge.midpoint = if(vedge.p0 != null && vedge.p1 != null) PointCore.interpolate(vedge.p0, vedge.p1, 0.5);
		  
          // Edges point to corners. Edges point to centers. 
          edge.v0 = makeCorner(vedge.p0);
          edge.v1 = makeCorner(vedge.p1);
          edge.d0 = centerLookup.get(dedge.p0.hash());
          edge.d1 = centerLookup.get(dedge.p1.hash());

          // Centers point to edges. Corners point to edges.
          if (edge.d0 != null) { edge.d0.borders.push(edge); }
          if (edge.d1 != null) { edge.d1.borders.push(edge); }
          if (edge.v0 != null) { edge.v0.protrudes.push(edge); }
          if (edge.v1 != null) { edge.v1.protrudes.push(edge); }

          function addToCornerList(v:Vector<Corner>, x:Corner):Void {
            if (x != null && v.indexOf(x) < 0) { v.push(x);}
          }
          function addToCenterList(v:Vector<Center>, x:Center):Void {
            if (x != null && v.indexOf(x) < 0) { v.push(x); }
          }
          
          // Centers point to centers.
          if (edge.d0 != null && edge.d1 != null) {
            addToCenterList(edge.d0.neighbors, edge.d1);
            addToCenterList(edge.d1.neighbors, edge.d0);
          }

          // Corners point to corners
          if (edge.v0 != null && edge.v1 != null) {
            addToCornerList(edge.v0.adjacent, edge.v1);
            addToCornerList(edge.v1.adjacent, edge.v0);
          }

          // Centers point to corners
          if (edge.d0 != null) {
            addToCornerList(edge.d0.corners, edge.v0);
            addToCornerList(edge.d0.corners, edge.v1);
          }
          if (edge.d1 != null) {
            addToCornerList(edge.d1.corners, edge.v0);
            addToCornerList(edge.d1.corners, edge.v1);
          }

          // Corners point to centers
          if (edge.v0 != null) {
            addToCenterList(edge.v0.touches, edge.d0);
            addToCenterList(edge.v0.touches, edge.d1);
          }
          if (edge.v1 != null) {
            addToCenterList(edge.v1.touches, edge.d0);
            addToCenterList(edge.v1.touches, edge.d1);
          }
        }
    }

    // Determine elevations and water at Voronoi corners. By
    // construction, we have no local minima. This is important for
    // the downslope vectors later, which are used in the river
    // construction algorithm. Also by construction, inlets/bays
    // push low elevation areas inland, which means many rivers end
    // up flowing out through them. Also by construction, lakes
    // often end up on river paths because they don't raise the
    // elevation as much as other terrain does.
    public function assignCornerElevations():Void {
      var q:Corner, s:Corner;
      var queue:Array<Corner> = [];
      
      for (q in corners) {
          q.water = !inside(q.point);
        }

      for (q in corners) {
          // The edges of the map are elevation 0
          if (q.border) {
            q.elevation = 0.0;
            queue.push(q);
          } else {
            q.elevation = Math.POSITIVE_INFINITY;
          }
        }
      // Traverse the graph and assign elevations to each point. As we
      // move away from the map border, increase the elevations. This
      // guarantees that rivers always have a way down to the coast by
      // going downhill (no local minima).
      while (queue.length > 0) {
        q = queue.shift();

        for (s in q.adjacent) {
            // Every step up is epsilon over water or 1 over land. The
            // number doesn't matter because we'll rescale the
            // elevations later.
            var newElevation:Number = 0.01 + q.elevation;
            if (!q.water && !s.water) {
              newElevation += 1;
            }
            // If this point changed, we'll add it to the queue so
            // that we can process its neighbors too.
            if (newElevation < s.elevation) {
              s.elevation = newElevation;
              queue.push(s);
            }
          }
      }
    }
	
    // Change the overall distribution of elevations so that lower
    // elevations are more common than higher
    // elevations. Specifically, we want elevation X to have frequency
    // (1-X).  To do this we will sort the corners, then set each
    // corner to its desired elevation.
    public function redistributeElevations(locations:Array<Corner>):Void {
      // SCALE_FACTOR increases the mountain area. At 1.0 the maximum
      // elevation barely shows up on the map, so we set it to 1.1.
      var SCALE_FACTOR:Number = 1.1;
      var i:Int, y:Number, x:Number;

	  //Haxe port
      //locations.sortOn('elevation', Array.NUMERIC);
	  locations.sort(function(c1, c2) {
		  if (c1.elevation > c2.elevation) return 1;
		  if (c1.elevation < c2.elevation) return -1;
 		  if (c1.index > c2.index) return 1;
		  if (c1.index < c2.index) return -1;
		  return 0;
	  } );
	  
      for (i in 0...locations.length) {
        // Let y(x) be the total area that we want at elevation <= x.
        // We want the higher elevations to occur less than lower
        // ones, and set the area to be y(x) = 1 - (1-x)^2.
        y = i/(locations.length-1);
        // Now we have to solve for x, given the known y.
        //  *  y = 1 - (1-x)^2
        //  *  y = 1 - (1 - 2x + x^2)
        //  *  y = 2x - x^2
        //  *  x^2 - 2x + y = 0
        // From this we can use the quadratic equation to get:
        x = Math.sqrt(SCALE_FACTOR) - Math.sqrt(SCALE_FACTOR * (1 - y));
        if (x > 1.0) x = 1.0;  // TODO: does this break downslopes?
        locations[i].elevation = x;
      }
    }	
	
    // Change the overall distribution of moisture to be evenly distributed.
    public function redistributeMoisture(locations:Array<Corner>):Void {
      var i:Int;
      
	  locations.sort(function(c1, c2) {
		  if (c1.moisture > c2.moisture) return 1;
		  if (c1.moisture < c2.moisture) return -1;
 		  if (c1.index > c2.index) return 1;
		  if (c1.index < c2.index) return -1;
		  return 0;
	  } );
	  
      for (i in 0...locations.length) {
        locations[i].moisture = i / (locations.length - 1);
      }
    }
	
    // Determine polygon and corner types: ocean, coast, land.
    public function assignOceanCoastAndLand():Void {
      // Compute polygon attributes 'ocean' and 'water' based on the
      // corner attributes. Count the water corners per
      // polygon. Oceans are all polygons connected to the edge of the
      // map. In the first pass, mark the edges of the map as ocean;
      // in the second pass, mark any water-containing polygon
      // connected an ocean as ocean.
      var queue:Array<Center> = [];
      var p:Center, q:Corner, r:Center, numWater:Int;
      
      for (p in centers) {
          numWater = 0;
          for (q in p.corners) {
              if (q.border) {
                p.border = true;
                p.ocean = true;
                q.water = true;
                queue.push(p);
              }
              if (q.water) {
                numWater += 1;
              }
            }
          p.water = (p.ocean || numWater >= p.corners.length * LAKE_THRESHOLD);
        }
      while (queue.length > 0) {
        p = queue.shift();
        for (r in p.neighbors) {
            if (r.water && !r.ocean) {
              r.ocean = true;
              queue.push(r);
            }
          }
      }
      
      // Set the polygon attribute 'coast' based on its neighbors. If
      // it has at least one ocean and at least one land neighbor,
      // then this is a coastal polygon.
      for (p in centers) {
          var numOcean:Int = 0;
          var numLand:Int = 0;
          for (r in p.neighbors) {
              numOcean += r.ocean.intFromBoolean();
              numLand += (!r.water).intFromBoolean();
            }
          p.coast = (numOcean > 0) && (numLand > 0);
        }


      // Set the corner attributes based on the computed polygon
      // attributes. If all polygons connected to this corner are
      // ocean, then it's ocean; if all are land, then it's land;
      // otherwise it's coast.
      for (q in corners) {
          var numOcean:Int = 0;
          var numLand:Int = 0;
          for (p in q.touches) {
              numOcean += p.ocean.intFromBoolean();
              numLand += (!p.water).intFromBoolean();
            }
          q.ocean = (numOcean == q.touches.length);
          q.coast = (numOcean > 0) && (numLand > 0);
          q.water = q.border || ((numLand != q.touches.length) && !q.coast);
        }
    }
	
    // Polygon elevations are the average of the elevations of their corners.
    public function assignPolygonElevations():Void {
      var p:Center, q:Corner, sumElevation:Number;
      for (p in centers) {
          sumElevation = 0.0;
          for (q in p.corners) {
              sumElevation += q.elevation;
            }
          p.elevation = sumElevation / p.corners.length;
        }
    }

    // Calculate downslope pointers.  At every point, we point to the
    // point downstream from it, or to itself.  This is used for
    // generating rivers and watersheds.
    public function calculateDownslopes():Void {
      var q:Corner, s:Corner, r:Corner;
      
      for (q in corners) {
          r = q;
          for (s in q.adjacent) {
              if (s.elevation <= r.elevation) {
                r = s;
              }
            }
          q.downslope = r;
        }
    }
	
    // Calculate the watershed of every land point. The watershed is
    // the last downstream land point in the downslope graph. TODO:
    // watersheds are currently calculated on corners, but it'd be
    // more useful to compute them on polygon centers so that every
    // polygon can be marked as being in one watershed.
    public function calculateWatersheds():Void {
      var q:Corner, r:Corner, i:Int, changed:Boolean;
      
      // Initially the watershed pointer points downslope one step.      
      for (q in corners) {
          q.watershed = q;
          if (!q.ocean && !q.coast) {
            q.watershed = q.downslope;
          }
        }
      // Follow the downslope pointers to the coast. Limit to 100
      // iterations although most of the time with NUM_POINTS=2000 it
      // only takes 20 iterations because most points are not far from
      // a coast.  TODO: can run faster by looking at
      // p.watershed.watershed instead of p.downslope.watershed.
      for (i in 0...100) {
        changed = false;
        for (q in corners) {
            if (!q.ocean && !q.coast && !q.watershed.coast) {
              r = q.downslope.watershed;
              if (!r.ocean) q.watershed = r;
              changed = true;
            }
          }
        if (!changed) break;
      }
      // How big is each watershed?
      for (q in corners) {
          r = q.watershed;
		  
		  //Haxe port
		  //r.watershed_size = 1 + (r.watershed_size || 0);
		  r.watershed_size = 1 + (r.watershed_size.isNull() ? 0 : r.watershed_size);
        }
    }
	
	/**
	 * Create rivers along edges. Pick a random corner point,
	 * then move downslope. Mark the edges and corners as rivers.
	 * @param	riverChance Higher = more rivers.
	 */
    public function createRivers(riverChance:Int):Void {
      var i:Int, q:Corner, edge:Edge;
      
      for (i in 0...riverChance) {
        q = corners[mapRandom.nextIntRange(0, corners.length-1)];
        if (q.ocean || q.elevation < 0.3 || q.elevation > 0.9) continue;
        // Bias rivers to go west: if (q.downslope.x > q.x) continue;
        while (!q.coast) {
          if (q == q.downslope) {
            break;
          }
          edge = lookupEdgeFromCorner(q, q.downslope);
          edge.river = edge.river + 1;
		  
		  //Haxe port
          //q.river = (q.river || 0) + 1;
		  q.river = (q.river.isNull() ? 0 : q.river) + 1;
		  
		  //Haxe port
          //q.downslope.river = (q.downslope.river || 0) + 1;  // TODO: fix double count
		  q.downslope.river = (q.downslope.river.isNull() ? 0 : q.downslope.river) + 1;
		  
          q = q.downslope;
        }
      }
    }

    // Calculate moisture. Freshwater sources spread moisture: rivers
    // and lakes (not oceans). Saltwater sources have moisture but do
    // not spread it (we set it at the end, after propagation).
    public function assignCornerMoisture():Void {
      var q:Corner, r:Corner, newMoisture:Number;
      var queue:Array<Corner> = [];
      // Fresh water
      for (q in corners) {
          if ((q.water || q.river > 0) && !q.ocean) {
            q.moisture = q.river > 0? Math.min(3.0, (0.2 * q.river)) : 1.0;
            queue.push(q);
          } else {
            q.moisture = 0.0;
          }
        }
      while (queue.length > 0) {
        q = queue.shift();

        for (r in q.adjacent) {
            newMoisture = q.moisture * 0.9;
            if (newMoisture > r.moisture) {
              r.moisture = newMoisture;
              queue.push(r);
            }
          }
      }
      // Salt water
      for (q in corners) {
          if (q.ocean || q.coast) {
            q.moisture = 1.0;
          }
        }
    }
	
    // Polygon moisture is the average of the moisture at corners
    public function assignPolygonMoisture():Void {
      var p:Center, q:Corner, sumMoisture:Number;
      for (p in centers) {
          sumMoisture = 0.0;
          for (q in p.corners) {
              if (q.moisture > 1.0) q.moisture = 1.0;
              sumMoisture += q.moisture;
            }
          p.moisture = sumMoisture / p.corners.length;
        }
    }

    // Assign a biome type to each polygon. If it has
    // ocean/coast/water, then that's the biome; otherwise it depends
    // on low/high elevation and low/medium/high moisture. This is
    // roughly based on the Whittaker diagram but adapted to fit the
    // needs of the island map generator.
    static public function getBiome(p:Center):String {
      if (p.ocean) {
        return 'OCEAN';
      } else if (p.water) {
        if (p.elevation < 0.1) return 'MARSH';
        if (p.elevation > 0.8) return 'ICE';
        return 'LAKE';
      } else if (p.coast) {
        return 'BEACH';
      } else if (p.elevation > 0.8) {
        if (p.moisture > 0.50) return 'SNOW';
        else if (p.moisture > 0.33) return 'TUNDRA';
        else if (p.moisture > 0.16) return 'BARE';
        else return 'SCORCHED';
      } else if (p.elevation > 0.6) {
        if (p.moisture > 0.66) return 'TAIGA';
        else if (p.moisture > 0.33) return 'SHRUBLAND';
        else return 'TEMPERATE_DESERT';
      } else if (p.elevation > 0.3) {
        if (p.moisture > 0.83) return 'TEMPERATE_RAIN_FOREST';
        else if (p.moisture > 0.50) return 'TEMPERATE_DECIDUOUS_FOREST';
        else if (p.moisture > 0.16) return 'GRASSLAND';
        else return 'TEMPERATE_DESERT';
      } else {
        if (p.moisture > 0.66) return 'TROPICAL_RAIN_FOREST';
        else if (p.moisture > 0.33) return 'TROPICAL_SEASONAL_FOREST';
        else if (p.moisture > 0.16) return 'GRASSLAND';
        else return 'SUBTROPICAL_DESERT';
      }
    }
	
    public function assignBiomes():Void {
      var p:Center;
      for (p in centers) {
          p.biome = getBiome(p);
        }
    }

    // Look up a Voronoi Edge object given two adjacent Voronoi
    // polygons, or two adjacent Voronoi corners
    public function lookupEdgeFromCenter(p:Center, r:Center):Edge {
      for (edge in p.borders) {
          if (edge.d0 == r || edge.d1 == r) return edge;
        }
      return null;
    }

    public function lookupEdgeFromCorner(q:Corner, s:Corner):Edge {
      for (edge in q.protrudes) {
          if (edge.v0 == s || edge.v1 == s) return edge;
        }
      return null;
    }
	
    // Determine whether a given point should be on the island or in the water.
    public function inside(p:Point):Boolean {
      return islandShape({x:2*(p.x/SIZE.width - 0.5), y : 2*(p.y/SIZE.height - 0.5)});
    }
}