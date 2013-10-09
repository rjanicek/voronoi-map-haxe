/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Haxe conversion by Richard Janicek
Dual licensed under the MIT and GPL licenses.
*/
package co.janicek.core.math;

using co.janicek.core.math.RandomCore;
using co.janicek.core.NullCore;
using co.janicek.core.math.MathCore;
using Std;
using EReg;
using StringTools;

/**
 * Random universally unique identifier (UUID) generators.
 * @see <a href="http://en.wikipedia.org/wiki/Uuid">http://en.wikipedia.org/wiki/Uuid</a>
 */
class UUID {

	private static var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  
	/**
	 * Generate a UUID.
	 * 
	 * EXAMPLES:
	 *
	 *   One argument - returns ID of the specified length
	 *   >>> uuid(15)     // 15 character ID (default base=62)
	 *   "VcydxgltxrVZSTV"
	 *
	 *   Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
	 *   >>> uuid(8, 2)  // 8 character ID (base=2)
	 *   "01001010"
	 *   >>> uuid(8, 10) // 8 character ID (base=10)
	 *   "47473046"
	 *   >>> uuid(8, 16) // 8 character ID (base=16)
	 *   "098F4D35"
	 * 
	 * @param	length the desired number of characters
	 * @param	radix the number of allowable values for each character, clamped to [2,62], default = 62
	 * @param	seed optional PRNG seed
	 */
	public static function uuid( length : Int, ?radix : Int, ?seed : Int ) {
		
		if (seed.isNull()) seed = RandomCore.makeRandomSeed();
		var chars = CHARS, uuid = [], i;
		radix = radix.coalesce(chars.length).clampInt(2, chars.length);

		for (i in 0...length) uuid[i] = chars[0 | ((seed = seed.nextParkMiller()).toFloat() * radix).int()];

		return uuid.join("");
	}
	
	/**
	 * Generate a UUID using specific characters.
	 * @param	length the desired number of characters
	 * @param	?characters optional desired characters to use to build the UUID
	 * @param	?seed optional PRNG seed
	 */
	public static function uuidChars( length : Int, ?characters : String, ?seed : Int ) {
		if (seed.isNull())
			seed = RandomCore.makeRandomSeed();
		var chars = characters.isNull() ? CHARS : characters.split("");
		if (chars.length < 2)
			throw "must have at least 2 characters";
		var uuid = [];
		var radix = chars.length;
		for (i in 0...length) uuid[i] = chars[0 | ((seed = seed.nextParkMiller()).toFloat() * radix).int()];
		return uuid.join("");
	}
	
	/**
	 * generate RFC4122, version 4 ID
	 * example "92329D39-6F5C-4520-ABFC-AAB64544E172"
	 * @param	seed optional PRNG seed
	 */
	public static function uuidRfc4122V4( ?seed : Int ) {
		
		if (seed.isNull()) seed = RandomCore.makeRandomSeed();
		var chars = CHARS, uuid = [], i;

		// rfc4122, version 4 form
		var r : Int;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
		uuid[14] = "4";

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i in 0...36) {
			if (uuid[i].isNull()) {
				r = 0 | ((seed = seed.nextParkMiller()).toFloat() * 16).int();
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}

		return uuid.join("");
	}
	
	/**
	* A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	* by minimizing calls to random()
	*/
	public static function uuidFast( ?seed : Int ) {
		if (seed.isNull()) seed = RandomCore.makeRandomSeed();
		var chars = CHARS, uuid = new Array(), rnd=0, r;
		for (i in 0...36) {
			if (i==8 || i==13 ||  i==18 || i==23) {
				uuid[i] = "-";
			} else if (i==14) {
				uuid[i] = "4";
			} else {
				if (rnd <= 0x02) rnd = 0x2000000 + ((seed = seed.nextParkMiller()).toFloat() * 0x1000000).int() | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join("");
	}
	
	/**
	 * A more compact, but less performant, RFC4122v4 solution:
	 */
	public static function uuidCompact( ?seed : Int ) {
		if (seed.isNull()) seed = RandomCore.makeRandomSeed();
		return new EReg("[xy]", "g").map("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", function (c) {
			var r = ((seed = seed.nextParkMiller()).toFloat() * 16).int() | 0, v = c.matched(0) == "x" ? r : (r & 0x3 | 0x8);
			return v.hex();
		});
	}
	
}