package specs;

import as3.NumberCore;
import as3.Rectangle;
import as3.TypeDefs;
import jasmine.J;

using Lambda;
using Std;
using as3.PointCore;

class AS3Spec {

	public function new() {
		J.describe("AS3", function() {
			
			J.xit("should allow duplicate points as Dictionary keys", function() {
				var p1 = { x:1.0, y:1.0 };
				var p2 = { x:1.0, y:1.0 };
				var d = new Dictionary();
				d.set(p1.hash(), p1);
				d.set(p2.hash(), p2);
				J.expect(d.count()).toEqual(2);
			});
			
		});
	}
	
}