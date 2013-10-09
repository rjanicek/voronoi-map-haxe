package html5;

extern class SharedWorker {
	var port(default,null) : Dynamic; // MessagePort;
	function new( scriptURL : String, ?name : String ) : Void;
}
