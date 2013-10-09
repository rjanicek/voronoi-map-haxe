package jasmine;

typedef Spy = {
	var callCount(default, never) : Int;

	function andCallFake( fakeFunc : Dynamic ) : Spy;
	function andCallThrough() : Spy;
	function andReturn( value : Dynamic ) : Spy;
	function andThrow( exceptionMsg : String ) : Spy;
	function plan() : Void;
	function reset() : Void;
}