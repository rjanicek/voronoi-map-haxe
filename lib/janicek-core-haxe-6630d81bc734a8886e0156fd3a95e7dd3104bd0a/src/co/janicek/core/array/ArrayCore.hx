package co.janicek.core.array;

/**
 * Array Functions.
 * @author Richard Janicek
 */

class ArrayCore {

	/**
	 * Get first element of array.
	 */
	public static inline function first<T>( a : Array<T> ) : T {
		return a[0];
	}
	
	/**
	 * Get last element of array.
	 */
	public static inline function last<T>( a : Array<T> ) : T {
		return a[a.length - 1];
	}
	
	/**
	 * Moves an array element toward the start of the array with optional wrapping.
	 */
	public static function moveTowardStart<T>(a : Array<T>, index : Int, wrap = true) : Array<T> {
		
		if (a.length < 2 || index < 0 || index > a.length - 1) {
			return a;
		}
		
		if (index == 0) {
			if (wrap) {
				a.push(a.shift());
			}
		}
		else {
			a.insert(index - 1, a.splice(index, 1)[0]);
		}
		
		return a;
	}
	
	/**
	 * Moves an array element toward the end of the array with optional wrapping.
	 */
	public static function moveTowardEnd<T>(a : Array<T>, index : Int, wrap = true) : Array<T> {
		
		if (a.length < 2 || index < 0 || index > a.length - 1) {
			return a;
		}
		
		if (index == a.length - 1) {
			if (wrap) {
				a.unshift(a.pop());
			}
		}
		else {
			a.insert(index + 1, a.splice(index, 1)[0]);
		}
		
		return a;
	}
	
}