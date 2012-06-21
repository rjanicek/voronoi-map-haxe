package as3;

import as3.Rectangle;
import as3.TypeDefs;

class RectangleCore {

	public static function left(r:Rectangle):Number {
		return r.x;
	}
	
	public static function right(r:Rectangle):Number {
		return r.x + r.width;
	}
	
	public static function top(r:Rectangle):Number {
		return r.y;
	}
	
	public static function bottom(r:Rectangle):Number {
		return r.y + r.height;
	}
	
}