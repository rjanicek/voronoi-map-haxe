package html5.typedArrays;

@:native("ArrayBuffer")
extern class ArrayBuffer {
	function new( length : Int ) : Void;
	var byteLength(default, never) : Int;
}