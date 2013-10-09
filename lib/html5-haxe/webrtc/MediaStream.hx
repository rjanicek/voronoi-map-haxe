
extern class MediaStream {
	
	static var LIVE(default,null) : Int;
	static var ENDED(default,null) : Int;
	
	static var label(default,null) : String;
	static var tracks(default,null) : Array<Dynamic>; //MediaStreamTrackList;
	
	static function record() : MediaStreamRecorder;
}
