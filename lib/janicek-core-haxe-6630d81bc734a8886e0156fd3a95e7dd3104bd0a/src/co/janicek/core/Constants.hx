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

/**
 * Constants
 * @author Richard Janicek
 */

class Constants {
	public static inline var SECONDS_PER_MINUTE = 60;
	public static inline var SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
	public static inline var SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;
	public static inline var MINUTES_PER_HOUR = 60;
	public static inline var HOURS_PER_DAY = 24;
	
	/**
	 * @see http://en.wikipedia.org/wiki/Kibibyte
	 */
	public static inline var BYTES_IN_KIBIBYTE = 1024;
	public static inline var BYTES_IN_MEBIBYTE = 1024 * BYTES_IN_KIBIBYTE;
	
	public static var UPPERCASE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	public static var LOWERCASE_ALPHABET = "abcdefghijklmnopqrstuvwxyz";
	public static var DIGITS = "0123456789";
}