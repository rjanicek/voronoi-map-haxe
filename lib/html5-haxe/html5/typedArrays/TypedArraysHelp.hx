package html5.typedArrays;
import haxe.io.BytesData;

class TypedArraysHelp {

	public static function ArrayBufferToBytesData( arrayBuffer : ArrayBuffer) : BytesData {
		return cast new Uint8Array(arrayBuffer);
	}
	
}