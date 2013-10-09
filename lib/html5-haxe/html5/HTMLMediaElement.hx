package html5;
//http://www.w3.org/TR/html5/video.html#htmlmediaelement

private extern class MediaError {
	static var MEDIA_ERR_ABORTED : Int;
	static var MEDIA_ERR_NETWORK : Int;
	static var MEDIA_ERR_DECODE : Int;
	static var MEDIA_ERR_SRC_NOT_SUPPORTED : Int;
	var code(default,null) : Int;
}

private typedef TimeRanges = {
	var length(default,null) : Int;
	function start( index : Int ) : Float;
	function end( index : Int ) : Float;
}

private typedef MediaController = {
	var buffered(default,null) : TimeRanges;
	var seekable(default,null) : TimeRanges;
	var duration(default,null) : Float;
	var currentTime : Float;
	var paused(default,null) : Bool;
	var played(default,null) : TimeRanges;
	
	var defaultPlaybackRate : Float;
	var playbackRate : Float;
	var volume : Float;
	var muted : Bool;
	
	var onemptied : Void->Void;
	var onloadedmetadata : Void->Void;
	var onloadeddata : Void->Void;
	var oncanplay : Void->Void;
	var oncanplaytrough : Void->Void;
	var onplaying : Void->Void;
	var onwaiting : Void->Void;
	
	var ondurationchange : Void->Void;
	var ontimeupdate : Void->Void;
	var onplay : Void->Void;
	var onpause : Void->Void;
	var onratechange : Void->Void;
	var onvolumechange : Void->Void;
}

private typedef TrackList = {
	var length(default,null) : Int;
	function getID( index : Int ) : String;
	function getKind( index : Int ) : String;
	function getLabel( index : Int ) : String;
	function getLanguage( index : Int ) : String;
	var onchange : Void->Void;
}

private typedef MultipleTrackList = {>TrackList,
	function isEnabled( index : Int ) : Bool;
	function enable( index : Int ) : Void;
	function disable( index : Int ) : Void;
}

private typedef ExclusiveTrackList = {>TrackList,
	var selectedIndex(default,null) : Int;
	function select( index : Int ) : Void;
}

private extern class TextTrack {
	
	static var NONE(default,null) : Int;
	static var LOADING(default,null) : Int;
	static var LOADED(default,null) : Int;
	static var ERROR(default,null) : Int;
			
	var kind(default,null) : String;
	var label(default,null) : String;
	var language(default,null) : String;
	
	var readyState(default,null) : Int;
	var onload : Void->Void;
	var onerror : Void->Void;
	
	static var OFF(default,null) : Int;
	static var HIDDEN(default,null) : Int;
	static var SHOWING(default,null) : Int;
	
	var mode : Int;
	
	var cues(default,null) : TextTrackCueList;
	var activeCues(default,null) : TextTrackCueList;
	
	var oncuechange : Void->Void;
}

private typedef TextTrackCueList = {
	var length(default,null) : Int;
	//getter TextTrackCue (in unsigned long index); //TODO ?
	function getCueById( id : String ) : TextTrackCue;
}

private typedef TextTrackCue = {
	var track(default,null) : TextTrack;
	var id(default,null) : String;
	var startTime(default,null) : Float;
	var endTime(default,null) : Float;
	var pauseOnExit(default,null) : Bool;
	function getCueAsSource() : String;
//	function getCueAsHTML() : DocumentFragment; //TODO
	var onenter : Void->Void;
	var onexit : Void->Void;
}

private typedef MutableTextTrack = {>TextTrack,
	function addCue( cue : TextTrackCue ) : Void;
	function removeCue( cue : TextTrackCue ) : Void;
}

extern class HTMLMediaElement {
	
	static var NETWORK_EMPTY(default,never) : Int;
	static var NETWORK_IDLE(default,never) : Int;
	static var NETWORK_LOADING(default,never) : Int;
	static var NETWORK_NO_SOURCE(default,never) : Int;
	
	static var HAVE_NOTHING(default,never) : Int;
	static var HAVE_METADATA(default,never) : Int;
	static var HAVE_CURRENT_DATA(default,never) : Int;
	static var HAVE_FUTURE_DATA(default,never) : Int;
	static var HAVE_ENOUGH_DATA(default,never) : Int;
	
	var error(default,null) : MediaError;
	var currentSrc(default,null) : String;
	var networkState(default,null) : Int;
	var preload : String;
	var buffered(default,null) : TimeRanges;
	
	var readyState(default,null) : Int;
	var seeking(default,null) : Bool;
	
	var currentTime : Float;
	var initialTime(default,null) : Float;
	var duration(default,null) : Float;
	var startOffsetTime(default,null) : Float;
	var paused(default,null) : Bool;
	var defaultPlaybackRate : Float;
	var playbackRate : Float;
	var played(default,null) : TimeRanges;
	var seekable(default,null) : TimeRanges;
	var ended(default,null) : Bool;
	var autoplay : Bool;
	var loop : Bool;
	
	var mediaGroup : String;
	var mediaController : MediaController;
	
	var controls : Bool;
	var volume : Float;
	var muted : Bool;
	var defaultMuted : Bool;
	
	var audioTracks(default,null) : MultipleTrackList;
	var videoTracks(default,null) : ExclusiveTrackList;
	var textTracks : TextTrack;

	function new() : Void;
	
	function load() : Void;
	function canPlayType( type : String ) : String;
	function play() : Void;
	function pause() : Void;
	function addTextTrack( kind : String, ?label : String, ?language : String ) : MutableTextTrack;
}
