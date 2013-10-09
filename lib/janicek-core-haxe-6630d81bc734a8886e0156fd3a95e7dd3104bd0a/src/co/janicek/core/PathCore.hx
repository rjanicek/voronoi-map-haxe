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

using StringTools;
using co.janicek.core.StringCore;

class PathCore {

	/**
	 * @param	pathDelimeter (default = "/")
	 */
	public static function getDirectoryName( path : String, pathDelimeter = "/" ) : String {
		return path.substr(0, path.lastIndexOf(pathDelimeter));
	}
	
	/**
	 * @param	pathDelimeter (default = "/")
	 */
	public static function getFileName( path : String, pathDelimeter = "/" ) : String {
		var fragments = path.split(pathDelimeter);
		return fragments[fragments.length - 1];
	}
	
	/**
	 * @param	fileExtensionDelimeter (default = ".")
	 */
	public static function removeFileNameExtension( path : String, fileExtensionDelimeter = "." ) : String {
		return path.split(fileExtensionDelimeter)[0];
	}
	
	/**
	 * Aggressively remove caracters that might be invalid for a filename.
	 */
	public static function makeSafeFilename( fileName : String ) : String {
		if (fileName.isNullOrEmpty()) {
			return "";
		}
		var r = ~/[^A-Za-z0-9 _\-\.]/g;
		return r.replace(fileName, "");
	}

}