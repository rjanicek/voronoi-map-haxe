
//TODO
@:native("webkitDeprecatedPeerConnection") extern class PeerConnection {

	static var NEW(default,never) : Int;
	static var NEGOTIATING(default,never) : Int;
	static var ACTIVE(default,never) : Int;
	static var CLOSING(default,never) : Int;
	static var CLOSED(default,never) : Int;
	
	static var ICE_GATHERING(default,never) : Int;
	static var ICE_WAITING(default,never) : Int;
	static var ICE_CHECKING (default,never) : Int;
	static var ICE_CONNECTED (default,never) : Int;
	static var ICE_COMPLETED(default,never) : Int;
	static var ICE_FAILED(default,never) : Int;
	static var ICE_CLOSED(default,never) : Int;
	
	static var SDP_IDLE(default,never) : Int;
	static var SDP_WAITING(default,never) : Int;
	static var SDP_GLARE(default,never) : Int;
	
	static var sdpState(default,never) : Int;

	var readyState(default,never) : Int;
	var iceState(default,never) : Int;

	var localStreams(default,null) : Array<MediaStream>;
	var remoteStreams(default,null) : Array<MediaStream>;
	
	var onconnecting : Void->Void;
	var onopen : Void->Void;
	var onstatechange : Void->Void;
	var onaddstream : Dynamic->Void;
	var onremovestream : Void->Void;
	
	function new( configuration : String, signalingCallback : String->Void ) : Void; //TODO SignalingCallback
	
	function addStream( stream : MediaStream ) : Void;
	function removeStream( stream : MediaStream ) : Void;
	function close() : Void;
	function processSignalingMessage( message : String ) : Void;
	
}
