package voronoimap;

import as3.as3types.TypeDefs;
import voronoimap.graph.Edge;

using as3.ac3core.ConversionCore;

class Lava {

	static public var FRACTION_LAVA_FISSURES:Number = 0.2;  // 0 to 1, probability of fissure
	
	// The lava array marks the edges that hava lava.
    public var lava:Array<Boolean>;  // edge index -> Boolean

	public function new() {
		lava = [];
	}
	
    // Lava fissures are at high elevations where moisture is low
    public function createLava(map:Map, randomDouble:Void->Number):Void {
      var edge:Edge;
      for (edge in map.edges) {
          if (!edge.river.booleanFromInt() && !edge.d0.water && !edge.d1.water
              && edge.d0.elevation > 0.8 && edge.d1.elevation > 0.8
              && edge.d0.moisture < 0.3 && edge.d1.moisture < 0.3
              && randomDouble() < FRACTION_LAVA_FISSURES) {
            lava[edge.index] = true;
          }
        }
    }
	
}