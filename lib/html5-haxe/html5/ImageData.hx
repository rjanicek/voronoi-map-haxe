package html5;

typedef ImageData = {
	/** The width of the image in pixels; this is a read only unsigned long. */
	var width : Float;
	/** The height of the image in pixels; this is a read only unsigned long. */
	var height : Float;
	/** A CanvasPixelArray object containing the image data. */
	var data : CanvasPixelArray;
}
