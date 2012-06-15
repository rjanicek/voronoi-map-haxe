package specs;

import as3.ac3core.NumberCore;
import as3.as3types.Rectangle;
import as3.as3types.TypeDefs;
import jasmine.J;

using Lambda;
using Std;
using as3.ac3core.ConversionCore;

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
			
			J.it("should make boolean from dynamic", function() {
				J.expect(true.isNull()).toBeFalsy();
				J.expect(true.isNotNull()).toBeTruthy();
				J.expect(1.isNull()).toBeFalsy();
				J.expect(1.isNotNull()).toBeTruthy();
				var p:Point = null;
				J.expect(p.isNull()).toBeTruthy();
				J.expect(p.isNotNull()).toBeFalsy();
				p = { x:0.0, y:0.0 };
				J.expect(p.isNull()).toBeFalsy();
				J.expect(p.isNotNull()).toBeTruthy();
			});
			
		});
	}
	
}