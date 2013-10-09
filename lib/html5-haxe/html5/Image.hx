package html5;

@:native("Image")
extern class Image {
	var alt : String;
	var src : String;
	var useMap : String;
	var isMap : Bool;
	var width : Int;
	var height : Int;
	var complete : Bool;//readonly
	var onload : Void->Void;
	var onerror : Dynamic->Void;
	function new() : Void;
}
