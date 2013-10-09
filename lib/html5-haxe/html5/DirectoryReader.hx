package html5;

@:native("DirectoryReader")
extern class DirectoryReader {
	function readEntries( successCallback : Array<Entry>->Void, ?errorCallback : FileError->Void ) : Void;
}
