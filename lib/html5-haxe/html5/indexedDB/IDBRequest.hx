package html5.indexedDB;
import js.Dom;

@:native("webkitIDBRequest")
extern class IDBRequest {
	static var LOADING(default, never) : Int;
	static var DONE(default, never) : Int;
	
	var result(default, never) : Dynamic;
	var errorCode(default, never) : Int;
	var source(default, never) : Dynamic;
	
	var readyState(default, never) : Int;
	
	var onsuccess : Event -> Void;
	var onerror : Event -> Void;
}