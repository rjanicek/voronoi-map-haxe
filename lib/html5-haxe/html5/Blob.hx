package html5;

@:native("Blob")
extern class Blob {
	var size(default,null) : Float;
	var type(default,null) : String;
	function slice( start : Int, length : Int, ?contentType : String ) : Blob;
}
