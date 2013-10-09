package html5;

@:native("JSON")
extern class JSON {
	static function stringify( v : Dynamic ) : String;
	static function parse( v : String ) : Dynamic;
}
