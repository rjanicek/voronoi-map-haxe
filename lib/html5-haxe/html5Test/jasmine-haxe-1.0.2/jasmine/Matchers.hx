package jasmine;

typedef Matchers = {
	var not(default, never) : Matchers;
	
	function toBe( expected : Dynamic ) : Void;
	function toBeDefined() : Void;
	function toBeFalsy() : Void;
	function toBeGreaterThan( expected : Dynamic ) : Void;
	function toBeLessThan( expected : Dynamic ) : Void;
	function toBeNull() : Void;
	function toBeTruthy() : Void;
	function toBeUndefined() : Void;
	function toContain( expected : Dynamic ) : Void;
	function toEqual( expected : Dynamic ) : Void;
	function toHaveBeenCalled() : Void;
	function toHaveBeenCalledWith( arguments : Dynamic ) : Void;
	function toMatch( expected : Dynamic ) : Void;
	function toThrow( expected : String ) : Void;
}