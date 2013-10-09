
extern class AudioPannerNode extends AudioNode {
	
	static var EQUALPOWER(default,null) : Int;
	static var HRTF(default,null) : Int;
	static var SOUNDFIELD(default,null) : Int;

	var distanceModel : Int;
	var refDistance : Float;
	var maxDistance : Float;
	var rolloffFactor : Float;
	
	var coneInnerAngle : Float;
	var coneOuterAngle : Float;
	var coneOuterGain : Float;
	
	var coneGain(default,null) : AudioGain;
	var distanceGain(default,null) : AudioGain;
	
	function new() : Void;
}
