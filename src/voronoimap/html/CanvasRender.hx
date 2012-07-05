package voronoimap.html;

import as3.Matrix;
import as3.PointCore;
import as3.Vector3D;
import as3.TypeDefs;
import co.janicek.core.array.Array2dCore;
import co.janicek.core.html.CanvasCore;
import co.janicek.core.html.HtmlColorCore;
import co.janicek.core.math.PerlinNoise;
import co.janicek.core.math.RandomCore;
import haxe.Timer;
import html5.Canvas;
import html5.CanvasRenderingContext2D;
import js.Lib;
import voronoimap.graph.Center;
import voronoimap.graph.Corner;
import voronoimap.graph.Edge;
import voronoimap.IslandShape;
import voronoimap.Lava;
import voronoimap.Map;
import voronoimap.NoisyEdges;
import voronoimap.Roads;
import voronoimap.Watersheds;

using as3.ConversionCore;
using as3.PointCore;
using co.janicek.core.array.Array2dCore;
using co.janicek.core.NullCore;
using Lambda;
using Std;

typedef DisplayColors = {
	OCEAN : Int,
	COAST: Int,
	LAKESHORE: Int,
	LAKE: Int,
	RIVER: Int,
	MARSH: Int,
	ICE: Int,
	BEACH: Int,
	ROAD1: Int,
	ROAD2: Int,
	ROAD3: Int,
	BRIDGE: Int,
	LAVA: Int,

	// Terrain
	SNOW: Int,
	TUNDRA: Int,
	BARE: Int,
	SCORCHED: Int,
	TAIGA: Int,
	SHRUBLAND: Int,
	TEMPERATE_DESERT: Int,
	TEMPERATE_RAIN_FOREST: Int,
	TEMPERATE_DECIDUOUS_FOREST: Int,
	GRASSLAND: Int,
	SUBTROPICAL_DESERT: Int,
	TROPICAL_RAIN_FOREST: Int,
	TROPICAL_SEASONAL_FOREST: Int
}

typedef ElevationGradientColors = {
	OCEAN: Int,
	GRADIENT_LOW: Int,
	GRADIENT_HIGH: Int
};

class CanvasRender {
	
	public static function graphicsReset(c:CanvasRenderingContext2D, mapWidth:Int, mapHeight:Int, displayColors:DisplayColors):Void {
		c.clearRect(0, 0, 2000, 2000);
		c.fillStyle = "#bbbbaa";
		c.fillRect(0, 0, 2000, 2000);
		c.fillStyle = HtmlColorCore.intToHexColor(displayColors.OCEAN);
		c.fillRect(0, 0, Std.int(mapWidth), Std.int(mapHeight));
    }

	private static var lightVector:Vector3D = new Vector3D(-1, -1, 0);
    public static function calculateLighting(p:Center, r:Corner, s:Corner):Number {
		var A:Vector3D = new Vector3D(p.point.x, p.point.y, p.elevation);
		var B:Vector3D = new Vector3D(r.point.x, r.point.y, r.elevation);
		var C:Vector3D = new Vector3D(s.point.x, s.point.y, s.elevation);
		var normal:Vector3D = B.subtract(A).crossProduct(C.subtract(A));
		if (normal.z < 0) { normal.scaleBy(-1); }
		normal.normalize();
		var light:Number = 0.5 + 35*normal.dotProduct(lightVector);
		if (light < 0) light = 0;
		if (light > 1) light = 1;
		return light;
    }
	
    public static function colorWithSlope(color:Int, p:Center, q:Center, edge:Edge, displayColors:DisplayColors):Int {
		var r:Corner = edge.v0;
		var s:Corner = edge.v1;
		if (r.isNull() || s.isNull()) {
			// Edge of the map
			return displayColors.OCEAN;
		} else if (p.water) {
			return color;
		}

		if (q != null && p.water == q.water) color = HtmlColorCore.interpolateColor(color, Reflect.field(displayColors, q.biome), 0.4);
		var colorLow:Int = HtmlColorCore.interpolateColor(color, 0x333333, 0.7);
		var colorHigh:Int = HtmlColorCore.interpolateColor(color, 0xffffff, 0.3);
		var light:Number = calculateLighting(p, r, s);
		if (light < 0.5) return HtmlColorCore.interpolateColor(colorLow, color, light*2);
		else return HtmlColorCore.interpolateColor(color, colorHigh, light*2-1);
    }
	
	
	public static function colorWithSmoothColors(color:Int, p:Center, q:Center, edge:Edge, displayColors:DisplayColors):Int {
		if (q != null && p.water == q.water) {
			color = HtmlColorCore.interpolateColor(Reflect.field(displayColors, p.biome), Reflect.field(displayColors, q.biome), 0.25);
		}
		return color;
    }
	
	public static function renderDebugPolygons(context:CanvasRenderingContext2D, map:Map, displayColors:DisplayColors):Void {

		var p:Center, q:Corner, edge:Edge, point:Point, color:Int;

		if (map.centers.length == 0) {
			// We're still constructing the map so we may have some points
			
			context.fillStyle = "#dddddd";
			context.fillRect(0, 0, Std.int(map.SIZE.width), Std.int(map.SIZE.height) /*context.canvas.width, context.canvas.height */); //graphics.drawRect(0, 0, SIZE, SIZE);
			for (point in map.points) {
				context.beginPath();
				context.strokeStyle = "#000000";
				context.fillStyle = "#000000";
				context.arc(point.x, point.y, 1.3, Math.PI, 2 * Math.PI, false); 
				context.closePath();
				context.fill();
				context.stroke();
			}
		}
		
		for (p in map.centers) {
		  color = p.biome.isNotNull() ? Reflect.field(displayColors, p.biome) : (p.ocean ? displayColors.OCEAN : p.water ? displayColors.RIVER : 0xffffff);
		  
			//Draw shape
			context.beginPath();
			for (edge in p.borders) {
				if (edge.v0.isNotNull() && edge.v1.isNotNull()) {
					context.moveTo(p.point.x, p.point.y);
					context.lineTo(edge.v0.point.x, edge.v0.point.y);
					context.lineTo(edge.v1.point.x, edge.v1.point.y);
				}
			}
			context.closePath();
			context.fillStyle = HtmlColorCore.intToHexColor(HtmlColorCore.interpolateColor(color, 0xdddddd, 0.2));
			context.fill();

			//Draw borders
			for (edge in p.borders) {
				if (edge.v0.isNotNull() && edge.v1.isNotNull()) {
					context.beginPath();
					context.moveTo(edge.v0.point.x, edge.v0.point.y);
					if (edge.river > 0) {
						context.lineWidth = 1;
						context.strokeStyle = HtmlColorCore.intToHexColor(displayColors.RIVER);
					} else {
						context.lineWidth = 0.1;
						context.strokeStyle = "#000000"; 
					}
					context.lineTo(edge.v1.point.x, edge.v1.point.y);
					context.closePath();
					context.stroke();
				}
			}
			
			context.beginPath();
			context.fillStyle = (p.water ? "#003333" : "#000000");
			context.globalAlpha = 0.7;
			context.arc(p.point.x, p.point.y, 1.3, Math.PI, 2 * Math.PI, false); 
			context.closePath();
			context.fill();
			context.globalAlpha = 1.0;
			for (q in p.corners) {
				context.fillStyle = q.water? "#0000ff" : "#009900"; 
				context.fillRect(Std.int(q.point.x - 0.7), Std.int(q.point.y - 0.7), Std.int(1.5), Std.int(1.5));
			}
		}
		
	}
	
	/**
	 * Render the paths from each polygon to the ocean, showing watersheds.
	 */
	public static function renderWatersheds( graphics : CanvasRenderingContext2D, map : Map, watersheds : Watersheds ) : Void {
		var edge:Edge, w0:Int, w1:Int;

		for (edge in map.edges) {
			if (edge.d0.isNotNull() && edge.d1.isNotNull() && edge.v0.isNotNull() && edge.v1.isNotNull() && !edge.d0.ocean && !edge.d1.ocean) {
				w0 = watersheds.watersheds[edge.d0.index];
				w1 = watersheds.watersheds[edge.d1.index];
				if (w0 != w1) {
					graphics.beginPath();
					//graphics.lineStyle(3.5, 0x000000, 0.1 * Math.sqrt((map.corners[w0].watershed_size || 1) + (map.corners[w1].watershed.watershed_size || 1)));
					graphics.lineWidth = 3.5;
					graphics.strokeStyle = HtmlColorCore.rgba(0, 0, 0, 0.1 * Math.sqrt((map.corners[w0].watershed_size.coalesce(1)) + (map.corners[w1].watershed.watershed_size.coalesce(1))));
					graphics.moveTo(edge.v0.point.x, edge.v0.point.y);
					graphics.lineTo(edge.v1.point.x, edge.v1.point.y);
					graphics.closePath(); //graphics.lineStyle();
					graphics.stroke();
				}
			}
		}

		for (edge in map.edges) {
			if (edge.river.booleanFromInt()) {
				graphics.beginPath();
				//graphics.lineStyle(1.0, 0x6699ff);
				graphics.lineWidth = 1.0;
				graphics.strokeStyle = "#6699ff";
				graphics.moveTo(edge.v0.point.x, edge.v0.point.y);
				graphics.lineTo(edge.v1.point.x, edge.v1.point.y);
				//graphics.lineStyle();
				graphics.closePath();
				graphics.stroke();
			}
		}
    }
	
    // Render the interior of polygons

    public static function renderPolygons(graphics:CanvasRenderingContext2D, colors:Dynamic, gradientFillProperty:String, colorOverrideFunction:Int->Center->Center->Edge->DisplayColors->Int, map:Map, noisyEdges:NoisyEdges):Void {
      var p:Center, r:Center;

      // My Voronoi polygon rendering doesn't handle the boundary
      // polygons, so I just fill everything with ocean first.
      graphics.fillStyle = HtmlColorCore.intToHexColor(colors.OCEAN);
      graphics.fillRect(0, 0, Std.int(map.SIZE.width), Std.int(map.SIZE.height));
      
      for (p in map.centers) {
          for (r in p.neighbors) {
              var edge:Edge = map.lookupEdgeFromCenter(p, r);
              var color:Int = Reflect.field(colors, p.biome).isNull() ? 0 : Reflect.field(colors, p.biome);
              if (colorOverrideFunction != null) {
                color = colorOverrideFunction(color, p, r, edge, colors);
              }

              function drawPath0():Void {
                var path:Vector<Point> = noisyEdges.path0[edge.index];
                graphics.moveTo(p.point.x, p.point.y);
                graphics.lineTo(path[0].x, path[0].y);
                drawPathForwards(graphics, path);
                graphics.lineTo(p.point.x, p.point.y);
              }

              function drawPath1():Void {
                var path:Vector<Point> = noisyEdges.path1[edge.index];
                graphics.moveTo(p.point.x, p.point.y);
                graphics.lineTo(path[0].x, path[0].y);
                drawPathForwards(graphics, path);
                graphics.lineTo(p.point.x, p.point.y);
              }

              if (noisyEdges.path0[edge.index] == null
                  || noisyEdges.path1[edge.index] == null) {
                // It's at the edge of the map, where we don't have
                // the noisy edges computed. TODO: figure out how to
                // fill in these edges from the voronoi library.
                continue;
              }

              if (gradientFillProperty != null) {
                // We'll draw two triangles: center - corner0 -
                // midpoint and center - midpoint - corner1.
                var corner0:Corner = edge.v0;
                var corner1:Corner = edge.v1;

                // We pick the midpoint elevation/moisture between
                // corners instead of between polygon centers because
                // the resulting gradients tend to be smoother.
                var midpoint:Point = edge.midpoint;
                var midpointAttr:Number = 0.5 * (Reflect.field(corner0, gradientFillProperty) + Reflect.field(corner1, gradientFillProperty));
                drawGradientTriangle
                  (graphics,
                   new Vector3D(p.point.x, p.point.y, Reflect.field(p, gradientFillProperty)),
                   new Vector3D(corner0.point.x, corner0.point.y, Reflect.field(corner0, gradientFillProperty)),
                   new Vector3D(midpoint.x, midpoint.y, midpointAttr),
                   [colors.GRADIENT_LOW, colors.GRADIENT_HIGH], drawPath0);
                drawGradientTriangle
                  (graphics,
                   new Vector3D(p.point.x, p.point.y, Reflect.field(p, gradientFillProperty)),
                   new Vector3D(midpoint.x, midpoint.y, midpointAttr),
                   new Vector3D(corner1.point.x, corner1.point.y, Reflect.field(corner1, gradientFillProperty)),
                   [colors.GRADIENT_LOW, colors.GRADIENT_HIGH], drawPath1);
              } 
			  else {
					graphics.fillStyle = HtmlColorCore.intToHexColor(color);
					graphics.strokeStyle = graphics.fillStyle;
					graphics.beginPath();
					drawPath0();
					drawPath1();
					graphics.closePath();
					graphics.fill();
					graphics.stroke();
              }
            }
        }
    }
	
	private static function drawPathForwards(graphics:CanvasRenderingContext2D, path:Vector<Point>):Void {
		for (i in 0...path.length) {
			graphics.lineTo(path[i].x, path[i].y);
		}
	}
	
	/**
	 * Render bridges across every narrow river edge. Bridges are
	 * straight line segments perpendicular to the edge. Bridges are
	 * drawn after rivers. TODO: sometimes the bridges aren't long
	 * enough to cross the entire noisy line river. TODO: bridges
	 * don't line up with curved road segments when there are
	 * roads. It might be worth making a shader that draws the bridge
	 * only when there's water underneath.
	 */
    public static function renderBridges( graphics : CanvasRenderingContext2D, map : Map, roads : Roads, colors : DisplayColors) : Void {
		var edge:Edge;

		for (edge in map.edges) {
			if (edge.river > 0 && edge.river < 4
				&& !edge.d0.water && !edge.d1.water
				&& (edge.d0.elevation > 0.05 || edge.d1.elevation > 0.05)) {
				var n:Point = { x: -(edge.v1.point.y - edge.v0.point.y), y: edge.v1.point.x - edge.v0.point.x };
				n.normalize(0.25 + (roads.road[edge.index].isNotNull()? 0.5 : 0) + 0.75 * Math.sqrt(edge.river));
				graphics.beginPath();
				graphics.lineWidth = 1.1; 
				graphics.strokeStyle = HtmlColorCore.intToHexColor(colors.BRIDGE);
				graphics.lineCap = "square";
				graphics.moveTo(edge.midpoint.x - n.x, edge.midpoint.y - n.y);
				graphics.lineTo(edge.midpoint.x + n.x, edge.midpoint.y + n.y);
				graphics.closePath();
				graphics.stroke();
			}
		}
	}
	
    /**
     * Render roads. We draw these before polygon edges, so that rivers overwrite roads.
     */ 
    public static function renderRoads( graphics : CanvasRenderingContext2D, map : Map, roads : Roads, colors : DisplayColors ) : Void {
		// First draw the roads, because any other feature should draw
		// over them. Also, roads don't use the noisy lines.
		var p:Center, A:Point, B:Point, C:Point;
		var i:Int, j:Int, d:Number, edge1:Edge, edge2:Edge, edges:Vector<Edge>;

		/**
		 * Helper function: find the normal vector across edge 'e' and
		 * make sure to point it in a direction towards 'c'.
		 */
		function normalTowards( e : Edge, c : Point, len : Number ) : Point {
			// Rotate the v0-->v1 vector by 90 degrees:
			var n : Point = { x: -(e.v1.point.y - e.v0.point.y), y: e.v1.point.x - e.v0.point.x };
			// Flip it around it if doesn't point towards c
			var d : Point = c.subtract(e.midpoint);
			if (n.x * d.x + n.y * d.y < 0) {
				n.x = -n.x;
				n.y = -n.y;
			}
			n.normalize(len);
			return n;
		}
      
		for (p in map.centers) {
			if (roads.roadConnections[p.index].isNotNull()) {
				if (roads.roadConnections[p.index].length == 2) {
					// Regular road: draw a spline from one edge to the other.
					edges = p.borders;
					for (i in 0...edges.length) {
						edge1 = edges[i];
						if (roads.road[edge1.index] > 0) {
							for (j in i+1...edges.length) {
								edge2 = edges[j];
								if (roads.road[edge2.index] > 0) {
									// The spline connects the midpoints of the edges
									// and at right angles to them. In between we
									// generate two control points A and B and one
									// additional vertex C.  This usually works but
									// not always.
									d = 0.5 * Math.min(
										edge1.midpoint.subtract(p.point).distanceFromOrigin(),
										edge2.midpoint.subtract(p.point).distanceFromOrigin()
									);
									A = normalTowards(edge1, p.point, d).add(edge1.midpoint);
									B = normalTowards(edge2, p.point, d).add(edge2.midpoint);
									C = PointCore.interpolate(A, B, 0.5);
									graphics.beginPath();
									graphics.lineWidth = 1.1;
									graphics.strokeStyle = HtmlColorCore.intToHexColor(Reflect.field(colors, "ROAD" + roads.road[edge1.index]));
									graphics.moveTo(edge1.midpoint.x, edge1.midpoint.y);
									graphics.quadraticCurveTo(A.x, A.y, C.x, C.y);
									graphics.moveTo(C.x, C.y);
									graphics.lineWidth = 1.1;
									graphics.strokeStyle = HtmlColorCore.intToHexColor(Reflect.field(colors, "ROAD" + roads.road[edge2.index]));
									graphics.quadraticCurveTo(B.x, B.y, edge2.midpoint.x, edge2.midpoint.y);
									graphics.stroke();
									graphics.closePath();									
								}
							}
						}
					}
				}
				else {
					// Intersection or dead end: draw a road spline from
					// each edge to the center
					for (edge1 in p.borders) {
						if (roads.road[edge1.index] > 0) {
							d = 0.25 * edge1.midpoint.subtract(p.point).distanceFromOrigin();
							A = normalTowards(edge1, p.point, d).add(edge1.midpoint);
							graphics.beginPath();
							graphics.lineWidth = 1.4;
							graphics.strokeStyle = HtmlColorCore.intToHexColor(Reflect.field(colors, "ROAD" + roads.road[edge1.index]));
							graphics.moveTo(edge1.midpoint.x, edge1.midpoint.y);
							graphics.quadraticCurveTo(A.x, A.y, p.point.x, p.point.y);
							graphics.stroke();
							graphics.closePath();
						}
					}
				}
			}
		}
	}
	
    // Render the exterior of polygons: coastlines, lake shores,
    // rivers, lava fissures. We draw all of these after the polygons
    // so that polygons don't overwrite any edges.
    public static function renderEdges(graphics:CanvasRenderingContext2D, colors:Dynamic, map:Map, noisyEdges:NoisyEdges, lava:Lava, renderRivers = true):Void {
		var p:Center, r:Center, edge:Edge;
		
		for (p in map.centers) {
			for (r in p.neighbors) {
				edge = map.lookupEdgeFromCenter(p, r);
				if (noisyEdges.path0[edge.index] == null
					|| noisyEdges.path1[edge.index] == null) {
					// It's at the edge of the map
					continue;
				}
				if (p.ocean != r.ocean) {
					// One side is ocean and the other side is land -- coastline
					graphics.lineWidth = 2;
					graphics.strokeStyle = HtmlColorCore.intToHexColor(colors.COAST);
				} else if ((p.water.intFromBoolean() > 0) != (r.water.intFromBoolean() > 0) && p.biome != 'ICE' && r.biome != 'ICE') {
					// Lake boundary
					graphics.lineWidth = 1;
					graphics.strokeStyle = HtmlColorCore.intToHexColor(colors.LAKESHORE);
				} else if (p.water || r.water) {
					// Lake interior – we don't want to draw the rivers here
					continue;
				} else if (lava.lava[edge.index]) {
					// Lava flow
					graphics.lineWidth = 1;
					graphics.strokeStyle = HtmlColorCore.intToHexColor(colors.LAVA);
				} else if (edge.river > 0 && renderRivers) {
					// River edge
					graphics.lineWidth = Math.sqrt(edge.river);
					graphics.strokeStyle = HtmlColorCore.intToHexColor(colors.RIVER);
					
				} else {
					// No edge
					continue;
				}
				graphics.beginPath();
				graphics.moveTo(noisyEdges.path0[edge.index][0].x, noisyEdges.path0[edge.index][0].y);
				drawPathForwards(graphics, noisyEdges.path0[edge.index]);
				drawPathBackwards(graphics, noisyEdges.path1[edge.index]);
				graphics.stroke();
			}
		}
    }
	
	private static function drawPathBackwards(graphics:CanvasRenderingContext2D, path:Vector<Point>):Void {
		var i = path.length - 1;
		while (i >= 0) {
			graphics.lineTo(path[i].x, path[i].y);
			i--;
		}
    }

    // Helper function for drawing triangles with gradients. This
    // function sets up the fill on the graphics object, and then
    // calls fillFunction to draw the desired path.
    private static function drawGradientTriangle(graphics:CanvasRenderingContext2D,
                                          v1:Vector3D, v2:Vector3D, v3:Vector3D,
                                          colors:Array<Int>, fillFunction:Void->Void):Void {
      var m:Matrix = new Matrix();

      // Center of triangle:
      var V:Vector3D = v1.add(v2).add(v3);
      V.scaleBy(1/3.0);

      // Normal of the plane containing the triangle:
      var N:Vector3D = v2.subtract(v1).crossProduct(v3.subtract(v1));
      N.normalize();

      // Gradient vector in x-y plane pointing in the direction of increasing z
      var G:Vector3D = new Vector3D(-N.x/N.z, -N.y/N.z, 0);

      // Center of the color gradient
      var C:Vector3D = new Vector3D(V.x - G.x*((V.z-0.5)/G.length/G.length), V.y - G.y*((V.z-0.5)/G.length/G.length));

      if (G.length < 1e-6) {
        // If the gradient vector is small, there's not much
        // difference in colors across this triangle. Use a plain
        // fill, because the numeric accuracy of 1/G.length is not to
        // be trusted.  NOTE: only works for 1, 2, 3 colors in the array
        var color:UInt = colors[0];
        if (colors.length == 2) {
          color = HtmlColorCore.interpolateColor(colors[0], colors[1], V.z);
        } else if (colors.length == 3) {
          if (V.z < 0.5) {
            color = HtmlColorCore.interpolateColor(colors[0], colors[1], V.z*2);
          } else {
            color = HtmlColorCore.interpolateColor(colors[1], colors[2], V.z*2-1);
          }
        }
		graphics.fillStyle = HtmlColorCore.intToHexColor(color); //graphics.beginFill(color);
      } else {
        // The gradient box is weird to set up, so we let Flash set up
        // a basic matrix and then we alter it:
        m.createGradientBox(1, 1, 0, 0, 0);
        m.translate(-0.5, -0.5);
        m.scale((1/G.length), (1/G.length));
        m.rotate(Math.atan2(G.y, G.x));
        m.translate(C.x, C.y);
        var alphas = colors.map(function (c:Int) { return 1.0; } );
        var spread = colors.mapi(function (index:Int, c:Int) { return 255 * index / (colors.length - 1); } );
        //graphics.beginGradientFill(GradientType.LINEAR, colors, alphas, spread, m, SpreadMethod.PAD);
      }
      fillFunction();
	  graphics.fill(); //graphics.endFill();
    }	
}