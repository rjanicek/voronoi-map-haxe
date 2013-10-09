package html5;

extern class DOMParser {
	function new() : Void;
	//function parseFromBuffer(  ) : Dynamic;
	//function parseFromStream(  ) : Dynamic;
	function parseFromString( t : String, mime : String ) : Dynamic;
	function getElementsByTagName( name : String ) : Dynamic;
}
