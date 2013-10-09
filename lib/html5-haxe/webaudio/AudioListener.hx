
extern class AudioListener {
	var gain : Float;
	var dopplerFactor : Float;
	var speedOfSound : Float;
	function new() : Void;
	function setPosition( x : Float, y : Float, z : Float ) : Void;
	function setOrientation( x : Float, y : Float, z : Float, xUp : Float, yUp : Float, zUp : Float ) : Void;
	function setVelocity( x : Float, y : Float, z : Float ) : Void;
}
