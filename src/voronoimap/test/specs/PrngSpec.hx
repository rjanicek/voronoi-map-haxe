package voronoimap.test.specs;

import as3.ac3core.NumberCore;
import as3.as3types.Rectangle;
import as3.as3types.TypeDefs;
import de.polygonal.math.PM_PRNG;
import jasmine.J;

using Lambda;
using Std;
using as3.ac3core.PointCore;

class PrngSpec {

	public function new() {
		J.describe("PRNG", function() {
			var random = new PM_PRNG();
			J.it("should make floats in range", function() {
				var d = random.nextDoubleRange(-0.4, 0.4);
				J.expect(d >= -1).toBeTruthy();
				J.expect(d <= 1).toBeTruthy();
			});
			
		});
	}
	
}