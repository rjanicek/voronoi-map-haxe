package html5;

@:native("EventSource")
extern class EventSource {

	static var CONNECTING : Int;
	static var OPEN : Int;
	static var CLOSED : Int;
	
	dynamic function onopen() : Void;
	dynamic function onmessage(e:Dynamic) : Void;
	dynamic function onerror(e:Dynamic) : Void;
	
	var url(default,null) : String;
	var readyState(default,null) : Int;
	
	function new( url : String ) : Void;
	function close() : Void;
}
