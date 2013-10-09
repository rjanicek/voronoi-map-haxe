package html5.webStorage;

@:native("localStorage") extern class LocalStorage {
	static var length(default,null) : Int;
	static function key( index : Int ) : String;
	static function setItem( key : String, value : Dynamic ) : Void;
	static function getItem( key : String ) : Dynamic;
	static function removeItem( key : String ) : Void;
	static function clear() : Void;
}
