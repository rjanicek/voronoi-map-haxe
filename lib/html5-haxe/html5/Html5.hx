package html5;
import html5.indexedDB.IDBFactory;

class Html5 {

	/**
	* @link http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html
	*/
	public static var indexedDb(getIndexedDb, never) : IDBFactory;
	
	private static function getIndexedDb() : IDBFactory {
		return untyped __js__("webkitIndexedDB");
	}
}