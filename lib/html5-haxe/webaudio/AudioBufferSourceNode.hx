
extern class AudioBufferSourceNode extends AudioSourceNode {
	var buffer : AudioBuffer;
	var gain(default,null) : AudioGain;
	var playbackRate : AudioParam;
	var loop : Bool;
	function new() : Void;
	function noteOn( when : Float ) : Void;
	function noteGrainOn( when : Float, grainOffset : Float, grainDuration : Float ) : Void;
	function noteOff( when : Float ) : Void;
}
