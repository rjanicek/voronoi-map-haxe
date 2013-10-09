package html5.indexedDB;

typedef IDBObjectStore = {
	var name(default, never) : String;
	var keyPath(default, never) : String;
	var indexNames(default, never) : Array<String>;	
	
	function put( value : Dynamic, key : Dynamic ) : IDBRequest;
	function add( value : Dynamic, key : Dynamic ) : IDBRequest;
	function delete( key : Dynamic ) : IDBRequest;
	function get( key : Dynamic ) : IDBRequest;
	function clear() : IDBRequest;
}