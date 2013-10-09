package html5.indexedDB;
import js.Dom;

typedef IDBVersionChangeRequest = { > IDBRequest,
	var onblocked : Event -> Void;	
}