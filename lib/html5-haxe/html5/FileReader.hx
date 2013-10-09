package html5;

@:native("FileReader")
extern class FileReader {
	
	static var EMPTY : Int;
	static var LOADING : Int;
	static var DONE : Int;
	
	dynamic function onloadstart( e : Dynamic ) : Void;
	dynamic function onprogress( e : Dynamic ) : Void;
	dynamic function onabort( e : Dynamic ) : Void;
	dynamic function onerror( e : Dynamic ) : Void;
	dynamic function onload( e : Dynamic ) : Void;
	dynamic function onloadend( e : Dynamic ) : Void;
	
	var readyState(default,null) : Int;
	var result(default,null) : Dynamic;
	var error(default,null) : FileError;
	
	function new() : Void;

	function readAsArrayBuffer( blob : Blob ) : Void;
	function readAsBinaryString( blob : Blob ) : Void;
	function readAsText( blob : Blob, ?encoding : String ) : Void;
	function readAsDataURL( blob : Blob ) : Void;
	function abort() : Void;
}
