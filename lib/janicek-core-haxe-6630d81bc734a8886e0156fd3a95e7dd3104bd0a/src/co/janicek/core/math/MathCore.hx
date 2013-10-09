/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package co.janicek.core.math;

using co.janicek.core.math.MathCore;
using Lambda;
using Math;
using Std;

class MathCore {

	/**
	 * Max value, signed integer.  
	 */
	inline public static var  INT32_MAX = 0x7fffffff;
	
	/**
	 * Biggest whole number.
	 * WARNING: WHOLE_NUMBER_MAX + 1 === WHOLE_NUMBER_MAX
	 * WARNING: bit operations don't work on numbers > INT32_MAX
	 * @see <a href="http://en.wikipedia.org/wiki/IEEE_754-1985">http://en.wikipedia.org/wiki/IEEE_754-1985</a>
	 */
	inline public static var WHOLE_NUMBER_MAX = 9007199254740992;
	
	/**
	 * Smallest whole number.
	 * WARNING: WHOLE_NUMBER_MIN - 1 === WHOLE_NUMBER_MIN
	 * WARNING: bit operations don't work on numbers < -INT32_MAX
	 * @see <a href="http://en.wikipedia.org/wiki/IEEE_754-1985">http://en.wikipedia.org/wiki/IEEE_754-1985</a>
	 */
	inline public static var WHOLE_NUMBER_MIN = -9007199254740992;

	public static function isEven( n : Int ) : Bool {
		return n % 2 == 0;
	}
	
	public static function isOdd( n : Int ) : Bool {
		return !isEven(n);
	}
	
	/**
	 * clamp an Integer to an interval
	 * interval endpoints are compared to get min and max, so it doesn't matter what order they are passed in
	 * @param	value value to clamp
	 * @param	minOrMax1 interval endpoint
	 * @param	minOrMax2 interval endpoint
	 * @return 	clamped value to given interval
	 */
	public static function clampInt( value : Int, minOrMax1 : Int, minOrMax2 : Int ) : Int {
		return value.clamp(minOrMax1, minOrMax2).int();
	}
	
	/**
	 * clamp a Float to an interval
	 * interval endpoints are compared to get min and max, so it doesn't matter what order they are passed in
	 * @param	value value to clamp
	 * @param	minOrMax1 interval endpoint
	 * @param	minOrMax2 interval endpoint
	 * @return 	clamped value to given interval
	 */
	public static function clamp( value : Float, minOrMax1 : Float, minOrMax2 : Float ) : Float {
		var min = Math.min(minOrMax1, minOrMax2);
		var max = Math.max(minOrMax1, minOrMax2);
		return value < min ? min : value > max ? max : value;
	}
	
	public static function degreesToRadians( degrees : Float ) : Float {
		return (degrees * Math.PI) / 180;
	}
	
	public static function radiansToDegrees( radians : Float ) : Float {
		return (radians * 180) / Math.PI;
	}
	
	public static function average( numbers : Array<Float> ) : Float {
		return numbers.fold(function(number, total) {
			return total + number;
		}, 0) / numbers.length;
	}
	
	public static function averageInt( numbers : Array<Int> ) : Float {
		return numbers.fold(function(number, total) {
			return total + number;
		}, 0) / numbers.length;
	}
	
	/**
	 * Calculate the distance between two points.
	 */
	public static function distance( a : {x : Float, y:Float}, b : {x : Float, y:Float} ) : Float {
		return (	(a.x - b.x).pow(2)
				  + (a.y - b.y).pow(2)	).sqrt();
	}
	
}