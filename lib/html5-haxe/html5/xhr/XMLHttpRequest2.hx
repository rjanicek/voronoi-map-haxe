package html5.xhr;
import js.XMLHttpRequest;

/**
 * XMLHttpRequest Level 2
 * 
 * @link http://www.w3.org/TR/XMLHttpRequest2/
 */

@:native("XMLHttpRequest")
extern class XMLHttpRequest2 extends XMLHttpRequest {
	
	public function overrideMimeType(mime:String):Void;
	public var responseType(default, default):String;
	public var response(default, default):Dynamic;
	
}