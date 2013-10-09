package html5;

typedef SQLResultSet = {
	var insertId(default,null) : Int;
	var rowsAffected(default,null) : Int;
	var rows(default,null) : SQLResultSetRowList;
}
