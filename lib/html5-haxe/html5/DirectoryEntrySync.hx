package html5;

@:native("DirectoryEntrySync")
extern class DirectoryEntrySync extends FileEntrySync {
	function createReader() : DirectoryReaderSync;
	function getFile( path : String, ?options : Dynamic, ?successCallback : Entry->Void, ?errorCallback : FileError->Void ) : FileEntrySync;
	function getDirectory( path : String, ?options : Dynamic, ?successCallback : Dynamic, ?errorCallback : FileError->Void ) : DirectoryEntrySync;
	function removeRecursively( successCallback : Void->Void, ?errorCallback : FileError->Void ) : Void;
}
