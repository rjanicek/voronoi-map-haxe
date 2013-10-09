package html5;

//TODO
//extern class BlobBuilder {
@:native("window.WebKitBlobBuilder") extern class BlobBuilder {
	function new() : Void;
	@:overload(function(data:ArrayBuffer):Void{})
	@:overload(function(data:Blob):Void{})
	function append( data : String, ?endings : String ) : Void;
	function getBlob( ?contentType : String ) : Blob;
}
