package specs;

import as3.NumberCore;
import as3.TypeDefs;
import as3.Rectangle;
import jasmine.J;

using as3.PointCore;

class PointCoreSpec {

	public function new() {
		J.xdescribe("PointCore", function() {
			
			J.it("should interpolate points", function() {
				var a = { x:0.0, y:0.0 };
				var b = { x:1.0, y:1.0 };
				
				var i = a.interpolate(b, 0.5);
				J.expect(i.x).toBe(0.5);
				J.expect(i.y).toBe(0.5);
				
				var i = a.interpolate(b, 0.0);
				J.expect(i.x).toBe(0);
				J.expect(i.y).toBe(0);
				
				var i = a.interpolate(b, 1.0);
				J.expect(i.x).toBe(1);
				J.expect(i.y).toBe(1);
			});
			
		});
	}
	
}