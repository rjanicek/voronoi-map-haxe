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

using co.janicek.core.array.Array2dCore;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dIterator<T> {
	var a:Array<Array<T>>;
	var nextValue : Array2dIndex;
	var y:Int;
	var x:Int;
	
	public function new(a:Array<Array<T>>) {
		this.a = a;
		y = 0;
		x = 0;
		nextValue = null;
	}

	public function hasNext():Bool {
		if (nextValue != null) {
			return true;
		}
		
		while (y < a.length) {
			if (a[y] != null) {
				while (x < a[y].length && a[y][x] == null) {
					x++;
				}
				if (a[y][x] != null) {
					nextValue = { x:x, y:y };
					x++;
					return true;
				}
				x = 0;
			}
			y++;
		}
		
		return false;
    }

    public function next():Array2dIndex {
		var n = nextValue;
		nextValue = null;
		return n;
	}
}