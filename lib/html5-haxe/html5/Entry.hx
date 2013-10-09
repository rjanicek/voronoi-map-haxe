package html5;

@:native("Entry")
extern class Entry {
	
	var isFile(default,null) : Bool;
	var isDirectory(default,null) : Bool;
	var name(default,null) : String;
	var fullPath(default,null) : String;
	var filesystem(default,null) : FileSystem;
	
	function getMetadata( successCallback : Dynamic->Void, ?errorCallback : FileError->Void ) : Void;
	function moveTo( parent : DirectoryEntry, ?newName : String, ?successCallback : Entry->Void, ?errorCallback : FileError->Void ) : Void;
	function copyTo( parent : DirectoryEntry, ?newName : String, ?successCallback : Entry->Void, ?errorCallback : FileError->Void ) : Void;
	function toURI( ?mimeType : String ) : Void;
	function remove( successCallback : Void->Void, ?errorCallback : FileError->Void ) : Void;
	function getParent( successCallbac : Entry->Void, errorCallback : FileError->Void ) : Void;
}
