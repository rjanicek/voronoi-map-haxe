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
package co.janicek.core.array;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dCore {

	/**
	 * Get value at index.
	 */
	public static function get<T>( a : Array<Array<T>>, x : Int, y : Int) : T {
		if (a[y] == null) {
			return null;
		}
		return a[y][x];
	}

	/**
	 * Set value at index.
	 */
	public static function set<T>( a : Array<Array<T>>, x : Int, y : Int, value : T ) : Array<Array<T>> {
		if (a[y] == null) {
			a[y] = new Array();
		}
		a[y][x] = value;
		return a;
	}
	
	/**
	 * Compute two dimensional indices of a flat index based on array width and block size.
	 */
	public static function getIndices( index : Int, width : Int, blockSize = 1 ) : Array2dIndex {
		return {
			x : Std.int(index / blockSize) % width,
			y : Std.int((index / blockSize) / width)
		}
	}
	
	public static function foreachY<T>( a : Array<Array<T>>, f : Array<T> -> Void ) : Void {
		for (y in a) {
			if (y != null) {
				f(y);
			}
		}
	}

	public static function foreachXY<T>( a : Array<Array<T>>, f : Int -> Int -> T -> Void) : Void {
		for (yIndex in 0...a.length) {
			if (a[yIndex] != null) {
				for (xIndex in 0...a[yIndex].length) {
					var value = a[yIndex][xIndex];
					if (value != null) {
						f(xIndex, yIndex, value);	
					}
				}
				
			}
		}
	}
	
	public static function any<T>( a : Array<Array<T>>, f : T -> Bool ) : Array2dIndex {
		for (yIndex in 0...a.length) {
			if (a[yIndex] != null) {
				for (xIndex in 0...a[yIndex].length) {
					var value = a[yIndex][xIndex];
					if (value != null) {
						if (f(value)) {
							return {x:xIndex, y:yIndex };
						};	
					}
				}
			}
		}
		return null;
	}

	/**
	 * Get dimensions of array.
	 */
	public static function dimensions<T>( array : Array<Array<T>> ) : Array2dIndex {
		var height = array.length;
		var width = 0;
		
		foreachY(array, function(y:Array<T>):Void { 
			width = cast Math.max(width, y.length);
		} );

		return {x:width, y:height};
	}
	
	/**
	 * Returns an iterator of the 2D Array values.
	 */
	public static function values<T>( array : Array<Array<T>> ) : Iterable<T> {
		return { iterator: function() { return new Array2dValueIterator(array); }}
	}
	
	/**
	 * Returns an iterator of the 2D Array indexes.
	 */
	public static function indexes<T>( array : Array<Array<T>> ) : Iterable<Array2dIndex> {
		return { iterator: function() { return new Array2dIterator(array); }}
	}
	
}