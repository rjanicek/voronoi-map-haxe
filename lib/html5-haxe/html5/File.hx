package html5;

@:native("File")
extern class File extends Blob {
	var name(default,null) : String;
	var lastModifiedDate(default,null) : Date;
}
