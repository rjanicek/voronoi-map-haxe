package voronoimap;
import voronoimap.graph.Center;
import voronoimap.graph.Corner;
import voronoimap.graph.Edge;

using co.janicek.core.NullCore;

class Roads {

    // The road array marks the edges that are roads.  The mark is 1,
    // 2, or 3, corresponding to the three contour levels. Note that
    // these are sparse arrays, only filled in where there are roads.
    public var road:Array<Int>;  // edge index -> int contour level
    public var roadConnections:Array<Array<Edge>>;  // center index -> array of Edges with roads

	public function new() {
      road = [];
      roadConnections = [];
	}
	
    // We want to mark different elevation zones so that we can draw
    // island-circling roads that divide the areas.
    public function createRoads(map:Map, elevationThresholds : Array<Float>):Void {
      // Oceans and coastal polygons are the lowest contour zone
      // (1). Anything connected to contour level K, if it's below
      // elevation threshold K, or if it's water, gets contour level
      // K.  (2) Anything not assigned a contour level, and connected
      // to contour level K, gets contour level K+1.
      var queue:Array<Center> = [];
      var p:Center, q:Corner, r:Center, edge:Edge, newLevel:Int;
      //var elevationThresholds = [0, 0.05, 0.37, 0.64];
      var cornerContour:Array<Int> = [];  // corner index -> int contour level
      var centerContour:Array<Int> = [];  // center index -> int contour level
    
      for (p in map.centers) {
          if (p.coast || p.ocean) {
            centerContour[p.index] = 1;
            queue.push(p);
          }
        }
      
      while (queue.length > 0) {
        p = queue.shift();
        for (r in p.neighbors) {
            newLevel = centerContour[p.index].coalesce(0);
            while (r.elevation > elevationThresholds[newLevel] && !r.water) {
              // NOTE: extend the contour line past bodies of
              // water so that roads don't terminate inside lakes.
              newLevel += 1;
            }
            if (newLevel < centerContour[r.index].coalesce(999)) {
              centerContour[r.index] = newLevel;
              queue.push(r);
            }
          }
      }

	  // A corner's contour level is the MIN of its polygons
      for (p in map.centers) {
          for (q in p.corners) {
              cornerContour[q.index] = Std.int(Math.min(cornerContour[q.index].coalesce(999),
                                                centerContour[p.index].coalesce(999)));
            }
        }

      // Roads go between polygons that have different contour levels
      for (p in map.centers) {
          for (edge in p.borders) {
              if (edge.v0.isNotNull() && edge.v1.isNotNull()
                  && cornerContour[edge.v0.index] != cornerContour[edge.v1.index]) {
                road[edge.index] = Std.int(Math.min(cornerContour[edge.v0.index],
                                            cornerContour[edge.v1.index]));
                if (roadConnections[p.index].isNull()) {
                  roadConnections[p.index] = new Array<Edge>();
                }
                roadConnections[p.index].push(edge);
              }
            }
        }
    }

	
}