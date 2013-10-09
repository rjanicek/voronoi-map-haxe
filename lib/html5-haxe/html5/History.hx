package html5;

@:native("history") extern class History {
	static var state(default,null) : Dynamic;
	static var length(default,null) : Int;
	static function back() : Void;
	static function forward() : Void;
	static function go( i : Int ) : Void;
	static function pushState( stateObject : Dynamic, title : String, url : String ) : Void;
	static function replaceState( stateObject : Dynamic, title : String, url : String ) : Void;
}
