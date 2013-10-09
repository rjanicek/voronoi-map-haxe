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

using co.janicek.core.LambdaCore;
using co.janicek.core.NullCore;
using co.janicek.core.StringCore;
using Lambda;

class StringCore {

	/**
	 * Remove pattern from end of string.
	 * @param	string String to remove pattern from.
	 * @param	pattern String to remove from end of other string.
	 * @return	String with pattern removed from end.
	 */
	public static function removeFromEnd( string : String, pattern : String ) :  String {
		if (StringTools.endsWith(string, pattern)) {
			return string.substr(0, string.lastIndexOf(pattern));
		}		
		return string;
	}

	
	/**
	 * Test if string contains another string.
	 * @param	search String to test.
	 * @param	pattern Pattern to find in test string.
	 * @param	ignoreCase Ignore case when searching for pattern? default = false
	 * @return	True if string contains pattern, else false.
	 */
	public static function contains( string : String, pattern : String, ignoreCase = false ) : Bool {
		if (ignoreCase) {
			string = string.toLowerCase();
			pattern = pattern.toLowerCase();
		}
		return string.indexOf(pattern) != -1;
	}

	/**
	 * Test if sting is empty.
	 * @return True if string is empty.
	 */
	public static inline function isEmpty( string : String ) : Bool {
		return string.length == 0;
	}
	
	/**
	 * Test if sting is null or empty.
	 * @return True if string is null or empty.
	 */
	public static inline function isNullOrEmpty( string : Null<String> ) : Bool {
		return (string.isNull() || string.isEmpty());
	}
	
	/**
	 * Test if sting is not null or empty.
	 * @return True if string is not null or empty.
	 */
	public static inline function isNotNullOrEmpty( string : Null<String> ) : Bool {
		return !string.isNullOrEmpty();
	}

	/**
	 * Find first string that is not null or empty.
	 * @return First string that is not null or empty or null if none found.
	 */
	public static function firstNotNullOrEmpty( strings : Iterable<Null<String>> ) : Null<String> {
		return strings.first(function(s) {
			return s.isNotNullOrEmpty();
		});
	}
	
	/**
	 * Test string for Integer value.
	 * @param	s String to test.
	 * @return	True if string is an Integer, else false.
	 */
	public static function isInteger( s : String ) : Bool {
		if (s.contains(".")) return false;
		return Std.parseInt(s) != null;
	}
	
	/**
	 * Wraps a string to a given number of characters.
	 * @param	text The text to wrap.
	 * @param	width The number of characters at which the string will be wrapped.
	 * @param	cut If the cut is set to TRUE, the string is always wrapped at or before the specified width. So if you have a word that is larger than the given width, it is broken apart.
	 * @return 	Original text as an array of strings each wrapped to width.
	 */
	public static function wordWrap( text : String, width = 75, cut = false ) : Array<String> {
		
		var textLines = text.split("\n");

		var wordWrappedLines = new Array<String>();
		
		textLines.iter(function(line) {
			if (line.length == 0) {
				wordWrappedLines.push(line);
			}
			else {
				var regex = new EReg(".{1," +width + "}(\\s|$)" + (cut ? "|.{" +width + "}|.+$" : "|\\S+?(\\s|$)"), "g");
				
				while (regex.match(line)) { 
					wordWrappedLines.push(regex.matched(0));
					line = regex.matchedRight(); 
				} 
			}		
		});	
		return wordWrappedLines;
	}
	
}