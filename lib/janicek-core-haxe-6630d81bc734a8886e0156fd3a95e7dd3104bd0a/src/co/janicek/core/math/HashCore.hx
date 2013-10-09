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

/**
 * Hashing Algorithms
 * 
 * @author Richard Janicek
 */

class HashCore {

	/**
	 * Compute string hash using djb2 algorithm.
	 * 
	 * Has a good balance of being extremely fast, while providing a reasonable distribution of hash values.
	 * @see http://www.cse.yorku.ca/~oz/hash.html
	 */
	public static function djb2( s : String ) : Int {
		var hash = 5381;
		for (i in 0...s.length) {
            hash = ((hash << 5) + hash) + s.charCodeAt(i);
		}
        return hash;
	}
	
	/**
	 * Compute string hash using sdbm algorithm.
	 * 
	 * This algorithm was created for sdbm (a public-domain reimplementation of ndbm) database library.
	 * It was found to do well in scrambling bits, causing better distribution of the keys and fewer splits.
	 * It also happens to be a good general hashing function with good distribution.
	 * @see http://www.cse.yorku.ca/~oz/hash.html
	 */
	public static function sdbm( s : String ) : Int {
		var hash = 0;
		for (i in 0...s.length) {
			hash = s.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
		}
        return hash;
	}
	
	/**
	 * Java's String.hashCode() method implemented in Haxe.
	 * @see http://docs.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#hashCode%28%29
	 */
	public static function javaHashCode( s : String ) : Int {
		var hash = 0;
		if (s.length == 0) return hash;
		for (i in 0...s.length) {
			hash = ((hash << 5) - hash) + s.charCodeAt(i);
			hash = hash & hash; // Convert to 32bit integer
		}
        return hash;
	}

}