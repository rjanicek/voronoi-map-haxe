
extern class AudioParam {
	var value : Float;
	var minValue(default,null) : Float;
	var maxValue(default,null) : Float;
	var defaultValue(default,null) : Float;
	var name(default,null) : String;
	var units(default,null) : Int;
	function new() : Void;
	function setValueAtTime( value : Float, time : Float ) : Void;
	function linearRampToValueAtTime( value : Float, time : Float ) : Void;
	function exponentialRampToValueAtTime( value : Float, time : Float ) : Void;
	function setTargetValueAtTime( targetValue : Float, time : Float, timeConstant : Float ) : Void;
	function setValueCurveAtTime( values : Array<Float>, time : Float, duration : Float ) : Void;
	function cancelScheduledValues( startTime : Float ) : Void;
}
