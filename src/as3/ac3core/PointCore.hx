package as3.ac3core;

import as3.as3types.TypeDefs;

using Math;

class PointCore {

	/**
	 * The length of the line segment from (0,0) to this point.
	 */
	public static function distanceFromOrigin(p:Point):Number {
		return distance( { x:0.0, y:0.0 }, p);
	}
	
	public static function distance(a:Point, b:Point):Number {
		return (	(a.x - b.x).pow(2)
				  + (a.y - b.y).pow(2)	).sqrt();
	}

	/**
	 * Determines a point between two specified points. The parameter f determines where the new interpolated point is 
	 * located relative to the two end points specified by parameters pt1 and pt2. The closer the value of the parameter f 
	 * is to 1.0, the closer the interpolated point is to the first point (parameter pt1). The closer the value of the
	 * parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
	 * @param	pt1 The first point.
	 * @param	pt2 The second point.
	 * @param	f The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
	 * @return The new, interpolated point.
	 */
	public static function interpolate(pt1:Point, pt2:Point, f:Number):Point {
		return { x:(pt1.x - pt2.x) * f + pt2.x, y:(pt1.y - pt2.y) * f + pt2.y };
	}	
	
	// subtract first point and second point
    public static inline function subtract(p0:Point, p1:Point) : Point {
        return { x:p0.x - p1.x, y:p0.y - p1.y };
    }
	
	public static function hash(p:Point):String {
		return p.x + "," + p.y;
	}
	
}