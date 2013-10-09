package html5.typedArrays;

@:native("Int8Array")
extern class Int8Array {
	public function new( buffer : ArrayBuffer, ?byteOffset : Int, ?length : Int ) : Void;	
}