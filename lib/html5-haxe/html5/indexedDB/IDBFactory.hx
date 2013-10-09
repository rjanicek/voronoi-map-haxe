package html5.indexedDB;

/**
 * @link http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html
 */

typedef IDBFactory = {
	function open( name : String ) : IDBRequest;
}