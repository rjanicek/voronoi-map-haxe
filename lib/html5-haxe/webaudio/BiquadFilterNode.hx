
extern class BiquadFilterNode extends AudioNode {
	static var LOWPASS(default,null) : Int;
	static var HIGHPASS(default,null) : Int;
	static var BANDPASS(default,null) : Int;
	static var LOWSHELF(default,null) : Int;
	static var HIGHSHELF(default,null) : Int;
	static var PEAKING(default,null) : Int;
	static var NOTCH(default,null) : Int;
	static var ALLPASS(default,null) : Int;
	var type : Int;
	var frequency(default,null) : AudioParam;
	var Q(default,null) : AudioParam;
	var typegain(default,null) : AudioParam;
	function new() : Void;
}
