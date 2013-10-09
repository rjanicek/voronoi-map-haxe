package co.janicek.core;

/**
 * ...
 * @author Richard Janicek
 */
class EnumCore{

	/**
	 * Parse string into Enum. If result is undefined, return null.
	 */
	public static function parseEnum<T>( e : Enum<T>, constr : String, ?params : Array<Dynamic> ) : Null<T> {
		var result : T = null;
		try {
			result = Type.createEnum(e, constr, params);
		}
		catch (error : Dynamic){
		}
		return result;
	}
	
}