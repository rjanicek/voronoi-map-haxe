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
package co.janicek.core.http;
import haxe.ds.GenericStack;

using co.janicek.core.NullCore;
using co.janicek.core.HashTableCore;
using co.janicek.core.StringCore;
using Reflect;
using Lambda;
using Std;

/**
 * Parts of a URL.
 */
typedef Url = {
    source : String,
    protocol : String,
    authority : String,
    userInfo : String,
    user : String,
    password : String,
    host : String,
    port : String,
    relative : String,
    path : String,
    directory : String,
    file : String,
    query : String,
    fragment : String	
}

/**
 * Functions related to URL's.
 * @see <a href="http://en.wikipedia.org/wiki/Url">http://en.wikipedia.org/wiki/Url</a>
 * @author Richard Janicek
 */
class UrlCore {
	public static inline var URL_QUERY_DELIMETER = "?";
	public static inline var URL_FRAGMENT_DELIMETER = "#";
	public static inline var KEY_VALUE_DELIMETER = "=";
	public static inline var KEY_VALUE_PAIR_DELIMETER = "&";
	
	public static function makeEmptyUrl() : Url {
		return {
			source : "",
			protocol : "",
			authority : "",
			userInfo : "",
			user : "",
			password : "",
			host : "",
			port : "",
			relative : "",
			path : "",
			directory : "",
			file : "",
			query : "",
			fragment : ""
		}
	}
	
	/**
	 * Parse a URL string into it's parts.
	 * @see <a href="http://en.wikipedia.org/wiki/URI_scheme">http://en.wikipedia.org/wiki/URI_scheme</a>
	 */
	public static function parseUrl( url : String ) : Url {
		var urlParts = makeEmptyUrl();
		
        // The almighty regexp (courtesy of http://blog.stevenlevithan.com/archives/parseuri)
        var r : EReg = ~/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
 
        // Match the regexp to the url
        r.match(url);
 
        // Use reflection to set each part
		var i = 0;
        for (field in urlParts.fields()) {
			var part = r.matched(i).coalesce("");
            urlParts.setField(field, part);
			i++;
        }
		
		return urlParts;
	}
	
	/**
	 * Parse a URL query into a struct object.
	 * Duplicate keys are stored as arrays.
	 * The caller can store the result in a strongly typed struct: eg: typedef Query = { id : String, item : Array<String> }
	 */
	public static function parseUrlQuery( query : String ) : Dynamic {
		if (query.charAt(0) == URL_QUERY_DELIMETER) {
			query = query.substr(1);
		}
		return parseKeyValuePairsToStruct(query, KEY_VALUE_DELIMETER, KEY_VALUE_PAIR_DELIMETER);
	}
	
	/**
	 * Parse a URL fragment into a struct object.
	 * Duplicate keys are stored as arrays.
	 * The caller can store the result in a strongly typed struct: eg: typedef Fragment = { id : String, item : Array<String> }
	 */
	public static function parseUrlFragment( fragment : String ) : Dynamic {
		if (fragment.charAt(0) == URL_FRAGMENT_DELIMETER) {
			fragment = fragment.substr(1);
		}
		return parseKeyValuePairsToStruct(fragment, KEY_VALUE_DELIMETER, KEY_VALUE_PAIR_DELIMETER);
	}
	
	/**
	 * Parse a string into a struct object using regular expression patterns for delimeters.
	 * Duplicate keys are stored as arrays.
	 * The caller can store the result in a strongly typed struct: eg: typedef Fragment = { id : String, item : Array<String> }
	 */
	public static function parseKeyValuePairsToStruct( delimetedData : String, keyValueDelimeterRegexPattern = KEY_VALUE_DELIMETER, pairDelimeterRegexPattern = KEY_VALUE_PAIR_DELIMETER ) : Dynamic {
		var struct = { };
		
		if (!delimetedData.isNullOrEmpty()) {
			var keyValueSplitter = new EReg(keyValueDelimeterRegexPattern, "");
			
			new EReg(pairDelimeterRegexPattern, "g").split(delimetedData).iter(function(delimetedData) {
					var item = keyValueSplitter.split(delimetedData);
					if (struct.hasField(item[0])) {
						if (!struct.field(item[0]).is(Array)) {
							var a = new Array<String>();
							a.push(struct.field(item[0]));
							struct.setField(item[0], a);
						}
						struct.field(item[0]).push(item.length > 1 ? item[1] : "");
					}
					else {
						struct.setField(item[0], item.length > 1 ? item[1] : "");
					}
			});
		}
		
		return struct;
	}
	
	public static function stringifyStructToKeyValuePairs( map : {}, keyValueDelimeter = KEY_VALUE_DELIMETER, pairDelimeter = KEY_VALUE_PAIR_DELIMETER ) : String {
		var fields = new Array<String>();
		for (field in map.fields()) {
			fields.push(field + keyValueDelimeter + StringTools.urlEncode(map.field(field)));
		}
		return fields.join(pairDelimeter);
	}
	

}