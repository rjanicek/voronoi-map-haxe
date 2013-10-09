package html5;

/**
	Create instance: var cache : ApplicationCache = untyped window.applicationCache;
*/
@:native("window.applicationCache") extern class ApplicationCache {
	
	static var UNCACHED(default,null) : Int;
	static var IDLE(default,null) : Int;
	static var CHECKING(default,null) : Int;
	static var DOWNLOADING(default,null) : Int;
	static var UPDATEREADY(default,null) : Int;
	static var OBSOLETE(default,null) : Int;
	
	var onchecking : Void->Void;
	var onerror : Void->Void;
	var onnoupdate : Void->Void;
	var ondownloading : Void->Void;
	var onprogress : Void->Void;
	var onupdateready : Void->Void;
	var oncached : Void->Void;
	var onobsolete : Void->Void;
	
	var status(default,null) : Int;
	//var status(default,null) : ApplicationCacheStatus;
	
	function update() : Void;
	function abort() : Void;
	function swapCache() : Void;
	
}
