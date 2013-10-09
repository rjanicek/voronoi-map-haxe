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
package co.janicek.core;

using co.janicek.core.NullCore;
using co.janicek.core.LambdaCore;

/**
 * Functions for nulls.
 * @author Richard Janicek
 */

class NullCore {

	/**
	 * Tests if nullable type is null.
	 */
	public static inline function isNull( nullable : Null<Dynamic> ) : Bool {
		return nullable == null;
	}
	
	/**
	 * Tests if nullable type is not null.
	 */
	public static inline function isNotNull( nullable : Null<Dynamic> ) : Bool {
		return nullable != null;
	}
	
	/**
	 * Coalesce a nullable type using a default value.
	 * @return Value of nullable type if it's not null else default value.
	 */
	public static inline function coalesce<T>( nullable : Null<T>, defaultValue :  Null<T> ) : Null<T> {
		return nullable.isNull() ? defaultValue : nullable;
	}
	
	/**
	 * Coalesce a list of nullable type.
	 * @return Value of first non null in list else null.
	 */
	public static function coalesceIter<T>( nullables : Iterable<Null<T>> ) : Null<T> {
		return nullables.first(function(n) { return n.isNotNull(); } );
	}
	
}