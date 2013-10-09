
extern class AudioContext {
	var destination(default,null) : AudioDestinationNode;
	var sampleRate(default,null) : Float;
	var currentTime(default,null) : Float;
	var listener(default,null) : AudioListener;
	function new() : Void;
	@:overload(function(buffer:ArrayBuffer,mixToMono:Bool):Void{}) 
	function createBuffer( numberOfChannels : Int, length : Int, sampleRate : Float ) : AudioBuffer;
	function decodeAudioData( audioData : ArrayBuffer, successCallback : AudioBufferCallback, ?errorCallback : AudioBufferCallback ) : Void;
	function createBufferSource() : AudioBufferSourceNode;
	function createJavaScriptNode( bufferSize : Int, numberOfInputs : Int, numberOfOutputs : Int ) : JavaScriptAudioNode;
	function createAnalyser() : RealtimeAnalyserNode;
	function createGainNode() : AudioGainNode;
	function createDelayNode() : DelayNode;
	function createBiquadFilter() : BiquadFilterNode;
	function createPanner() : AudioPannerNode;
	function createConvolver() : ConvolverNode;
	function createChannelSplitter() : AudioChannelSplitter;
	function createChannelMerger() : AudioChannelMerger;
	function createDynamicsCompressor() : DynamicsCompressorNode;
}
