
extern class RealtimeAnalyserNode extends AudioNode {
	var fftSize : Int;
	var frequencyBinCount(default,null) : Int;
	var minDecibels : Int;
	var maxDecibels : Int;
	var smoothingTimeConstant : Int;
	function getFloatFrequencyData( array : Array<Float> ) : Void;
	function getByteFrequencyData( array : Array<Int> ) : Void;
	function getByteTimeDomainData( array : Array<Int> ) : Void;
}
