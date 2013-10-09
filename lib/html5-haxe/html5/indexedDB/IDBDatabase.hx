package html5.indexedDB;

/**
 * @link http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBDatabase
 */

typedef IDBDatabase = {
	var name(default, never) : String;
	var version(default, never) : String;
	var objectStoreNames(default, never) : Array<String>;
	
	function createObjectStore( name : String, ?keyPath : String, ?autoIncrement : Bool ) : IDBObjectStore;
	function deleteObjectStore( name : String ) : Void;
	function setVersion( version : String ) : IDBVersionChangeRequest;
	function transaction( storeNames : Array<String>, ?mode : Int ) : IDBTransaction;
	function close() : Void;
	
	var onabort : Void -> Void;
	var onerror : Void -> Void;
	var onversionchange : Void -> Void;
}