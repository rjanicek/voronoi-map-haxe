package co.janicek.core.math;

/**
 * ...
 * @author Richard Janicek
 */
class GeometryCore{

	/**
	 * Centers one rectangle on another and returns it's top, left coordinates.
	 */
	public static function getCenterRectangles( anchorTop : Float, anchorLeft : Float, anchorWidth : Float, anchorHeight : Float,
		movableTop : Float, movableLeft : Float, movableWidth : Float, movableHeight : Float ) : { left : Float, top : Float } {
		
		var anchorCenterY = anchorTop + (anchorHeight / 2);
		var anchorCenterX = anchorLeft + (anchorWidth / 2);
		var movableCenterY = movableTop + (movableHeight / 2);
		var movableCenterX = movableLeft + (movableWidth / 2);
		return {left : anchorCenterX - movableCenterX, top : anchorCenterY - movableCenterY};
	}
	
	/**
	 * Constrain a rectangle to maximum dimensions with optional aspect ratio preservation.
	 */
	public static function fitRectangle( width : Float, height : Float, maxWidth : Float, maxHeight : Float, preserveAspectRatio = true ) : { width : Float, height : Float } {
		var scale = preserveAspectRatio 
			? Math.min(width <= maxWidth ? 1 : maxWidth / width, height <= maxHeight ? 1 : maxHeight / height) 
			: 1;
		return {
			width : Math.min(width * scale, maxWidth) ,
			height : Math.min(height * scale, maxHeight)
		}
	}
	
}