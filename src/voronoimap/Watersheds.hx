package voronoimap;
import voronoimap.graph.Center;
import voronoimap.graph.Corner;

/**
 * ...
 * @author Richard Janicek
 */

class Watersheds {
    public var lowestCorner:Array<Int>;  // polygon index -> corner index
    public var watersheds:Array<Int>;  // polygon index -> corner index

	public function new() {
		lowestCorner = [];
		watersheds = [];
	}

    // We want to mark each polygon with the corner where water would
    // exit the island.
    public function createWatersheds(map:Map):Void {
      var p:Center, q:Corner, s:Corner;

      // Find the lowest corner of the polygon, and set that as the
      // exit point for rain falling on this polygon
      for (p in map.centers) {
          s = null;
          for (q in p.corners) {
              if (s == null || q.elevation < s.elevation) {
                s = q;
              }
            }
          lowestCorner[p.index] = (s == null)? -1 : s.index;
          watersheds[p.index] = (s == null)? -1 : (s.watershed == null)? -1 : s.watershed.index;
        }
    }
	
}