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

using co.janicek.core.StringCore;
using Lambda;

/**
 * Hash table functions.
 * @author Richard Janicek
 */
class HashTableCore {

	public static inline var DEFAULT_KEY_VALUE_DELIMETER = "=";
	public static inline var DEFAULT_KEY_VALUE_DELIMETER_REGEX_PATTERN = DEFAULT_KEY_VALUE_DELIMETER;
	public static inline var DEFAULT_KEY_VALUE_PAIR_DELIMETER = "&";
	public static inline var DEFAULT_KEY_VALUE_PAIR_DELIMETER_REGEX_PATTERN = DEFAULT_KEY_VALUE_PAIR_DELIMETER;
	
	/**
	 * Parse a string into a hash table using regular expression patterns for delimeters.
	 */
	public static function parseHashTable( rawHashTable : String, keyValueDelimeterRegexPattern = DEFAULT_KEY_VALUE_DELIMETER_REGEX_PATTERN, pairDelimeterRegexPattern = DEFAULT_KEY_VALUE_PAIR_DELIMETER_REGEX_PATTERN ) : Map<String, String> {
		var hashTable = new Map<String, String>();
		
		if (!rawHashTable.isNullOrEmpty()) {
			var keyValueSplitter = new EReg(keyValueDelimeterRegexPattern, "");
			
			new EReg(pairDelimeterRegexPattern, "").split(rawHashTable).iter(function(rawKeyValuePair) {
					var item = keyValueSplitter.split(rawKeyValuePair);
					if (item.length == 1) {
						hashTable.set(item[0], "");
					}
					else if (item.length > 1) {
						hashTable.set(item[0], item[1]);
					}
			});
		}
		
		return hashTable;
	}
	
	/**
	 * Serialize a hash table into a string using delimeters.
	 */
	public static function stringifyHashTable( ht : Map < String, String > , keyValueDelimeter = DEFAULT_KEY_VALUE_DELIMETER, pairDelimeter = DEFAULT_KEY_VALUE_PAIR_DELIMETER ) : String {
		return { iterator: function(){return ht.keys();} }.fold(function(key, buf : String) {
			var value = ht.get(key);
			return (buf.isEmpty() ? "" : buf + pairDelimeter) + key + (value.isNullOrEmpty() ? "" : keyValueDelimeter + value);
		}, "");
	}

}