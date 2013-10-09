package html5;

import js.Dom;

enum XMLHttpRequestResponseType {
	arraybuffer;
	blob;
	document;
	json;
	text;
}

extern class XMLHttpRequest {
	
	// states
	static var UNSENT(default,never) : Int;
	static var OPENED(default,never) : Int;
	static var HEADERS_RECEIVED(default,never) : Int;
	static var LOADING(default,never) : Int;
	static var DONE(default,never) : Int;
	var readyState(default,null) : Int;
	
	// event handler
	var onreadystatechange : Void -> Void;
	
	function new() : Void;
	
	// request
	function open( method : String,  url : String, ?async : Bool, ?user : String, ?password :  String ) : Void;
	function setRequestHeader( name : String, value : String ) : Void;
	var upload(default,null) : Dynamic; //XMLHttpRequestUpload;
	var withCredentials(default,null) : Dynamic;
	@:overload( function( data : FormData ) : Void {} )
	@:overload( function( data : String ) : Void {} )
	@:overload( function( data : Document ) : Void {} )
	@:overload( function( data : Blob ) : Void {} )
	@:overload( function( data : ArrayBuffer ) : Void {} )
	function send() : Void;
	function abort() : Void;
	
	// response
	var status(default,null) : Int;
	var statusText(default,null) : String;
	function getResponseHeader( name : String ) : String;
	function getAllResponseHeaders() : String;
	function overrideMimeType( mime : String ) : Void;
	var responseType(default,null) : XMLHttpRequestResponseType;
	var response(default,null) : Dynamic;
	var responseText(default,null) : String;
	var responseXML(default,null) : Document;
}
