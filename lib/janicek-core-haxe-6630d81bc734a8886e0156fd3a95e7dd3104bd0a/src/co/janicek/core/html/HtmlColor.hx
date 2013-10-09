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
package co.janicek.core.html;

/**
 * HTML Color constructors.
 * @see http://www.w3schools.com/cssref/css_colornames.asp
 * @author Richard Janicek
 */

enum HtmlColor {
	/**
	 * Make a color from an integer value.
	 */
	Color( color : Int );
	Rgb( r : Int, g : Int, b : Int );
	Rgba( red : Int, green : Int, blue : Int, alpha : Float );
	RgbF( red : Float, green : Float, blue : Float );
	RgbaF( red : Float, green : Float, blue : Float, alpha : Float );
	Hsl( hue : Int, saturation : Float, lightness : Float );
	Hsla( hue : Int, saturation : Float, lightness : Float, alpha : Float );
}

class HtmlColors {
	/**
	 * Convert HtmlColor to string.
	 */
	public static function toString( c : HtmlColor ) : String {
		return switch (c) {
			case Color(c) : HtmlColorCore.intToHexColor(c);
			case Rgb(r, g, b) : HtmlColorCore.rgb(r, g, b);
			case Rgba(r, g, b, a) : HtmlColorCore.rgba(r, g, b, a);
			case RgbF(r, g, b) : HtmlColorCore.rgbF(r, g, b);
			case RgbaF(r, g, b, a) : HtmlColorCore.rgbaF(r, g, b, a);
			case Hsl(h, s, l): HtmlColorCore.hsl(h, s, l);
			case Hsla(h, s, l, a): HtmlColorCore.hsla(h, s, l, a);
		}
	}
}