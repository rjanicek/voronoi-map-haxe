package html5;

extern class XMLSerializer {
	function new() : Void;
	function serializeToString( d : Dynamic ) : String;
	function serializeToStream( d : Dynamic, stream : Dynamic, encoding : String ) : Void;
}
