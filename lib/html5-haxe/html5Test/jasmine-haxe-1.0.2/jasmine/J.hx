package jasmine;

class J {

	public static function beforeEach( beforeEachFunction : Void -> Void ) : Void {
		untyped __js__("beforeEach(beforeEachFunction)");
	}
	
	public static function afterEach( afterEachFunction : Void -> Void ) : Void {
		untyped __js__("afterEach(afterEachFunction)");
	}
	
	public static function describe( description : String, specDefinitions : Void -> Void ) : Void {
		untyped __js__("describe(description, specDefinitions)");
	}

	public static function xdescribe( description : String, specDefinitions : Void -> Void ) : Void {
		untyped __js__("xdescribe(description, specDefinitions)");
	}
	
	public static function it( description : String, func : Void -> Void ) : Void {
		untyped __js__("it(description, func)");
	}

	public static function xit( description : String, func : Void -> Void ) : Void {
		untyped __js__("xit(description, func)");
	}
	
	public static function expect( actual : Dynamic ) : Matchers {
		return untyped __js__("expect(actual)");
	}
	
	public static function runs( func : Void -> Void ) : Void {
		untyped __js__("runs(func)");
	}
	
	public static function waits( timeoutMilliseconds : Int ) : Void {
		untyped __js__("waits(timeoutMilliseconds)");
	}
	
	public static function waitsFor( func : Void -> Bool, ?message : String, ?timeoutMilliseconds : Int ) : Void {
		untyped __js__("waitsFor(func, message, timeoutMilliseconds)");
	}
	
	public static function spyOn( x : Dynamic, method : String ) : Spy {
		return untyped __js__("spyOn(x, method)");
	}
	
}