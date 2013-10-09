package html5;

@:native("LocalFileSystem")
extern class LocalFileSystem {
	static var TEMPORARY : Int;
	static var PERSISTENT : Int;
	static function requestFileSystem( type : Int, size : Float, successCallback : FileSystem->Void, ?errorCallback : FileError->Void  ) : Void;
	static function resolveLocalFileSystemURI( uri : String,  successCallback : FileSystem->Void, ?errorCallback : FileError->Void ) : Void;
}
