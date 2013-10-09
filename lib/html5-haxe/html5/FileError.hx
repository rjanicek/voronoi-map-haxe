package html5;

@:native("FileError")
extern class FileError {
	static var NOT_FOUND_ERR : Int; //1
    static var SECURITY_ERR : Int; //2
    static var ABORT_ERR : Int; //3
    static var NOT_READABLE_ERR : Int; // 4
    static var ENCODING_ERR : Int; //5
    static var NO_MODIFICATION_ALLOWED_ERR : Int; //6
    static var INVALID_STATE_ERR  : Int; //7
    static var SYNTAX_ERR : Int; //8
    static var INVALID_MODIFICATION_ERR : Int; //9
    static var QUOTA_EXCEEDED_ERR : Int; //10
    static var TYPE_MISMATCH_ERR : Int; //11
    static var PATH_EXISTS_ERR : Int; //12
	var code : Int;
	function new() : Void;
}
