
extern class AudioNode {
	var context(default,null) : AudioContext;
	var numberOfInputs(default,null) : Int;
	var numberOfOutputs(default,null) : Int;
	function new() : Void;
	function connect( destination : AudioNode, ?output : Int, ?input : Int ) : Void;
	function disconnect( ?output : Int ) : Void;
}
