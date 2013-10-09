package html5;

class Database {
	
	public function transaction( cb : SQLTransaction->Void ) : Void;
	
	public static inline function open( name : String, version : String, displayName : String, estimatedSize : Int,
										?creationCallback ) : Database {
		return untyped openDatabase( name, version, displayName, estimatedSize, creationCallback );
	}
	
	//TODO openDatabaseSync
	
}
