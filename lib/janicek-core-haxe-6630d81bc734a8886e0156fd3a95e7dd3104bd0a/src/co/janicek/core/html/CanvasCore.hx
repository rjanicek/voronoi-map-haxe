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

import co.janicek.core.array.Array2dCore;
import co.janicek.core.math.MathCore;
import html5.Canvas;
import html5.CanvasPixelArray;
import html5.CanvasRenderingContext2D;
import html5.File;
import html5.FileReader;
import html5.Image;
import html5.ImageData;
import js.Browser;

using co.janicek.core.array.Array2dCore;
using co.janicek.core.html.CanvasCore;
using co.janicek.core.math.MathCore;
using co.janicek.core.math.RandomCore;
using Std;

/**
 * Functions for working with HTML Canvas.
 * @author Richard Janicek
 */

class CanvasCore {

	public static inline var CANVAS_ELEMENTS_PER_PIXEL = 4;
	public static inline var CANVAS_RED_OFFSET = 0;
	public static inline var CANVAS_GREEN_OFFSET = 1;
	public static inline var CANVAS_BLUE_OFFSET = 2;
	public static inline var CANVAS_ALPHA_OFFSET = 3;

	/**
	 * Iterate canvas pixel array color channels.
	 * Functor is called with red, green, blue, and alpha channel values for each pixel.
	 * Functor can return new color channel values which will be assigned to pixel. Null values are ignored.
	 * 
	 * Can be used to analyze and transform a canvas pixel array.
	 */
	public static function renderCanvasPixelArray( imageData : ImageData, f : Int -> Int -> Int -> Int -> Int -> Null<{red : Null<Int>, green : Null<Int>, blue : Null<Int>, alpha : Null<Int>}> ) : Void {
		var pixels = imageData.data;
		var index:Int;
		for (i in 0...Std.int(pixels.length / CANVAS_ELEMENTS_PER_PIXEL)) {
			index = i * CANVAS_ELEMENTS_PER_PIXEL;
			var newValues = f(index, pixels[index + CANVAS_RED_OFFSET], pixels[index + CANVAS_GREEN_OFFSET], pixels[index + CANVAS_BLUE_OFFSET], pixels[index + CANVAS_ALPHA_OFFSET]);
			if (newValues != null) {
				if (newValues.red != null) {
					pixels[index + CANVAS_RED_OFFSET] = newValues.red;
				}
				if (newValues.green != null) {
					pixels[index + CANVAS_GREEN_OFFSET] = newValues.green;
				}
				if (newValues.blue != null) {
					pixels[index + CANVAS_BLUE_OFFSET] = newValues.blue;
				}
				if (newValues.alpha != null) {
					pixels[index + CANVAS_ALPHA_OFFSET] = newValues.alpha;
				}
			}
		}
	}

	/**
	 * Add random noise to image data by modifying each pixel color channel by a random amount between + and - noiseLevel.
	 * @param	noiseLevel Value between 1 and 255
	 * @param	grayScale True to change all color channels by same amount so only brightness of pixel is changed and not color. Doesn't affect alpha. (Default = false)
	 * @param	red Add noise to red channel. (Default = true)
	 * @param	green Add noise to green channel. (Default = true)
	 * @param	blue Add noise to blue channel. (Default = true)
	 * @param	alpha Add noise to alpha channel. (Default = false)
	 * @return	New bitmap containing the bitmap passed in with noise added.
	 */	
	public static function addNoise( pixelData : ImageData, randomSeed : Int, noiseLevel : Int, grayScale = false, changeRed = true, changeGreen = true, changeBlue = true, changeAlpha = false) : ImageData {
		noiseLevel = MathCore.clampInt(noiseLevel, 1, 255);
		var delta:Int;
		
		renderCanvasPixelArray(pixelData, function(index, red, green, blue, alpha) {
			delta = (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel);
			var newColors = { red:null, green:null, blue:null, alpha:null };
			if (changeRed) {
				newColors.red = red + delta;
			}
			if (changeGreen) {
				newColors.green = green + (grayScale ? delta : (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel));
			}
			if (changeBlue) {
				newColors.blue = blue + (grayScale ? delta : (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel));
			}
			if (changeAlpha) {
				newColors.alpha = alpha + (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel);
			}
			return newColors;
		});
		
		return pixelData;
	}
	
	/**
	 * Add noise to canvas.
	 * @param	context Canvas drawing context.
	 * @param	randomSeed Random seed to use to make random noise.
	 * @param	noiseLevel Value between 1 and 255
	 * @param	grayScale True to change all color channels by same amount so only brightness of pixel is changed and not color. Doesn't affect alpha. (Default = false)
	 * @param	red Add noise to red channel. (Default = true)
	 * @param	green Add noise to green channel. (Default = true)
	 * @param	blue Add noise to blue channel. (Default = true)
	 * @param	alpha Add noise to alpha channel. (Default = false)
	 */
	public static function addNoiseToCanvas( context : CanvasRenderingContext2D, randomSeed : Int, noiseLevel : Int, grayScale = false, red = true, green = true, blue = true, alpha = false) : Void {
		var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		imageData = addNoise(imageData, randomSeed, noiseLevel, grayScale, red, green, blue, alpha);
		context.putImageData(imageData, 0, 0);
	}	
	
	// ------------------------------------------------------------------------
	// Images
	
	/**
	 * Load an image from a URL.
	 * @param	url Image to load.
	 * @param	f Called when image is loaded.
	 */
	public static function loadImage( url : String, f : Image -> Void ) : Void {
		var image:Image = new Image();
		image.onload = function() {
			f(image);
		}
		image.src = url;
	}

	/**
	 * Load a file into an image.
	 */
	public static function loadFileIntoImage( file : File, img : Image ) : Void {
		var reader = new FileReader();
		reader.onload = function(event) {
			img.src = event.target.result;
		}
		reader.readAsDataURL(file);
	}

	/**
	 * Get image data from an HTML image.
	 */
	public static function getImageData( image : Image ) : ImageData {
		var canvas:Canvas = cast Browser.document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		return imageData;
	}
	
	/**
	 * Make image data URL from image data.
	 */
	public static function makeImageDataUrlFromImageData( imageData : ImageData ) : String {
		var canvas:Canvas = cast Browser.document.createElement("canvas");
		canvas.width = imageData.width.int();
		canvas.height = imageData.height.int();
		canvas.getContext("2d").putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	}
	
	// ------------------------------------------------------------------------
	// Monochrome Converters
	
	/**
	 * Converts HTML5 image data to monochrome image data by comparing the average of each color channel to a
	 * threshold value to determine which color channels are converted to target monochrome colors.
	 * @param	threshold Value between 0 and 255.
	 * @param	lessthanThresholdColor Color to use for pixels below threshold.
	 * @param	greaterthanOrEqualToThresholdColor Color to use for pixels equal to or above threshold.
	 * @param	alpha Optioal alpha to assign to result pixels. (default = 1.0)
	 */
	public static function makeAverageThresholdImageData( imageData : ImageData, threshold : Int, lessthanThresholdColor : Int, greaterthanOrEqualToThresholdColor : Int, alpha = 1.0) : ImageData {
		var intAlpha = HtmlColorCore.colorFraction(alpha);
		imageData.renderCanvasPixelArray(function(index, red, green, blue, alpha) {
			var color = [red, green, blue].averageInt() >= threshold ? greaterthanOrEqualToThresholdColor : lessthanThresholdColor;
			return {
					red : HtmlColorCore.getRedComponent(color),
					green : HtmlColorCore.getGreenComponent(color),
					blue : HtmlColorCore.getBlueComponent(color),
					alpha : intAlpha
			}
		});
		return imageData;
	}
	
	/**
	 * Convert image to monochrome bitmap boolean array.
	 * Converts HTML5 image data to a 2D Array of Bool by comparing the average of each color channel to a
	 * threshold value to determine which color channels are converted to 0 and 1.
	 * @param	threshold Value between 0 and 255.
	 */
	public static function makeAverageThresholdBitmap( imageData : ImageData, threshold : Int ) : Array<Array<Bool>> {
		threshold = threshold.clampInt(0, 255);
		return makeBitmap(imageData, function(red, green, blue, alpha) {
			return [red, green, blue].averageInt() >= threshold;
		});
	}
	
	/**
	 * Make a boolean array from html image data.
	 */
	public static function makeBitmap( imageData : ImageData, f : Int -> Int -> Int -> Int -> Bool ) : Array<Array<Bool>> {
		var array = new Array<Array<Bool>>();
		renderCanvasPixelArray(imageData, function(index, red, green, blue, alpha) {
			var indices = Array2dCore.getIndices(index, Std.int(imageData.width), CANVAS_ELEMENTS_PER_PIXEL);
			array.set(indices.x, indices.y, f(red, green, blue, alpha));
			return null;
		});
		return array;
	}
	
	/**
	 * Inverts an array of bool.
	 * @param	bitmap Array of bool to invert.
	 * @return	Inverted array of bool.
	 */
	public static function invertBitmap( bitmap : Array<Array<Bool>> ) : Array<Array<Bool>> {
		bitmap.foreachXY(function (x, y, value) {
			bitmap.set(x, y, !value);
		});
		return bitmap;
	}

}