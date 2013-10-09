package html5;

typedef SQLError = {
	
	var UNKNOWN_ERR : Int;
	var DATABASE_ERR : Int;
	var VERSION_ERR : Int;
	var TOO_LARGE_ERR : Int;
	var QUOTA_ERR : Int;
	var SYNTAX_ERR : Int;
	var CONSTRAINT_ERR : Int;
	var TIMEOUT_ERR : Int;
	
	var code(default,null) : Int;
	var message(default,null) : String;
}
