package specs;

import as3.NumberCore;
import as3.Rectangle;
import as3.TypeDefs;
import jasmine.J;

using Lambda;
using Std;
using as3.ConversionCore;

class ConversionCoreSpec {

	var i:Int;
	public function new() {
		J.describe("ConversionCore", function() {
			
			J.it("should make int from boolean", function() {
				J.expect(false.intFromBoolean()).toBe(0);
				J.expect(true.intFromBoolean()).toBe(1);
			});			
			
			J.it("should make boolean from int", function() {
				var i:Int = null;
				J.expect(i.booleanFromInt()).toBeFalsy();
				J.expect(0.booleanFromInt()).toBeFalsy();
				J.expect(1.booleanFromInt()).toBeTruthy();
			});
			
		});
	}
	
}