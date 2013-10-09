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

import co.janicek.core.math.MathCore;

using Std;

/**
 * Pseudo random number generator (PRNG) using a functional style.
*/
class RandomCore {
	
	/**
	 * (a Mersenne prime M31) modulus constant = 2^31 - 1 = 0x7ffffffe
	 */
	private inline static var MPM = 2147483647.0;
	
	/**
	 * (a primitive root modulo M31)
	 */
	private inline static var MINSTD = 16807.0;

	/**
	 * Make a non deterministic random seed using standard libraries.
	 * @return Non deterministic random seed.
	 */
	public static function makeRandomSeed() : Int {
        return Math.floor(Math.random() * MPM);
    }
	
	/**
	 * Park-Miller-Carta algorithm.
	 * @see <a href="http://lab.polygonal.de/?p=162">http://lab.polygonal.de/?p=162</a>
	 * @see <a href="http://code.google.com/p/polygonal/source/browse/trunk/src/lib/de/polygonal/core/math/random/ParkMiller.hx?r=547">http://code.google.com/p/polygonal/source/browse/trunk/src/lib/de/polygonal/core/math/random/ParkMiller.hx?r=547</a> 
	 * @see <a href="http://en.wikipedia.org/wiki/Lehmer_random_number_generator">http://en.wikipedia.org/wiki/Lehmer_random_number_generator</a>
	 * @return Returns the next pseudo-random int value.
	 */
	public static inline function nextParkMiller( seed : Int ) : Int {
		return ((seed * MINSTD) % MPM).int();
	}
	
	/**
	 * <p>A Park-Miller-Carta PRNG (pseudo random number generator).</p>
	 * <p>Integer implementation, using only 32 bit integer maths and no divisions.</p>
	 * @see <a href="https://github.com/polygonal/core/blob/dev/src/de/polygonal/core/math/random/ParkMiller31.hx">POLYGONAL - A HAXE LIBRARY FOR GAME DEVELOPERS</a>
	 * @see <a href="http://www.firstpr.com.au/dsp/rand31/rand31-park-miller-carta.cc.txt" target="_blank">http://www.firstpr.com.au/dsp/rand31/rand31-park-miller-carta.cc.txt</a>
	 * @see <a href="http://en.wikipedia.org/wiki/Park%E2%80%93Miller_random_number_generator" target="_blank">Park-Miller random number generator</a>.
	 * @see <a href="http://lab.polygonal.de/?p=162" target="_blank">A good Pseudo-Random Number Generator (PRNG)</a>.
	 */
	public static function nextParkMiller31( seed : Int ) : Int {
		var lo:Int = 16807 * (seed & 0xffff);
		var hi:Int = 16807 * (seed >>> 16);
		lo += (hi & 0x7fff) << 16;
		lo += hi >>> 15;
		if (lo > 0x7fffffff) lo -= 0x7fffffff;
		return lo;
	}

    /**
	 * Linear congruential generator using GLIBC constants.
     * 
	 * @see <a href="http://en.wikipedia.org/wiki/Linear_congruential_generator">http://en.wikipedia.org/wiki/Linear_congruential_generator</a>
	 * @see <a href="https://github.com/aduros/flambe/blob/master/src/flambe/util/Random.hx">https://github.com/aduros/flambe/blob/master/src/flambe/util/Random.hx</a>
	 * @return Returns an integer in [0, INT_MAX)
     */
    public static inline function nextLCG( seed : Int ) : Int {
        // These constants borrowed from glibc
        // Force float multiplication here to avoid overflow in Flash (and keep parity with JS)
        return ((1103515245.0 * seed + 12345) % MPM).int();
    }

	/**
	 * Returns the pseudo-random double value x in the range 0 <= x < 1.
	 */
	public static inline function toFloat( seed : Int ) : Float {
		return seed / MPM;
	}
	
	/**
	 * Returns a pseudo-random boolean value (coin flip).
	 */
	public static inline function toBool( seed : Int ) : Bool {
		return toFloat(seed) > 0.5;
	}
	
		/**
	 * Returns a pseudo-random double value x in the range min <= x <= max.
	 */
	public static inline function toFloatRange( seed : Int, min : Float, max : Float ) : Float {
		return min + (max - min) * toFloat(seed);
	}
	
	/**
	 * Returns a pseudo-random integral value x in the range min <= x <= max.
	 */
	public static inline function toIntRange( seed : Int, min : Int, max : Int ) : Int {
		return Math.round((min - 0.4999) + ((max + 0.4999) - (min - 0.4999)) * toFloat(seed));
	}
	
	/**
	 * Converts a string to a seed.
	 * Lets you use words as seeds.
	 */
	public static function stringToSeed( s : String ) : Int {
        return (HashCore.djb2(s) % MPM).int();
	}
}