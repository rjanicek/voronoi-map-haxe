package html5;

@:native("Notification")
extern class Notification {
	function show() : Void;
	function cancel() : Void;
	var ondisplay : Void->Void;
	var onerror : Void->Void;
	var onclose : Void->Void;
}
