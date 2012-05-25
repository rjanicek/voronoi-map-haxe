package as3.ac3core;

import as3.as3types.TypeDefs;

class ConversionCore {

	public static inline function intFromBoolean(b:Boolean):Int {
		return b ? 1 : 0;
	}
	
	public static inline function booleanFromInt(i:Int):Boolean {
		return (i == null) ? false : i > 0;
	}
	
	public static inline function isNull(d:Dynamic):Boolean {
		return d == null;
	}
	
	public static inline function isNotNull(d:Dynamic):Boolean {
		return d != null;
	}

}