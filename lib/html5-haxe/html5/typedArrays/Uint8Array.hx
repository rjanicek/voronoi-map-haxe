package html5.typedArrays;

@:native("Uint8Array")
extern class Uint8Array {
	public function new( buffer : ArrayBuffer, ?byteOffset : Int, ?length : Int ) : Void;	
}