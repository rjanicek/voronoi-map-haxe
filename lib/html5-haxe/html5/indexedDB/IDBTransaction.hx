package html5.indexedDB;
import js.Dom;

@:native("webkitIDBTransaction")
extern class IDBTransaction {
	static var READ_ONLY(default, never) : Int;
	static var READ_WRITE(default, never) : Int;
	static var VERSION_CHANGE(default, never) : Int;
	var mode(default, never) : Int;
	var db(default, never) : IDBDatabase;
	function objectStore( name : String ) : IDBObjectStore;
	function abort() : Void;
	var onabort : Event -> Void;
	var oncomplete : Event -> Void;
	var onerror : Event -> Void;
}