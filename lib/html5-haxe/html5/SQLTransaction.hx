package html5;

typedef SQLTransaction = {
	 function executeSql( sqlStatement : String,
	 					  ?arguments : Array<Dynamic>,
	 					  ?cb : SQLTransaction->SQLResultSet->Void,
	 					  ?errorCb : SQLTransaction->SQLError->Void ) : Void;
}
