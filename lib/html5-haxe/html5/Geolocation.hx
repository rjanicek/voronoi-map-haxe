package html5;

typedef Coordinates = {
	var latitude : Float;
	var longitude : Float;
	var altitude : Float;
	var accuracy : Float;
	var altitudeAccuracy : Float;
	var heading : Float;
	var speed : Float;
}

typedef Position = {
	var coords : Coordinates;
	var timestamp : String;
}

typedef PositionOptions = {
	var enableHighAccuracy : Bool;
	var timeout : Float;
	var maximumAge : Float;
}

extern class PositionError {
	static var UNKNOWN_ERROR(default,null) : Int;
    static var PERMISSION_DENIED(default,null) : Int;
    static var POSITION_UNAVAILABLE(default,null) : Int;
    static var TIMEOUT(default,null) : Int;
	var code(default,null) : Int;
	var message(default,null) : String;
}

@:native("navigator.geolocation") extern class Geolocation {
	static function getCurrentPosition( successCallback : Position->Void, ?error : PositionError->Void, ?options : PositionOptions ) : Void;
	static function watchPosition( successCallback : Position->Void, ?error : PositionError->Void, ?options : PositionOptions ) : Float;
	static function clearWatch( watchId : Int ) : Float;
}
