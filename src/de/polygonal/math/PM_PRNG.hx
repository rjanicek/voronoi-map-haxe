package de.polygonal.math;

import as3.TypeDefs;

class PM_PRNG {

	/**
	 * set seed with a 31 bit unsigned integer
	 * between 1 and 0X7FFFFFFE inclusive. don't use 0!
	 */
	public var seed:Int;

	public function new() {
		seed = 1;		
	}
	
	/**
	 * provides the next pseudorandom number
	 * as a float between nearly 0 and nearly 1.0.
	 */
	public function nextDouble():Number
	{
		return (gen() / 2147483647);
	}	
	
	/**
	 * provides the next pseudorandom number
	 * as an unsigned integer (31 bits) betweeen
	 * a given range.
	 */
	public function nextIntRange(min:Number, max:Number):Int
	{
		min -= .4999;
		max += .4999;
		return Math.round(min + ((max - min) * nextDouble()));
	}
	
	/**
	 * provides the next pseudorandom number
	 * as a float between a given range.
	 */
	public function nextDoubleRange(min:Number, max:Number):Number
	{
		return min + ((max - min) * nextDouble());
	}	
	
	/**
	 * generator:
	 * new-value = (old-value * 16807) mod (2^31 - 1)
	 */
	private function gen():Int
	{
		//integer version 1, for max int 2^46 - 1 or larger.
		return seed = (seed * 16807) % 2147483647;
		
		/**
		 * integer version 2, for max int 2^31 - 1 (slowest)
		 */
		//var test:int = 16807 * (seed % 127773 >> 0) - 2836 * (seed / 127773 >> 0);
		//return seed = (test > 0 ? test : test + 2147483647);
		
		/**
		 * david g. carta's optimisation is 15% slower than integer version 1
		 */
		//var hi:uint = 16807 * (seed >> 16);
		//var lo:uint = 16807 * (seed & 0xFFFF) + ((hi & 0x7FFF) << 16) + (hi >> 15);
		//return seed = (lo > 0x7FFFFFFF ? lo - 0x7FFFFFFF : lo);
	}	
	
}