(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
IMap.__name__ = true;
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var as3 = {}
as3.BitmapDataCore = function() { }
as3.BitmapDataCore.__name__ = true;
as3.BitmapDataCore.dispose = function(bd) {
}
as3.ConversionCore = function() { }
as3.ConversionCore.__name__ = true;
as3.ConversionCore.booleanFromInt = function(i) {
	return i == null?false:i > 0;
}
as3.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null?1.0:in_a;
	this.b = in_b == null?0.0:in_b;
	this.c = in_c == null?0.0:in_c;
	this.d = in_d == null?1.0:in_d;
	this.tx = in_tx == null?0.0:in_tx;
	this.ty = in_ty == null?0.0:in_ty;
};
as3.Matrix.__name__ = true;
as3.Matrix.prototype = {
	scale: function(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,translate: function(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else this.b = this.c = 0;
		this.tx = in_tx != null?in_tx + in_width / 2:in_width / 2;
		this.ty = in_ty != null?in_ty + in_height / 2:in_height / 2;
	}
	,__class__: as3.Matrix
}
as3.PointCore = function() { }
as3.PointCore.__name__ = true;
as3.PointCore.distanceFromOrigin = function(p) {
	return Math.sqrt(p.x * p.x + p.y * p.y);
}
as3.PointCore.distance = function(a,b) {
	return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));
}
as3.PointCore.interpolate = function(pt1,pt2,f) {
	return { x : (pt1.x - pt2.x) * f + pt2.x, y : (pt1.y - pt2.y) * f + pt2.y};
}
as3.PointCore.normalize = function(p,thickness) {
	if(p.x == 0 && p.y == 0) p.x = thickness; else {
		var norm = thickness / Math.sqrt(p.x * p.x + p.y * p.y);
		p.x *= norm;
		p.y *= norm;
	}
}
as3.PointCore.add = function(p1,p2) {
	return { x : p2.x + p1.x, y : p2.y + p1.y};
}
as3.PointCore.subtract = function(p0,p1) {
	return { x : p0.x - p1.x, y : p0.y - p1.y};
}
as3.PointCore.hash = function(p) {
	return p.x + "," + p.y;
}
as3.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
as3.Rectangle.__name__ = true;
as3.Rectangle.prototype = {
	__class__: as3.Rectangle
}
as3.RectangleCore = function() { }
as3.RectangleCore.__name__ = true;
as3.RectangleCore.left = function(r) {
	return r.x;
}
as3.RectangleCore.right = function(r) {
	return r.x + r.width;
}
as3.RectangleCore.top = function(r) {
	return r.y;
}
as3.RectangleCore.bottom = function(r) {
	return r.y + r.height;
}
as3.Vector3D = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
as3.Vector3D.__name__ = true;
as3.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
}
as3.Vector3D.prototype = {
	scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,normalize: function() {
		var l = Math.abs(as3.Vector3D.distance(this,new as3.Vector3D()));
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,crossProduct: function(a) {
		return new as3.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,add: function(a) {
		return new as3.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,__class__: as3.Vector3D
}
var co = {}
co.janicek = {}
co.janicek.core = {}
co.janicek.core.NullCore = function() { }
co.janicek.core.NullCore.__name__ = true;
co.janicek.core.NullCore.isNull = function(nullable) {
	return nullable == null;
}
co.janicek.core.NullCore.coalesce = function(nullable,defaultValue) {
	return nullable == null?defaultValue:nullable;
}
co.janicek.core.StringCore = function() { }
co.janicek.core.StringCore.__name__ = true;
co.janicek.core.StringCore.contains = function(string,pattern,ignoreCase) {
	if(ignoreCase == null) ignoreCase = false;
	if(ignoreCase) {
		string = string.toLowerCase();
		pattern = pattern.toLowerCase();
	}
	return string.indexOf(pattern) != -1;
}
co.janicek.core.StringCore.isInteger = function(s) {
	if(co.janicek.core.StringCore.contains(s,".")) return false;
	return Std.parseInt(s) != null;
}
co.janicek.core.array = {}
co.janicek.core.array.Array2dCore = function() { }
co.janicek.core.array.Array2dCore.__name__ = true;
co.janicek.core.array.Array2dCore.get = function(a,x,y) {
	if(a[y] == null) return null;
	return a[y][x];
}
co.janicek.core.array.Array2dCore.set = function(a,x,y,value) {
	if(a[y] == null) a[y] = new Array();
	a[y][x] = value;
	return a;
}
co.janicek.core.array.Array2dCore.getIndices = function(index,width,blockSize) {
	if(blockSize == null) blockSize = 1;
	return { x : (index / blockSize | 0) % width, y : index / blockSize / width | 0};
}
co.janicek.core.array.Array2dCore.foreachY = function(a,f) {
	var _g = 0;
	while(_g < a.length) {
		var y = a[_g];
		++_g;
		if(y != null) f(y);
	}
}
co.janicek.core.array.Array2dCore.foreachXY = function(a,f) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var yIndex = _g1++;
		if(a[yIndex] != null) {
			var _g3 = 0, _g2 = a[yIndex].length;
			while(_g3 < _g2) {
				var xIndex = _g3++;
				var value = a[yIndex][xIndex];
				if(value != null) f(xIndex,yIndex,value);
			}
		}
	}
}
co.janicek.core.array.Array2dCore.dimensions = function(array) {
	var height = array.length;
	var width = 0;
	co.janicek.core.array.Array2dCore.foreachY(array,function(y) {
		width = Math.max(width,y.length);
	});
	return { x : width, y : height};
}
co.janicek.core.html = {}
co.janicek.core.html.CanvasCore = function() { }
co.janicek.core.html.CanvasCore.__name__ = true;
co.janicek.core.html.CanvasCore.renderCanvasPixelArray = function(imageData,f) {
	var pixels = imageData.data;
	var index;
	var _g1 = 0, _g = pixels.length / 4 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		index = i * 4;
		var newValues = f(index,pixels[index],pixels[index + 1],pixels[index + 2],pixels[index + 3]);
		if(newValues != null) {
			if(newValues.red != null) pixels[index] = newValues.red;
			if(newValues.green != null) pixels[index + 1] = newValues.green;
			if(newValues.blue != null) pixels[index + 2] = newValues.blue;
			if(newValues.alpha != null) pixels[index + 3] = newValues.alpha;
		}
	}
}
co.janicek.core.html.CanvasCore.addNoise = function(pixelData,randomSeed,noiseLevel,grayScale,changeRed,changeGreen,changeBlue,changeAlpha) {
	if(changeAlpha == null) changeAlpha = false;
	if(changeBlue == null) changeBlue = true;
	if(changeGreen == null) changeGreen = true;
	if(changeRed == null) changeRed = true;
	if(grayScale == null) grayScale = false;
	noiseLevel = co.janicek.core.math.MathCore.clampInt(noiseLevel,1,255);
	var delta;
	co.janicek.core.html.CanvasCore.renderCanvasPixelArray(pixelData,function(index,red,green,blue,alpha) {
		delta = co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0 | 0,-noiseLevel,noiseLevel);
		var newColors = { red : null, green : null, blue : null, alpha : null};
		if(changeRed) newColors.red = red + delta;
		if(changeGreen) newColors.green = green + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0 | 0,-noiseLevel,noiseLevel));
		if(changeBlue) newColors.blue = blue + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0 | 0,-noiseLevel,noiseLevel));
		if(changeAlpha) newColors.alpha = alpha + co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0 | 0,-noiseLevel,noiseLevel);
		return newColors;
	});
	return pixelData;
}
co.janicek.core.html.CanvasCore.addNoiseToCanvas = function(context,randomSeed,noiseLevel,grayScale,red,green,blue,alpha) {
	if(alpha == null) alpha = false;
	if(blue == null) blue = true;
	if(green == null) green = true;
	if(red == null) red = true;
	if(grayScale == null) grayScale = false;
	var imageData = context.getImageData(0,0,context.canvas.width,context.canvas.height);
	imageData = co.janicek.core.html.CanvasCore.addNoise(imageData,randomSeed,noiseLevel,grayScale,red,green,blue,alpha);
	context.putImageData(imageData,0,0);
}
co.janicek.core.html.CanvasCore.loadFileIntoImage = function(file,img) {
	var reader = new FileReader();
	reader.onload = function(event) {
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
}
co.janicek.core.html.CanvasCore.getImageData = function(image) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image,0,0);
	var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	return imageData;
}
co.janicek.core.html.CanvasCore.makeImageDataUrlFromImageData = function(imageData) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = imageData.width | 0;
	canvas.height = imageData.height | 0;
	canvas.getContext("2d").putImageData(imageData,0,0);
	return canvas.toDataURL();
}
co.janicek.core.html.CanvasCore.makeAverageThresholdImageData = function(imageData,threshold,lessthanThresholdColor,greaterthanOrEqualToThresholdColor,alpha) {
	if(alpha == null) alpha = 1.0;
	var intAlpha = 255 * alpha | 0;
	co.janicek.core.html.CanvasCore.renderCanvasPixelArray(imageData,function(index,red,green,blue,alpha1) {
		var color = co.janicek.core.math.MathCore.averageInt([red,green,blue]) >= threshold?greaterthanOrEqualToThresholdColor:lessthanThresholdColor;
		return { red : color >> 16 & 255, green : color >> 8 & 255, blue : color & 255, alpha : intAlpha};
	});
	return imageData;
}
co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap = function(imageData,threshold) {
	threshold = co.janicek.core.math.MathCore.clampInt(threshold,0,255);
	return co.janicek.core.html.CanvasCore.makeBitmap(imageData,function(red,green,blue,alpha) {
		return co.janicek.core.math.MathCore.averageInt([red,green,blue]) >= threshold;
	});
}
co.janicek.core.html.CanvasCore.makeBitmap = function(imageData,f) {
	var array = new Array();
	co.janicek.core.html.CanvasCore.renderCanvasPixelArray(imageData,function(index,red,green,blue,alpha) {
		var indices = co.janicek.core.array.Array2dCore.getIndices(index,imageData.width | 0,4);
		co.janicek.core.array.Array2dCore.set(array,indices.x,indices.y,f(red,green,blue,alpha));
		return null;
	});
	return array;
}
co.janicek.core.html.CanvasCore.invertBitmap = function(bitmap) {
	co.janicek.core.array.Array2dCore.foreachXY(bitmap,function(x,y,value) {
		co.janicek.core.array.Array2dCore.set(bitmap,x,y,!value);
	});
	return bitmap;
}
co.janicek.core.html.HtmlColorCore = function() { }
co.janicek.core.html.HtmlColorCore.__name__ = true;
co.janicek.core.html.HtmlColorCore.interpolateColor = function(color0,color1,f) {
	var r = (1 - f) * (color0 >> 16) + f * (color1 >> 16) | 0;
	var g = (1 - f) * (color0 >> 8 & 255) + f * (color1 >> 8 & 255) | 0;
	var b = (1 - f) * (color0 & 255) + f * (color1 & 255) | 0;
	if(r > 255) r = 255;
	if(g > 255) g = 255;
	if(b > 255) b = 255;
	return r << 16 | g << 8 | b;
}
co.janicek.core.html.HtmlColorCore.intToHexColor = function(color) {
	return "#" + StringTools.hex(color,6);
}
co.janicek.core.html.HtmlColorCore.rgba = function(red,green,blue,alpha) {
	return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}
co.janicek.core.math = {}
co.janicek.core.math.HashCore = function() { }
co.janicek.core.math.HashCore.__name__ = true;
co.janicek.core.math.HashCore.djb2 = function(s) {
	var hash = 5381;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) + hash + HxOverrides.cca(s,i);
	}
	return hash;
}
co.janicek.core.math.MathCore = function() { }
co.janicek.core.math.MathCore.__name__ = true;
co.janicek.core.math.MathCore.clampInt = function(value,minOrMax1,minOrMax2) {
	return co.janicek.core.math.MathCore.clamp(value,minOrMax1,minOrMax2) | 0;
}
co.janicek.core.math.MathCore.clamp = function(value,minOrMax1,minOrMax2) {
	var min = Math.min(minOrMax1,minOrMax2);
	var max = Math.max(minOrMax1,minOrMax2);
	return value < min?min:value > max?max:value;
}
co.janicek.core.math.MathCore.averageInt = function(numbers) {
	return Lambda.fold(numbers,function(number,total) {
		return total + number;
	},0) / numbers.length;
}
co.janicek.core.math.PerlinNoise = function() { }
co.janicek.core.math.PerlinNoise.__name__ = true;
co.janicek.core.math.PerlinNoise.makePerlinNoise = function(width,height,_x,_y,_z,seed,octaves,falloff,_) {
	if(falloff == null) falloff = 0.5;
	if(octaves == null) octaves = 4;
	if(seed == null) seed = 666;
	var baseFactor = 0.015625;
	var iXoffset = seed = seed * 16807. % 2147483647 | 0;
	var iYoffset = seed = seed * 16807. % 2147483647 | 0;
	var iZoffset = seed = seed * 16807. % 2147483647 | 0;
	var aOctFreq = [];
	var aOctPers = [];
	var fPersMax = 0.0;
	var fFreq, fPers;
	var _g = 0;
	while(_g < octaves) {
		var i = _g++;
		fFreq = Math.pow(2,i);
		fPers = Math.pow(falloff,i);
		fPersMax += fPers;
		aOctFreq.push(fFreq);
		aOctPers.push(fPers);
	}
	fPersMax = 1 / fPersMax;
	var bitmap = new Array();
	var baseX = _x * baseFactor + iXoffset;
	_y = _y * baseFactor + iYoffset;
	_z = _z * baseFactor + iZoffset;
	var _g = 0;
	while(_g < height) {
		var py = _g++;
		_x = baseX;
		var _g1 = 0;
		while(_g1 < width) {
			var px = _g1++;
			var s = 0.;
			var _g2 = 0;
			while(_g2 < octaves) {
				var i = _g2++;
				var fFreq1 = aOctFreq[i];
				var fPers1 = aOctPers[i];
				var x = _x * fFreq1;
				var y = _y * fFreq1;
				var z = _z * fFreq1;
				var xf = x - x % 1;
				var yf = y - y % 1;
				var zf = z - z % 1;
				var X = (xf | 0) & 255;
				var Y = (yf | 0) & 255;
				var Z = (zf | 0) & 255;
				x -= xf;
				y -= yf;
				z -= zf;
				var u = x * x * x * (x * (x * 6 - 15) + 10);
				var v = y * y * y * (y * (y * 6 - 15) + 10);
				var w = z * z * z * (z * (z * 6 - 15) + 10);
				var A = co.janicek.core.math.PerlinNoise.p[X] + Y;
				var AA = co.janicek.core.math.PerlinNoise.p[A] + Z;
				var AB = co.janicek.core.math.PerlinNoise.p[A + 1] + Z;
				var B = co.janicek.core.math.PerlinNoise.p[X + 1] + Y;
				var BA = co.janicek.core.math.PerlinNoise.p[B] + Z;
				var BB = co.janicek.core.math.PerlinNoise.p[B + 1] + Z;
				var x1 = x - 1;
				var y1 = y - 1;
				var z1 = z - 1;
				var hash = co.janicek.core.math.PerlinNoise.p[BB + 1] & 15;
				var g1 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z1:hash < 4?-y1:hash == 14?-x1:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[AB + 1] & 15;
				var g2 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z1:hash < 4?-y1:hash == 14?-x:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[BA + 1] & 15;
				var g3 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z1:hash < 4?-y:hash == 14?-x1:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[AA + 1] & 15;
				var g4 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z1:hash < 4?-y:hash == 14?-x:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[BB] & 15;
				var g5 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z:hash < 4?-y1:hash == 14?-x1:-z);
				hash = co.janicek.core.math.PerlinNoise.p[AB] & 15;
				var g6 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z:hash < 4?-y1:hash == 14?-x:-z);
				hash = co.janicek.core.math.PerlinNoise.p[BA] & 15;
				var g7 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z:hash < 4?-y:hash == 14?-x1:-z);
				hash = co.janicek.core.math.PerlinNoise.p[AA] & 15;
				var g8 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z:hash < 4?-y:hash == 14?-x:-z);
				g2 += u * (g1 - g2);
				g4 += u * (g3 - g4);
				g6 += u * (g5 - g6);
				g8 += u * (g7 - g8);
				g4 += v * (g2 - g4);
				g8 += v * (g6 - g8);
				s += (g8 + w * (g4 - g8)) * fPers1;
			}
			var color = (s * fPersMax + 1) * 128 | 0;
			co.janicek.core.array.Array2dCore.set(bitmap,px,py,-16777216 | color << 16 | color << 8 | color);
			_x += baseFactor;
		}
		_y += baseFactor;
	}
	return bitmap;
}
co.janicek.core.math.RandomCore = function() { }
co.janicek.core.math.RandomCore.__name__ = true;
co.janicek.core.math.RandomCore.makeRandomSeed = function() {
	return Math.floor(Math.random() * 2147483647.0);
}
co.janicek.core.math.RandomCore.toIntRange = function(seed,min,max) {
	return Math.round(min - 0.4999 + (max + 0.4999 - (min - 0.4999)) * (seed / 2147483647.0));
}
co.janicek.core.math.RandomCore.stringToSeed = function(s) {
	return co.janicek.core.math.HashCore.djb2(s) % 2147483647.0 | 0;
}
var com = {}
com.nodename = {}
com.nodename.delaunay = {}
com.nodename.delaunay.BoundsCheck = function() { }
com.nodename.delaunay.BoundsCheck.__name__ = true;
com.nodename.delaunay.BoundsCheck.check = function(point,bounds) {
	var value = 0;
	if(point.x == as3.RectangleCore.left(bounds)) value |= 4;
	if(point.x == as3.RectangleCore.right(bounds)) value |= 8;
	if(point.y == as3.RectangleCore.top(bounds)) value |= 1;
	if(point.y == as3.RectangleCore.bottom(bounds)) value |= 2;
	return value;
}
com.nodename.delaunay.Edge = function() {
	this._edgeIndex = com.nodename.delaunay.Edge._nedges++;
	this.init();
};
com.nodename.delaunay.Edge.__name__ = true;
com.nodename.delaunay.Edge.createBisectingEdge = function(site0,site1) {
	var dx, dy, absdx, absdy;
	var a, b, c;
	dx = site1._coord.x - site0._coord.x;
	dy = site1._coord.y - site0._coord.y;
	absdx = dx > 0?dx:-dx;
	absdy = dy > 0?dy:-dy;
	c = site0._coord.x * dx + site0._coord.y * dy + (dx * dx + dy * dy) * 0.5;
	if(absdx > absdy) {
		a = 1.0;
		b = dy / dx;
		c /= dx;
	} else {
		b = 1.0;
		a = dx / dy;
		c /= dy;
	}
	var edge = com.nodename.delaunay.Edge.create();
	edge.leftSite = site0;
	edge.rightSite = site1;
	site0.addEdge(edge);
	site1.addEdge(edge);
	edge.leftVertex = null;
	edge.rightVertex = null;
	edge.a = a;
	edge.b = b;
	edge.c = c;
	return edge;
}
com.nodename.delaunay.Edge.create = function() {
	var edge;
	if(com.nodename.delaunay.Edge._pool.length > 0) {
		edge = com.nodename.delaunay.Edge._pool.pop();
		edge.init();
	} else edge = new com.nodename.delaunay.Edge();
	return edge;
}
com.nodename.delaunay.Edge.prototype = {
	clipVertices: function(bounds) {
		var xmin = bounds.x;
		var ymin = bounds.y;
		var xmax = as3.RectangleCore.right(bounds);
		var ymax = as3.RectangleCore.bottom(bounds);
		var vertex0, vertex1;
		var x0, x1, y0, y1;
		if(this.a == 1.0 && this.b >= 0.0) {
			vertex0 = this.rightVertex;
			vertex1 = this.leftVertex;
		} else {
			vertex0 = this.leftVertex;
			vertex1 = this.rightVertex;
		}
		if(this.a == 1.0) {
			y0 = ymin;
			if(vertex0 != null && vertex0._coord.y > ymin) y0 = vertex0._coord.y;
			if(y0 > ymax) return;
			x0 = this.c - this.b * y0;
			y1 = ymax;
			if(vertex1 != null && vertex1._coord.y < ymax) y1 = vertex1._coord.y;
			if(y1 < ymin) return;
			x1 = this.c - this.b * y1;
			if(x0 > xmax && x1 > xmax || x0 < xmin && x1 < xmin) return;
			if(x0 > xmax) {
				x0 = xmax;
				y0 = (this.c - x0) / this.b;
			} else if(x0 < xmin) {
				x0 = xmin;
				y0 = (this.c - x0) / this.b;
			}
			if(x1 > xmax) {
				x1 = xmax;
				y1 = (this.c - x1) / this.b;
			} else if(x1 < xmin) {
				x1 = xmin;
				y1 = (this.c - x1) / this.b;
			}
		} else {
			x0 = xmin;
			if(vertex0 != null && vertex0._coord.x > xmin) x0 = vertex0._coord.x;
			if(x0 > xmax) return;
			y0 = this.c - this.a * x0;
			x1 = xmax;
			if(vertex1 != null && vertex1._coord.x < xmax) x1 = vertex1._coord.x;
			if(x1 < xmin) return;
			y1 = this.c - this.a * x1;
			if(y0 > ymax && y1 > ymax || y0 < ymin && y1 < ymin) return;
			if(y0 > ymax) {
				y0 = ymax;
				x0 = (this.c - y0) / this.a;
			} else if(y0 < ymin) {
				y0 = ymin;
				x0 = (this.c - y0) / this.a;
			}
			if(y1 > ymax) {
				y1 = ymax;
				x1 = (this.c - y1) / this.a;
			} else if(y1 < ymin) {
				y1 = ymin;
				x1 = (this.c - y1) / this.a;
			}
		}
		this.clippedEnds = new haxe.ds.StringMap();
		if(vertex0 == this.leftVertex) {
			this.clippedEnds.set(com.nodename.delaunay.LR.LEFT.toString(),{ x : x0, y : y0});
			this.clippedEnds.set(com.nodename.delaunay.LR.RIGHT.toString(),{ x : x1, y : y1});
		} else {
			this.clippedEnds.set(com.nodename.delaunay.LR.RIGHT.toString(),{ x : x0, y : y0});
			this.clippedEnds.set(com.nodename.delaunay.LR.LEFT.toString(),{ x : x1, y : y1});
		}
	}
	,init: function() {
		this.leftSite = null;
		this.rightSite = null;
	}
	,dispose: function() {
		if(this._delaunayLineBmp != null) {
			as3.BitmapDataCore.dispose(this._delaunayLineBmp);
			this._delaunayLineBmp = null;
		}
		this.leftVertex = null;
		this.rightVertex = null;
		if(this.clippedEnds != null) {
			this.clippedEnds.set(com.nodename.delaunay.LR.LEFT.toString(),null);
			this.clippedEnds.set(com.nodename.delaunay.LR.RIGHT.toString(),null);
			this.clippedEnds = null;
		}
		this.leftSite = null;
		this.rightSite = null;
		com.nodename.delaunay.Edge._pool.push(this);
	}
	,site: function(leftRight) {
		return leftRight == com.nodename.delaunay.LR.LEFT?this.leftSite:this.rightSite;
	}
	,setVertex: function(leftRight,v) {
		if(leftRight == com.nodename.delaunay.LR.LEFT) this.leftVertex = v; else this.rightVertex = v;
	}
	,voronoiEdge: function() {
		if(!(this.clippedEnds != null)) return new com.nodename.geom.LineSegment(null,null);
		return new com.nodename.geom.LineSegment(this.clippedEnds.get(com.nodename.delaunay.LR.LEFT.toString()),this.clippedEnds.get(com.nodename.delaunay.LR.RIGHT.toString()));
	}
	,delaunayLine: function() {
		return new com.nodename.geom.LineSegment(this.leftSite._coord,this.rightSite._coord);
	}
	,__class__: com.nodename.delaunay.Edge
}
com.nodename.utils = {}
com.nodename.utils.IDisposable = function() { }
com.nodename.utils.IDisposable.__name__ = true;
com.nodename.delaunay.EdgeList = function(xmin,deltax,sqrt_nsites) {
	this._xmin = xmin;
	this._deltax = deltax;
	this._hashsize = 2 * sqrt_nsites;
	this._hash = new Array();
	this._leftEnd = com.nodename.delaunay.Halfedge.createDummy();
	this._rightEnd = com.nodename.delaunay.Halfedge.createDummy();
	this._leftEnd.edgeListLeftNeighbor = null;
	this._leftEnd.edgeListRightNeighbor = this._rightEnd;
	this._rightEnd.edgeListLeftNeighbor = this._leftEnd;
	this._rightEnd.edgeListRightNeighbor = null;
	this._hash[0] = this._leftEnd;
	this._hash[this._hashsize - 1] = this._rightEnd;
};
com.nodename.delaunay.EdgeList.__name__ = true;
com.nodename.delaunay.EdgeList.__interfaces__ = [com.nodename.utils.IDisposable];
com.nodename.delaunay.EdgeList.prototype = {
	getHash: function(b) {
		var halfEdge;
		if(b < 0 || b >= this._hashsize) return null;
		halfEdge = this._hash[b];
		if(halfEdge != null && halfEdge.edge == com.nodename.delaunay.Edge.DELETED) {
			this._hash[b] = null;
			return null;
		} else return halfEdge;
	}
	,edgeListLeftNeighbor: function(p) {
		var i, bucket;
		var halfEdge;
		bucket = (p.x - this._xmin) / this._deltax * this._hashsize | 0;
		if(bucket < 0) bucket = 0;
		if(bucket >= this._hashsize) bucket = this._hashsize - 1;
		halfEdge = this.getHash(bucket);
		if(halfEdge == null) {
			var i1 = 1;
			while(true) {
				if((halfEdge = this.getHash(bucket - i1)) != null) break;
				if((halfEdge = this.getHash(bucket + i1)) != null) break;
				i1++;
			}
		}
		if(halfEdge == this._leftEnd || halfEdge != this._rightEnd && halfEdge.isLeftOf(p)) {
			do halfEdge = halfEdge.edgeListRightNeighbor; while(halfEdge != this._rightEnd && halfEdge.isLeftOf(p));
			halfEdge = halfEdge.edgeListLeftNeighbor;
		} else do halfEdge = halfEdge.edgeListLeftNeighbor; while(halfEdge != this._leftEnd && !halfEdge.isLeftOf(p));
		if(bucket > 0 && bucket < this._hashsize - 1) this._hash[bucket] = halfEdge;
		return halfEdge;
	}
	,remove: function(halfEdge) {
		halfEdge.edgeListLeftNeighbor.edgeListRightNeighbor = halfEdge.edgeListRightNeighbor;
		halfEdge.edgeListRightNeighbor.edgeListLeftNeighbor = halfEdge.edgeListLeftNeighbor;
		halfEdge.edge = com.nodename.delaunay.Edge.DELETED;
		halfEdge.edgeListLeftNeighbor = halfEdge.edgeListRightNeighbor = null;
	}
	,insert: function(lb,newHalfedge) {
		newHalfedge.edgeListLeftNeighbor = lb;
		newHalfedge.edgeListRightNeighbor = lb.edgeListRightNeighbor;
		lb.edgeListRightNeighbor.edgeListLeftNeighbor = newHalfedge;
		lb.edgeListRightNeighbor = newHalfedge;
	}
	,dispose: function() {
		var halfEdge = this._leftEnd;
		var prevHe;
		while(halfEdge != this._rightEnd) {
			prevHe = halfEdge;
			halfEdge = halfEdge.edgeListRightNeighbor;
			prevHe.dispose();
		}
		this._leftEnd = null;
		this._rightEnd.dispose();
		this._rightEnd = null;
		var i;
		var _g1 = 0, _g = this._hashsize;
		while(_g1 < _g) {
			var i1 = _g1++;
			this._hash[i1] = null;
		}
		this._hash = null;
	}
	,__class__: com.nodename.delaunay.EdgeList
}
com.nodename.delaunay.Criterion = { __ename__ : true, __constructs__ : ["vertex","site"] }
com.nodename.delaunay.Criterion.vertex = ["vertex",0];
com.nodename.delaunay.Criterion.vertex.toString = $estr;
com.nodename.delaunay.Criterion.vertex.__enum__ = com.nodename.delaunay.Criterion;
com.nodename.delaunay.Criterion.site = ["site",1];
com.nodename.delaunay.Criterion.site.toString = $estr;
com.nodename.delaunay.Criterion.site.__enum__ = com.nodename.delaunay.Criterion;
com.nodename.delaunay.EdgeReorderer = function(origEdges,criterion) {
	if(criterion != com.nodename.delaunay.Criterion.vertex && criterion != com.nodename.delaunay.Criterion.site) throw "Edges: criterion must be Vertex or Site";
	this.edges = new Array();
	this.edgeOrientations = new Array();
	if(origEdges.length > 0) this.edges = this.reorderEdges(origEdges,criterion);
};
com.nodename.delaunay.EdgeReorderer.__name__ = true;
com.nodename.delaunay.EdgeReorderer.prototype = {
	reorderEdges: function(origEdges,criterion) {
		var i;
		var j;
		var n = origEdges.length;
		var edge;
		var done = new Array();
		var nDone = 0;
		var _g = 0;
		while(_g < done.length) {
			var b = done[_g];
			++_g;
			b = false;
		}
		var newEdges = new Array();
		i = 0;
		edge = origEdges[i];
		newEdges.push(edge);
		this.edgeOrientations.push(com.nodename.delaunay.LR.LEFT);
		var firstPoint;
		var lastPoint;
		if(criterion == com.nodename.delaunay.Criterion.vertex) {
			firstPoint = edge.leftVertex;
			lastPoint = edge.rightVertex;
		} else {
			firstPoint = edge.leftSite;
			lastPoint = edge.rightSite;
		}
		if(firstPoint == com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY || lastPoint == com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY) return new Array();
		done[i] = true;
		++nDone;
		while(nDone < n) {
			var _g = 1;
			while(_g < n) {
				var i1 = _g++;
				if(done[i1]) continue;
				edge = origEdges[i1];
				var leftPoint;
				var rightPoint;
				if(criterion == com.nodename.delaunay.Criterion.vertex) {
					leftPoint = edge.leftVertex;
					rightPoint = edge.rightVertex;
				} else {
					leftPoint = edge.leftSite;
					rightPoint = edge.rightSite;
				}
				if(leftPoint == com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY || rightPoint == com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY) return new Array();
				if(leftPoint == lastPoint) {
					lastPoint = rightPoint;
					this.edgeOrientations.push(com.nodename.delaunay.LR.LEFT);
					newEdges.push(edge);
					done[i1] = true;
				} else if(rightPoint == firstPoint) {
					firstPoint = leftPoint;
					this.edgeOrientations.unshift(com.nodename.delaunay.LR.LEFT);
					newEdges.unshift(edge);
					done[i1] = true;
				} else if(leftPoint == firstPoint) {
					firstPoint = rightPoint;
					this.edgeOrientations.unshift(com.nodename.delaunay.LR.RIGHT);
					newEdges.unshift(edge);
					done[i1] = true;
				} else if(rightPoint == lastPoint) {
					lastPoint = leftPoint;
					this.edgeOrientations.push(com.nodename.delaunay.LR.RIGHT);
					newEdges.push(edge);
					done[i1] = true;
				}
				if(done[i1]) ++nDone;
			}
		}
		return newEdges;
	}
	,dispose: function() {
		this.edges = null;
		this.edgeOrientations = null;
	}
	,__class__: com.nodename.delaunay.EdgeReorderer
}
com.nodename.delaunay.Halfedge = function(edge,lr) {
	this.init(edge,lr);
};
com.nodename.delaunay.Halfedge.__name__ = true;
com.nodename.delaunay.Halfedge.create = function(edge,lr) {
	if(com.nodename.delaunay.Halfedge._pool.length > 0) return com.nodename.delaunay.Halfedge._pool.pop().init(edge,lr); else return new com.nodename.delaunay.Halfedge(edge,lr);
}
com.nodename.delaunay.Halfedge.createDummy = function() {
	return com.nodename.delaunay.Halfedge.create(null,null);
}
com.nodename.delaunay.Halfedge.prototype = {
	isLeftOf: function(p) {
		var topSite;
		var rightOfSite, above, fast;
		var dxp, dyp, dxs, t1, t2, t3, yl;
		topSite = this.edge.rightSite;
		rightOfSite = p.x > topSite._coord.x;
		if(rightOfSite && this.leftRight == com.nodename.delaunay.LR.LEFT) return true;
		if(!rightOfSite && this.leftRight == com.nodename.delaunay.LR.RIGHT) return false;
		if(this.edge.a == 1.0) {
			dyp = p.y - topSite._coord.y;
			dxp = p.x - topSite._coord.x;
			fast = false;
			if(!rightOfSite && this.edge.b < 0.0 || rightOfSite && this.edge.b >= 0.0) {
				above = dyp >= this.edge.b * dxp;
				fast = above;
			} else {
				above = p.x + p.y * this.edge.b > this.edge.c;
				if(this.edge.b < 0.0) above = !above;
				if(!above) fast = true;
			}
			if(!fast) {
				dxs = topSite._coord.x - this.edge.leftSite._coord.x;
				above = this.edge.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1.0 + 2.0 * dxp / dxs + this.edge.b * this.edge.b);
				if(this.edge.b < 0.0) above = !above;
			}
		} else {
			yl = this.edge.c - this.edge.a * p.x;
			t1 = p.y - yl;
			t2 = p.x - topSite._coord.x;
			t3 = yl - topSite._coord.y;
			above = t1 * t1 > t2 * t2 + t3 * t3;
		}
		return this.leftRight == com.nodename.delaunay.LR.LEFT?above:!above;
	}
	,reallyDispose: function() {
		this.edgeListLeftNeighbor = null;
		this.edgeListRightNeighbor = null;
		this.nextInPriorityQueue = null;
		this.edge = null;
		this.leftRight = null;
		this.vertex = null;
		com.nodename.delaunay.Halfedge._pool.push(this);
	}
	,dispose: function() {
		if(this.edgeListLeftNeighbor != null || this.edgeListRightNeighbor != null) return;
		if(this.nextInPriorityQueue != null) return;
		this.edge = null;
		this.leftRight = null;
		this.vertex = null;
		com.nodename.delaunay.Halfedge._pool.push(this);
	}
	,init: function(edge,lr) {
		this.edge = edge;
		this.leftRight = lr;
		this.nextInPriorityQueue = null;
		this.vertex = null;
		return this;
	}
	,__class__: com.nodename.delaunay.Halfedge
}
com.nodename.delaunay.HalfedgePriorityQueue = function(ymin,deltay,sqrt_nsites) {
	this._ymin = ymin;
	this._deltay = deltay;
	this._hashsize = 4 * sqrt_nsites;
	this.initialize();
};
com.nodename.delaunay.HalfedgePriorityQueue.__name__ = true;
com.nodename.delaunay.HalfedgePriorityQueue.prototype = {
	extractMin: function() {
		var answer;
		answer = this._hash[this._minBucket].nextInPriorityQueue;
		this._hash[this._minBucket].nextInPriorityQueue = answer.nextInPriorityQueue;
		this._count--;
		answer.nextInPriorityQueue = null;
		return answer;
	}
	,min: function() {
		this.adjustMinBucket();
		var answer = this._hash[this._minBucket].nextInPriorityQueue;
		return { x : answer.vertex._coord.x, y : answer.ystar};
	}
	,empty: function() {
		return this._count == 0;
	}
	,adjustMinBucket: function() {
		while(this._minBucket < this._hashsize - 1 && this.isEmpty(this._minBucket)) ++this._minBucket;
	}
	,isEmpty: function(bucket) {
		return this._hash[bucket].nextInPriorityQueue == null;
	}
	,bucket: function(halfEdge) {
		var theBucket = (halfEdge.ystar - this._ymin) / this._deltay * this._hashsize | 0;
		if(theBucket < 0) theBucket = 0;
		if(theBucket >= this._hashsize) theBucket = this._hashsize - 1;
		return theBucket;
	}
	,remove: function(halfEdge) {
		var previous;
		var removalBucket = this.bucket(halfEdge);
		if(halfEdge.vertex != null) {
			previous = this._hash[removalBucket];
			while(previous.nextInPriorityQueue != halfEdge) previous = previous.nextInPriorityQueue;
			previous.nextInPriorityQueue = halfEdge.nextInPriorityQueue;
			this._count--;
			halfEdge.vertex = null;
			halfEdge.nextInPriorityQueue = null;
			halfEdge.dispose();
		}
	}
	,insert: function(halfEdge) {
		var previous, next;
		var insertionBucket = this.bucket(halfEdge);
		if(insertionBucket < this._minBucket) this._minBucket = insertionBucket;
		previous = this._hash[insertionBucket];
		while((next = previous.nextInPriorityQueue) != null && (halfEdge.ystar > next.ystar || halfEdge.ystar == next.ystar && halfEdge.vertex._coord.x > next.vertex._coord.x)) previous = next;
		halfEdge.nextInPriorityQueue = previous.nextInPriorityQueue;
		previous.nextInPriorityQueue = halfEdge;
		++this._count;
	}
	,initialize: function() {
		var i;
		this._count = 0;
		this._minBucket = 0;
		this._hash = new Array();
		var _g1 = 0, _g = this._hashsize;
		while(_g1 < _g) {
			var i1 = _g1++;
			this._hash[i1] = com.nodename.delaunay.Halfedge.createDummy();
			this._hash[i1].nextInPriorityQueue = null;
		}
	}
	,dispose: function() {
		var _g1 = 0, _g = this._hashsize;
		while(_g1 < _g) {
			var i = _g1++;
			this._hash[i].dispose();
			this._hash[i] = null;
		}
		this._hash = null;
	}
	,__class__: com.nodename.delaunay.HalfedgePriorityQueue
}
com.nodename.delaunay.ICoord = function() { }
com.nodename.delaunay.ICoord.__name__ = true;
com.nodename.delaunay.ICoord.prototype = {
	__class__: com.nodename.delaunay.ICoord
}
com.nodename.delaunay.LR = function(name) {
	this._name = name;
};
com.nodename.delaunay.LR.__name__ = true;
com.nodename.delaunay.LR.other = function(leftRight) {
	return leftRight == com.nodename.delaunay.LR.LEFT?com.nodename.delaunay.LR.RIGHT:com.nodename.delaunay.LR.LEFT;
}
com.nodename.delaunay.LR.prototype = {
	toString: function() {
		return this._name;
	}
	,__class__: com.nodename.delaunay.LR
}
com.nodename.delaunay.Site = function(p,index,weight,color) {
	this.init(p,index,weight,color);
};
com.nodename.delaunay.Site.__name__ = true;
com.nodename.delaunay.Site.__interfaces__ = [com.nodename.delaunay.ICoord];
com.nodename.delaunay.Site.create = function(p,index,weight,color) {
	if(com.nodename.delaunay.Site._pool.length > 0) return com.nodename.delaunay.Site._pool.pop().init(p,index,weight,color); else return new com.nodename.delaunay.Site(p,index,weight,color);
}
com.nodename.delaunay.Site.sortSites = function(sites) {
	sites.sort(com.nodename.delaunay.Voronoi.compareSiteByYThenX);
	var _g1 = 0, _g = sites.length;
	while(_g1 < _g) {
		var i = _g1++;
		sites[i]._siteIndex = i;
	}
}
com.nodename.delaunay.Site.closeEnough = function(p0,p1) {
	return as3.PointCore.distance(p0,p1) < .005;
}
com.nodename.delaunay.Site.prototype = {
	dist: function(p) {
		return as3.PointCore.distance(p.get_coord(),this._coord);
	}
	,connect: function(points,j,bounds,closingUp) {
		if(closingUp == null) closingUp = false;
		var rightPoint = points[points.length - 1];
		var newEdge = this._edges[j];
		var newOrientation = this._edgeOrientations[j];
		var newPoint = newEdge.clippedEnds.get(newOrientation.toString());
		if(!com.nodename.delaunay.Site.closeEnough(rightPoint,newPoint)) {
			if(rightPoint.x != newPoint.x && rightPoint.y != newPoint.y) {
				var rightCheck = com.nodename.delaunay.BoundsCheck.check(rightPoint,bounds);
				var newCheck = com.nodename.delaunay.BoundsCheck.check(newPoint,bounds);
				var px, py;
				if((rightCheck & 8) != 0) {
					px = as3.RectangleCore.right(bounds);
					if((newCheck & 2) != 0) {
						py = as3.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						py = as3.RectangleCore.top(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						if(rightPoint.y - bounds.y + newPoint.y - bounds.y < bounds.height) py = as3.RectangleCore.top(bounds); else py = as3.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
						points.push({ x : as3.RectangleCore.left(bounds), y : py});
					}
				} else if((rightCheck & 4) != 0) {
					px = as3.RectangleCore.left(bounds);
					if((newCheck & 2) != 0) {
						py = as3.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						py = as3.RectangleCore.top(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 8) != 0) {
						if(rightPoint.y - bounds.y + newPoint.y - bounds.y < bounds.height) py = as3.RectangleCore.top(bounds); else py = as3.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
						points.push({ x : as3.RectangleCore.right(bounds), y : py});
					}
				} else if((rightCheck & 1) != 0) {
					py = as3.RectangleCore.top(bounds);
					if((newCheck & 8) != 0) {
						px = as3.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						px = as3.RectangleCore.left(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 2) != 0) {
						if(rightPoint.x - bounds.x + newPoint.x - bounds.x < bounds.width) px = as3.RectangleCore.left(bounds); else px = as3.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
						points.push({ x : px, y : as3.RectangleCore.bottom(bounds)});
					}
				} else if((rightCheck & 2) != 0) {
					py = as3.RectangleCore.bottom(bounds);
					if((newCheck & 8) != 0) {
						px = as3.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						px = as3.RectangleCore.left(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						if(rightPoint.x - bounds.x + newPoint.x - bounds.x < bounds.width) px = as3.RectangleCore.left(bounds); else px = as3.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
						points.push({ x : px, y : as3.RectangleCore.top(bounds)});
					}
				}
			}
			if(closingUp) return;
			points.push(newPoint);
		}
		var newRightPoint = newEdge.clippedEnds.get(com.nodename.delaunay.LR.other(newOrientation).toString());
		if(!com.nodename.delaunay.Site.closeEnough(points[0],newRightPoint)) points.push(newRightPoint);
	}
	,clipToBounds: function(bounds) {
		var points = new Array();
		var n = this._edges.length;
		var i = 0;
		var edge;
		while(i < n && this._edges[i].clippedEnds != null == false) ++i;
		if(i == n) return new Array();
		edge = this._edges[i];
		var orientation = this._edgeOrientations[i];
		points.push(edge.clippedEnds.get(orientation.toString()));
		points.push(edge.clippedEnds.get(com.nodename.delaunay.LR.other(orientation).toString()));
		var _g = i + 1;
		while(_g < n) {
			var j = _g++;
			edge = this._edges[j];
			if(edge.clippedEnds != null == false) continue;
			this.connect(points,j,bounds);
		}
		this.connect(points,i,bounds,true);
		return points;
	}
	,reorderEdges: function() {
		var reorderer = new com.nodename.delaunay.EdgeReorderer(this._edges,com.nodename.delaunay.Criterion.vertex);
		this._edges = reorderer.edges;
		this._edgeOrientations = reorderer.edgeOrientations;
		reorderer.dispose();
	}
	,region: function(clippingBounds) {
		if(this._edges == null || this._edges.length == 0) return new Array();
		if(this._edgeOrientations == null) {
			this.reorderEdges();
			this._region = this.clipToBounds(clippingBounds);
			if(new com.nodename.geom.Polygon(this._region).winding() == com.nodename.geom.Winding.CLOCKWISE) this._region.reverse();
		}
		return this._region;
	}
	,addEdge: function(edge) {
		this._edges.push(edge);
	}
	,clear: function() {
		if(this._edges != null) this._edges = null;
		if(this._edgeOrientations != null) this._edgeOrientations = null;
		if(this._region != null) this._region = null;
	}
	,dispose: function() {
		this._coord = null;
		this.clear();
		com.nodename.delaunay.Site._pool.push(this);
	}
	,init: function(p,index,weight,color) {
		this._coord = p;
		this._siteIndex = index;
		this.weight = weight;
		this.color = color;
		this._edges = new Array();
		this._region = null;
		return this;
	}
	,get_coord: function() {
		return this._coord;
	}
	,__class__: com.nodename.delaunay.Site
}
com.nodename.delaunay.SiteList = function() {
	this._sites = new Array();
	this._sorted = false;
};
com.nodename.delaunay.SiteList.__name__ = true;
com.nodename.delaunay.SiteList.__interfaces__ = [com.nodename.utils.IDisposable];
com.nodename.delaunay.SiteList.prototype = {
	getSitesBounds: function() {
		if(this._sorted == false) {
			com.nodename.delaunay.Site.sortSites(this._sites);
			this._currentIndex = 0;
			this._sorted = true;
		}
		var xmin, xmax, ymin, ymax;
		if(this._sites.length == 0) return new as3.Rectangle(0,0,0,0);
		xmin = Math.POSITIVE_INFINITY;
		xmax = Math.NEGATIVE_INFINITY;
		var _g = 0, _g1 = this._sites;
		while(_g < _g1.length) {
			var site = _g1[_g];
			++_g;
			if(site._coord.x < xmin) xmin = site._coord.x;
			if(site._coord.x > xmax) xmax = site._coord.x;
		}
		ymin = this._sites[0]._coord.y;
		ymax = this._sites[this._sites.length - 1]._coord.y;
		return new as3.Rectangle(xmin,ymin,xmax - xmin,ymax - ymin);
	}
	,next: function() {
		if(this._sorted == false) throw "SiteList::next():  sites have not been sorted";
		if(this._currentIndex < this._sites.length) return this._sites[this._currentIndex++]; else return null;
	}
	,push: function(site) {
		this._sorted = false;
		return this._sites.push(site);
	}
	,dispose: function() {
		if(this._sites != null) {
			var _g = 0, _g1 = this._sites;
			while(_g < _g1.length) {
				var site = _g1[_g];
				++_g;
				site.dispose();
			}
			this._sites = null;
		}
	}
	,__class__: com.nodename.delaunay.SiteList
}
com.nodename.delaunay.Triangle = function() { }
com.nodename.delaunay.Triangle.__name__ = true;
com.nodename.delaunay.Triangle.prototype = {
	dispose: function() {
		this._sites = null;
	}
	,__class__: com.nodename.delaunay.Triangle
}
com.nodename.delaunay.Vertex = function(x,y) {
	this.init(x,y);
};
com.nodename.delaunay.Vertex.__name__ = true;
com.nodename.delaunay.Vertex.__interfaces__ = [com.nodename.delaunay.ICoord];
com.nodename.delaunay.Vertex.create = function(x,y) {
	if(Math.isNaN(x) || Math.isNaN(y)) return com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY;
	if(com.nodename.delaunay.Vertex._pool.length > 0) return com.nodename.delaunay.Vertex._pool.pop().init(x,y); else return new com.nodename.delaunay.Vertex(x,y);
}
com.nodename.delaunay.Vertex.intersect = function(halfedge0,halfedge1) {
	var edge0, edge1, edge;
	var halfedge;
	var determinant, intersectionX, intersectionY;
	var rightOfSite;
	edge0 = halfedge0.edge;
	edge1 = halfedge1.edge;
	if(edge0 == null || edge1 == null) return null;
	if(edge0.rightSite == edge1.rightSite) return null;
	determinant = edge0.a * edge1.b - edge0.b * edge1.a;
	if(-1e-010 < determinant && determinant < 1.0e-10) return null;
	intersectionX = (edge0.c * edge1.b - edge1.c * edge0.b) / determinant;
	intersectionY = (edge1.c * edge0.a - edge0.c * edge1.a) / determinant;
	if(com.nodename.delaunay.Voronoi.compareSiteByYThenX(edge0.rightSite,edge1.rightSite) < 0) {
		halfedge = halfedge0;
		edge = edge0;
	} else {
		halfedge = halfedge1;
		edge = edge1;
	}
	rightOfSite = intersectionX >= edge.rightSite._coord.x;
	if(rightOfSite && halfedge.leftRight == com.nodename.delaunay.LR.LEFT || !rightOfSite && halfedge.leftRight == com.nodename.delaunay.LR.RIGHT) return null;
	return com.nodename.delaunay.Vertex.create(intersectionX,intersectionY);
}
com.nodename.delaunay.Vertex.prototype = {
	setIndex: function() {
		this.vertexIndex = com.nodename.delaunay.Vertex._nvertices++;
	}
	,dispose: function() {
		this._coord = null;
		com.nodename.delaunay.Vertex._pool.push(this);
	}
	,init: function(x,y) {
		this._coord = { x : x, y : y};
		return this;
	}
	,get_coord: function() {
		return this._coord;
	}
	,__class__: com.nodename.delaunay.Vertex
}
com.nodename.delaunay.Voronoi = function(points,colors,plotBounds) {
	this.makeSureNoDuplicatePoints(points);
	(this._prng = new de.polygonal.math.PM_PRNG()).seed = 1;
	this._sites = new com.nodename.delaunay.SiteList();
	this._sitesIndexedByLocation = new haxe.ds.StringMap();
	this.addSites(points,colors);
	this.plotBounds = plotBounds;
	this._triangles = new Array();
	this._edges = new Array();
	this.fortunesAlgorithm();
};
com.nodename.delaunay.Voronoi.__name__ = true;
com.nodename.delaunay.Voronoi.comparePointByYThenX = function(s1,s2) {
	return com.nodename.delaunay.Voronoi.compareByYThenX(s1._coord.x,s1._coord.y,s2.x,s2.y);
}
com.nodename.delaunay.Voronoi.compareSiteByYThenX = function(s1,s2) {
	return com.nodename.delaunay.Voronoi.compareByYThenX(s1._coord.x,s1._coord.y,s2._coord.x,s2._coord.y);
}
com.nodename.delaunay.Voronoi.compareByYThenX = function(s1x,s1y,s2x,s2y) {
	if(s1y < s2y) return -1;
	if(s1y > s2y) return 1;
	if(s1x < s2x) return -1;
	if(s1x > s2x) return 1;
	return 0;
}
com.nodename.delaunay.Voronoi.prototype = {
	fortunesAlgorithm: function() {
		var newSite, bottomSite, topSite, tempSite;
		var v, vertex;
		var newintstar;
		var leftRight;
		var lbnd, rbnd, llbnd, rrbnd, bisector;
		var edge;
		var dataBounds = this._sites.getSitesBounds();
		var sqrt_nsites = Math.sqrt(this._sites._sites.length + 4) | 0;
		var heap = new com.nodename.delaunay.HalfedgePriorityQueue(dataBounds.y,dataBounds.height,sqrt_nsites);
		var edgeList = new com.nodename.delaunay.EdgeList(dataBounds.x,dataBounds.width,sqrt_nsites);
		var halfEdges = new Array();
		var vertices = new Array();
		var bottomMostSite = this._sites.next();
		newSite = this._sites.next();
		var leftRegion = function(he) {
			var edge1 = he.edge;
			if(edge1 == null) return bottomMostSite;
			return edge1.site(he.leftRight);
		};
		var rightRegion = function(he) {
			var edge1 = he.edge;
			if(edge1 == null) return bottomMostSite;
			return edge1.site(com.nodename.delaunay.LR.other(he.leftRight));
		};
		while(true) {
			if(heap.empty() == false) newintstar = heap.min();
			if(newSite != null && (heap.empty() || com.nodename.delaunay.Voronoi.comparePointByYThenX(newSite,newintstar) < 0)) {
				lbnd = edgeList.edgeListLeftNeighbor(newSite._coord);
				rbnd = lbnd.edgeListRightNeighbor;
				bottomSite = rightRegion(lbnd);
				edge = com.nodename.delaunay.Edge.createBisectingEdge(bottomSite,newSite);
				this._edges.push(edge);
				bisector = com.nodename.delaunay.Halfedge.create(edge,com.nodename.delaunay.LR.LEFT);
				halfEdges.push(bisector);
				edgeList.insert(lbnd,bisector);
				if((vertex = com.nodename.delaunay.Vertex.intersect(lbnd,bisector)) != null) {
					vertices.push(vertex);
					heap.remove(lbnd);
					lbnd.vertex = vertex;
					lbnd.ystar = vertex._coord.y + newSite.dist(vertex);
					heap.insert(lbnd);
				}
				lbnd = bisector;
				bisector = com.nodename.delaunay.Halfedge.create(edge,com.nodename.delaunay.LR.RIGHT);
				halfEdges.push(bisector);
				edgeList.insert(lbnd,bisector);
				if((vertex = com.nodename.delaunay.Vertex.intersect(bisector,rbnd)) != null) {
					vertices.push(vertex);
					bisector.vertex = vertex;
					bisector.ystar = vertex._coord.y + newSite.dist(vertex);
					heap.insert(bisector);
				}
				newSite = this._sites.next();
			} else if(heap.empty() == false) {
				lbnd = heap.extractMin();
				llbnd = lbnd.edgeListLeftNeighbor;
				rbnd = lbnd.edgeListRightNeighbor;
				rrbnd = rbnd.edgeListRightNeighbor;
				bottomSite = leftRegion(lbnd);
				topSite = rightRegion(rbnd);
				v = lbnd.vertex;
				v.setIndex();
				lbnd.edge.setVertex(lbnd.leftRight,v);
				rbnd.edge.setVertex(rbnd.leftRight,v);
				edgeList.remove(lbnd);
				heap.remove(rbnd);
				edgeList.remove(rbnd);
				leftRight = com.nodename.delaunay.LR.LEFT;
				if(bottomSite._coord.y > topSite._coord.y) {
					tempSite = bottomSite;
					bottomSite = topSite;
					topSite = tempSite;
					leftRight = com.nodename.delaunay.LR.RIGHT;
				}
				edge = com.nodename.delaunay.Edge.createBisectingEdge(bottomSite,topSite);
				this._edges.push(edge);
				bisector = com.nodename.delaunay.Halfedge.create(edge,leftRight);
				halfEdges.push(bisector);
				edgeList.insert(llbnd,bisector);
				edge.setVertex(com.nodename.delaunay.LR.other(leftRight),v);
				if((vertex = com.nodename.delaunay.Vertex.intersect(llbnd,bisector)) != null) {
					vertices.push(vertex);
					heap.remove(llbnd);
					llbnd.vertex = vertex;
					llbnd.ystar = vertex._coord.y + bottomSite.dist(vertex);
					heap.insert(llbnd);
				}
				if((vertex = com.nodename.delaunay.Vertex.intersect(bisector,rrbnd)) != null) {
					vertices.push(vertex);
					bisector.vertex = vertex;
					bisector.ystar = vertex._coord.y + bottomSite.dist(vertex);
					heap.insert(bisector);
				}
			} else break;
		}
		heap.dispose();
		edgeList.dispose();
		var _g = 0;
		while(_g < halfEdges.length) {
			var halfEdge = halfEdges[_g];
			++_g;
			halfEdge.reallyDispose();
		}
		var _g = 0, _g1 = this._edges;
		while(_g < _g1.length) {
			var edge1 = _g1[_g];
			++_g;
			edge1.clipVertices(this.plotBounds);
		}
		var _g = 0;
		while(_g < vertices.length) {
			var vertex1 = vertices[_g];
			++_g;
			vertex1.dispose();
		}
	}
	,region: function(p) {
		var site = this._sitesIndexedByLocation.get(as3.PointCore.hash(p));
		if(site == null) return new Array();
		return site.region(this.plotBounds);
	}
	,edges: function() {
		return this._edges;
	}
	,addSite: function(p,color,index) {
		var weight = this._prng.nextDouble() * 100;
		var site = com.nodename.delaunay.Site.create(p,index,weight,color);
		this._sites.push(site);
		this._sitesIndexedByLocation.set(as3.PointCore.hash(p),site);
	}
	,addSites: function(points,colors) {
		var length = points.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			this.addSite(points[i],colors != null?colors[i]:0,i);
		}
	}
	,makeSureNoDuplicatePoints: function(points) {
		var h = new haxe.ds.StringMap();
		var _g = 0;
		while(_g < points.length) {
			var p = points[_g];
			++_g;
			if(h.exists(as3.PointCore.hash(p))) throw "Duplicate points not supported yet!";
			h.set(as3.PointCore.hash(p),p);
		}
	}
	,dispose: function() {
		var i, n;
		if(this._sites != null) {
			this._sites.dispose();
			this._sites = null;
		}
		if(this._triangles != null) {
			n = this._triangles.length;
			var _g = 0;
			while(_g < n) {
				var i1 = _g++;
				this._triangles[i1].dispose();
			}
			this._triangles = null;
		}
		if(this._edges != null) {
			n = this._edges.length;
			var _g = 0;
			while(_g < n) {
				var i1 = _g++;
				this._edges[i1].dispose();
			}
			this._edges = null;
		}
		this.plotBounds = null;
		this._sitesIndexedByLocation = null;
	}
	,__class__: com.nodename.delaunay.Voronoi
}
com.nodename.geom = {}
com.nodename.geom.LineSegment = function(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
};
com.nodename.geom.LineSegment.__name__ = true;
com.nodename.geom.LineSegment.prototype = {
	__class__: com.nodename.geom.LineSegment
}
com.nodename.geom.Polygon = function(vertices) {
	this._vertices = vertices;
};
com.nodename.geom.Polygon.__name__ = true;
com.nodename.geom.Polygon.prototype = {
	signedDoubleArea: function() {
		var index, nextIndex;
		var n = this._vertices.length;
		var point, next;
		var signedDoubleArea = 0;
		var _g = 0;
		while(_g < n) {
			var index1 = _g++;
			nextIndex = (index1 + 1) % n;
			point = this._vertices[index1];
			next = this._vertices[nextIndex];
			signedDoubleArea += point.x * next.y - next.x * point.y;
		}
		return signedDoubleArea;
	}
	,winding: function() {
		var signedDoubleArea = this.signedDoubleArea();
		if(signedDoubleArea < 0) return com.nodename.geom.Winding.CLOCKWISE;
		if(signedDoubleArea > 0) return com.nodename.geom.Winding.COUNTERCLOCKWISE;
		return com.nodename.geom.Winding.NONE;
	}
	,__class__: com.nodename.geom.Polygon
}
com.nodename.geom.Winding = function(name) {
	this._name = name;
};
com.nodename.geom.Winding.__name__ = true;
com.nodename.geom.Winding.prototype = {
	__class__: com.nodename.geom.Winding
}
var de = {}
de.polygonal = {}
de.polygonal.math = {}
de.polygonal.math.PM_PRNG = function() {
	this.seed = 1;
};
de.polygonal.math.PM_PRNG.__name__ = true;
de.polygonal.math.PM_PRNG.prototype = {
	gen: function() {
		return this.seed = this.seed * 16807 % 2147483647;
	}
	,nextDoubleRange: function(min,max) {
		return min + (max - min) * this.nextDouble();
	}
	,nextIntRange: function(min,max) {
		min -= .4999;
		max += .4999;
		return Math.round(min + (max - min) * this.nextDouble());
	}
	,nextDouble: function() {
		return this.gen() / 2147483647;
	}
	,__class__: de.polygonal.math.PM_PRNG
}
var haxe = {}
haxe.Timer = function() { }
haxe.Timer.__name__ = true;
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
js.Browser.__name__ = true;
var voronoimap = {}
voronoimap.IslandShape = function() { }
voronoimap.IslandShape.__name__ = true;
voronoimap.IslandShape.makeRadial = function(seed,islandFactor) {
	if(islandFactor == null) islandFactor = 1.07;
	var islandRandom = new de.polygonal.math.PM_PRNG();
	islandRandom.seed = seed;
	var bumps = islandRandom.nextIntRange(1,6);
	var startAngle = islandRandom.nextDoubleRange(0,2 * Math.PI);
	var dipAngle = islandRandom.nextDoubleRange(0,2 * Math.PI);
	var dipWidth = islandRandom.nextDoubleRange(0.2,0.7);
	var inside = function(q) {
		var angle = Math.atan2(q.y,q.x);
		var length = 0.5 * (Math.max(Math.abs(q.x),Math.abs(q.y)) + as3.PointCore.distanceFromOrigin(q));
		var r1 = 0.5 + 0.40 * Math.sin(startAngle + bumps * angle + Math.cos((bumps + 3) * angle));
		var r2 = 0.7 - 0.20 * Math.sin(startAngle + bumps * angle - Math.sin((bumps + 2) * angle));
		if(Math.abs(angle - dipAngle) < dipWidth || Math.abs(angle - dipAngle + 2 * Math.PI) < dipWidth || Math.abs(angle - dipAngle - 2 * Math.PI) < dipWidth) r1 = r2 = 0.2;
		return length < r1 || length > r1 * islandFactor && length < r2;
	};
	return inside;
}
voronoimap.IslandShape.makePerlin = function(seed,oceanRatio) {
	if(oceanRatio == null) oceanRatio = 0.5;
	var landRatioMinimum = 0.1;
	var landRatioMaximum = 0.5;
	oceanRatio = (landRatioMaximum - landRatioMinimum) * oceanRatio + landRatioMinimum;
	var perlin = co.janicek.core.math.PerlinNoise.makePerlinNoise(256,256,1.0,1.0,1.0,seed,8);
	return function(q) {
		var c = (co.janicek.core.array.Array2dCore.get(perlin,(q.x + 1) * 128 | 0,(q.y + 1) * 128 | 0) & 255) / 255.0;
		return c > oceanRatio + oceanRatio * as3.PointCore.distanceFromOrigin(q) * as3.PointCore.distanceFromOrigin(q);
	};
}
voronoimap.IslandShape.makeSquare = function() {
	return function(q) {
		return true;
	};
}
voronoimap.IslandShape.makeBlob = function() {
	return function(q) {
		var eye1 = as3.PointCore.distanceFromOrigin({ x : q.x - 0.2, y : q.y / 2 + 0.2}) < 0.05;
		var eye2 = as3.PointCore.distanceFromOrigin({ x : q.x + 0.2, y : q.y / 2 + 0.2}) < 0.05;
		var body = as3.PointCore.distanceFromOrigin(q) < 0.8 - 0.18 * Math.sin(5 * Math.atan2(q.y,q.x));
		return body && !eye1 && !eye2;
	};
}
voronoimap.IslandShape.makeBitmap = function(bitmap) {
	var dimensions = co.janicek.core.array.Array2dCore.dimensions(bitmap);
	return function(q) {
		var x = (q.x + 1) / 2 * dimensions.x;
		var y = (q.y + 1) / 2 * dimensions.y;
		return co.janicek.core.array.Array2dCore.get(bitmap,x | 0,y | 0);
	};
}
voronoimap.IslandShape.makeNoise = function(seed) {
	return function(q) {
		return (seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0 > 0.5;
	};
}
voronoimap.Lava = function() {
	this.lava = [];
};
voronoimap.Lava.__name__ = true;
voronoimap.Lava.prototype = {
	__class__: voronoimap.Lava
}
voronoimap.Main = function() { }
voronoimap.Main.__name__ = true;
voronoimap.Main.main = function() {
	voronoimap.Main.initializeUi();
	voronoimap.Main.state = voronoimap.Main.generate();
}
voronoimap.Main.initializeUi = function() {
	voronoimap.Main.image = new Image();
	voronoimap.Main.image.onload = function() {
		new js.JQuery("#imageThumb").attr("src",voronoimap.Main.image.src);
		voronoimap.Main.updateThumb();
	};
	voronoimap.Main.image.src = "world-map.jpg";
	new js.JQuery("#random").click(function() {
		new js.JQuery("#seed").val(Std.string(co.janicek.core.math.RandomCore.makeRandomSeed()));
	});
	new js.JQuery("#shapeRandom").click(function() {
		new js.JQuery("#shapeSeed").val(Std.string(co.janicek.core.math.RandomCore.makeRandomSeed()));
	});
	new js.JQuery("#islandShape").change(function(e) {
		new js.JQuery(["#islandFactor","#oceanRatio","#shapeSeed","#imageFile","#imageThumb","#invertImage","#imageThreshold"].toString()).parent().hide();
		var _g = new js.JQuery("#islandShape").val();
		switch(_g) {
		case "bitmap":
			new js.JQuery(["#imageFile","#imageThumb","#invertImage","#imageThreshold"].toString()).parent().show();
			break;
		case "noise":
			new js.JQuery("#shapeSeed").parent().show();
			break;
		case "perlin":
			new js.JQuery(["#oceanRatio","#shapeSeed"].toString()).parent().show();
			break;
		case "radial":
			new js.JQuery(["#islandFactor","#shapeSeed"].toString()).parent().show();
			break;
		}
	});
	new js.JQuery("#imageFile").change(function(e) {
		console.log("file changed");
		var fileUpload = new js.JQuery("#imageFile").get()[0];
		var files = fileUpload.files;
		if(files.length == 1) {
			var file = files[0];
			if(StringTools.startsWith(file.type,"image")) co.janicek.core.html.CanvasCore.loadFileIntoImage(file,voronoimap.Main.image);
		}
	});
	new js.JQuery(["#invertImage","#imageThreshold"].toString()).change(function(e) {
		voronoimap.Main.updateThumb();
	});
	new js.JQuery("#width").val(Std.string(js.Browser.window.innerWidth));
	new js.JQuery("#height").val(Std.string(js.Browser.window.innerHeight));
	new js.JQuery("#view").change(function(e) {
		var _g = new js.JQuery("#view").val();
		switch(_g) {
		case "debug polygons":
			new js.JQuery("#addNoise").removeAttr("checked");
			break;
		case "smooth":
			new js.JQuery("#addNoise").attr("checked","true");
			break;
		}
	});
	new js.JQuery(["#view","#viewRivers","#viewRoads","#viewBridges","#viewWatersheds","#viewEdges","#addNoise"].toString()).change(function(e) {
		voronoimap.Main.render(voronoimap.Main.state);
	});
	new js.JQuery("#viewRoads").change(function(e) {
		new js.JQuery("#roadElevationThresholds").parent().toggle();
	});
	new js.JQuery("#generate").click(function() {
		voronoimap.Main.state = voronoimap.Main.generate();
	});
	new js.JQuery("#toggle").click(function() {
		var fields = new js.JQuery("#fields");
		fields.toggle(500,function() {
			new js.JQuery("#toggle").text(fields["is"](":visible")?"hide":"show");
		});
	});
}
voronoimap.Main.updateThumb = function() {
	var threshold = Std.parseInt(new js.JQuery("#imageThreshold").val());
	var color1 = voronoimap.html.Style.displayColors.OCEAN;
	var color2 = voronoimap.html.Style.displayColors.GRASSLAND;
	if(new js.JQuery("#invertImage")["is"](":checked")) {
		var colorHold = color1;
		color1 = color2;
		color2 = colorHold;
	}
	var thresholdImageData = co.janicek.core.html.CanvasCore.makeAverageThresholdImageData(co.janicek.core.html.CanvasCore.getImageData(voronoimap.Main.image),threshold,color1,color2);
	var imageDataUrl = co.janicek.core.html.CanvasCore.makeImageDataUrlFromImageData(thresholdImageData);
	new js.JQuery("#imageThumb").attr("src",imageDataUrl);
}
voronoimap.Main.getContext = function() {
	var canvas = js.Browser.document.getElementById("map");
	return canvas.getContext("2d");
}
voronoimap.Main.findOrCreateCanvas = function() {
	var canvas = js.Browser.document.getElementById("map");
	if(canvas == null) {
		canvas = js.Browser.document.createElement("canvas");
		canvas.id = "map";
		js.Browser.document.body.appendChild(canvas);
	}
	return canvas;
}
voronoimap.Main.generate = function() {
	var start = haxe.Timer.stamp();
	var state = { map : null, noisyEdges : null, roads : null, watersheds : null, lava : null};
	var canvas = voronoimap.Main.findOrCreateCanvas();
	canvas.width = Std.parseInt(new js.JQuery("#width").val());
	canvas.height = Std.parseInt(new js.JQuery("#height").val());
	state.map = new voronoimap.Map({ width : canvas.width + 0.0, height : canvas.height + 0.0});
	var seed = voronoimap.Main.getIntegerOrStringSeed(new js.JQuery("#seed").val());
	var shapeSeed = voronoimap.Main.getIntegerOrStringSeed(new js.JQuery("#shapeSeed").val());
	var islandShape = new js.JQuery("#islandShape").val();
	switch(islandShape) {
	case "bitmap":
		var imageData = co.janicek.core.html.CanvasCore.getImageData(voronoimap.Main.image);
		console.log(Std.parseInt(new js.JQuery("#imageThreshold").val()));
		var bitmap = co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap(imageData,Std.parseInt(new js.JQuery("#imageThreshold").val()));
		if(new js.JQuery("#invertImage")["is"](":checked")) bitmap = co.janicek.core.html.CanvasCore.invertBitmap(bitmap);
		state.map.newIsland(voronoimap.IslandShape.makeBitmap(bitmap),seed);
		break;
	case "blob":
		state.map.newIsland(voronoimap.IslandShape.makeBlob(),seed);
		break;
	case "noise":
		state.map.newIsland(voronoimap.IslandShape.makeNoise(shapeSeed),seed);
		break;
	case "perlin":
		state.map.newIsland(voronoimap.IslandShape.makePerlin(shapeSeed,Std.parseFloat(new js.JQuery("#oceanRatio").val())),seed);
		break;
	case "radial":
		state.map.newIsland(voronoimap.IslandShape.makeRadial(shapeSeed,Std.parseFloat(new js.JQuery("#islandFactor").val())),seed);
		break;
	case "square":
		state.map.newIsland(voronoimap.IslandShape.makeSquare(),seed);
		break;
	}
	state.watersheds = new voronoimap.Watersheds();
	state.noisyEdges = new voronoimap.NoisyEdges();
	state.lava = new voronoimap.Lava();
	state.roads = new voronoimap.Roads();
	var numberOfLands = new js.JQuery("#numberOfLands").val();
	if(co.janicek.core.StringCore.isInteger(numberOfLands)) voronoimap.Map.tryMutateMapPointsToGetNumberLands(state.map,Std.parseInt(numberOfLands),30,Std.parseInt(numberOfLands) * 2); else {
		state.map.go0PlacePoints(Std.parseInt(new js.JQuery("#numberOfPoints").val()));
		state.map.go1ImprovePoints(Std.parseInt(new js.JQuery("#lloydIterations").val()));
		state.map.go2BuildGraph();
		state.map.go3AssignElevations(Std.parseFloat(new js.JQuery("#lakeThreshold").val()));
	}
	state.map.go4AssignMoisture(Std.parseInt(new js.JQuery("#riverChance").val()));
	state.map.go5DecorateMap();
	var thresholds = Lambda.array(new js.JQuery("#roadElevationThresholds").val().split(",").map((function(f) {
		return function(x) {
			return f(x);
		};
	})(Std.parseFloat)));
	state.roads.createRoads(state.map,thresholds);
	state.watersheds.createWatersheds(state.map);
	state.noisyEdges.buildNoisyEdges(state.map,state.lava,seed,Std.parseFloat(new js.JQuery("#edgeNoise").val()));
	var generateMs = (haxe.Timer.stamp() - start) * 1000 | 0;
	new js.JQuery("#generateMs").text(Std.string(generateMs));
	start = haxe.Timer.stamp();
	voronoimap.Main.render(state);
	var renderMs = (haxe.Timer.stamp() - start) * 1000 | 0;
	new js.JQuery("#renderMs").text(Std.string(renderMs));
	new js.JQuery("#totalMs").text(Std.string(renderMs + generateMs));
	return state;
}
voronoimap.Main.getIntegerOrStringSeed = function(s) {
	if(co.janicek.core.StringCore.isInteger(s)) return Std.parseInt(s);
	return Math.abs(co.janicek.core.math.RandomCore.stringToSeed(s)) | 0;
}
voronoimap.Main.render = function(state) {
	var c = voronoimap.Main.getContext();
	voronoimap.html.CanvasRender.graphicsReset(c,state.map.SIZE.width | 0,state.map.SIZE.height | 0,voronoimap.html.Style.displayColors);
	var _g = new js.JQuery("#view").val();
	switch(_g) {
	case "debug polygons":
		voronoimap.html.CanvasRender.renderDebugPolygons(c,state.map,voronoimap.html.Style.displayColors);
		break;
	case "smooth":
		voronoimap.html.CanvasRender.renderPolygons(c,voronoimap.html.Style.displayColors,null,voronoimap.html.CanvasRender.colorWithSlope,state.map,state.noisyEdges);
		voronoimap.html.CanvasRender.renderEdges(c,voronoimap.html.Style.displayColors,state.map,state.noisyEdges,state.lava,new js.JQuery("#viewRivers")["is"](":checked"));
		break;
	}
	if(new js.JQuery("#viewEdges")["is"](":checked")) voronoimap.html.CanvasRender.renderAllEdges(c,co.janicek.core.html.HtmlColorCore.rgba(208,208,208,0.25),state.map,state.noisyEdges);
	if(new js.JQuery("#viewRoads")["is"](":checked")) voronoimap.html.CanvasRender.renderRoads(c,state.map,state.roads,voronoimap.html.Style.displayColors);
	if(new js.JQuery("#viewBridges")["is"](":checked")) voronoimap.html.CanvasRender.renderBridges(c,state.map,state.roads,voronoimap.html.Style.displayColors);
	if(new js.JQuery("#viewWatersheds")["is"](":checked")) voronoimap.html.CanvasRender.renderWatersheds(c,state.map,state.watersheds);
	if(new js.JQuery("#addNoise")["is"](":checked")) co.janicek.core.html.CanvasCore.addNoiseToCanvas(c,666,10,true);
}
voronoimap.Map = function(size) {
	this.mapRandom = new de.polygonal.math.PM_PRNG();
	this.SIZE = size;
	this.reset();
};
voronoimap.Map.__name__ = true;
voronoimap.Map.getBiome = function(p) {
	if(p.ocean) return "OCEAN"; else if(p.water) {
		if(p.elevation < 0.1) return "MARSH";
		if(p.elevation > 0.8) return "ICE";
		return "LAKE";
	} else if(p.coast) return "BEACH"; else if(p.elevation > 0.8) {
		if(p.moisture > 0.50) return "SNOW"; else if(p.moisture > 0.33) return "TUNDRA"; else if(p.moisture > 0.16) return "BARE"; else return "SCORCHED";
	} else if(p.elevation > 0.6) {
		if(p.moisture > 0.66) return "TAIGA"; else if(p.moisture > 0.33) return "SHRUBLAND"; else return "TEMPERATE_DESERT";
	} else if(p.elevation > 0.3) {
		if(p.moisture > 0.83) return "TEMPERATE_RAIN_FOREST"; else if(p.moisture > 0.50) return "TEMPERATE_DECIDUOUS_FOREST"; else if(p.moisture > 0.16) return "GRASSLAND"; else return "TEMPERATE_DESERT";
	} else if(p.moisture > 0.66) return "TROPICAL_RAIN_FOREST"; else if(p.moisture > 0.33) return "TROPICAL_SEASONAL_FOREST"; else if(p.moisture > 0.16) return "GRASSLAND"; else return "SUBTROPICAL_DESERT";
}
voronoimap.Map.countLands = function(centers) {
	return Lambda.count(centers,function(c) {
		return !c.water;
	});
}
voronoimap.Map.tryMutateMapPointsToGetNumberLands = function(map,numberOfLands,timeoutSeconds,initialNumberOfPoints,numLloydIterations,lakeThreshold) {
	if(lakeThreshold == null) lakeThreshold = 0.3;
	if(numLloydIterations == null) numLloydIterations = 2;
	if(initialNumberOfPoints == null) initialNumberOfPoints = 1000;
	if(timeoutSeconds == null) timeoutSeconds = 10;
	var pointCount = initialNumberOfPoints;
	var startTime = haxe.Timer.stamp();
	var targetLandCountFound = false;
	do {
		map.go0PlacePoints(pointCount);
		map.go1ImprovePoints(numLloydIterations);
		map.go2BuildGraph();
		map.go3AssignElevations(lakeThreshold);
		var lands = voronoimap.Map.countLands(map.centers);
		if(lands == numberOfLands) targetLandCountFound = true; else pointCount += lands < numberOfLands?1:-1;
	} while(!targetLandCountFound && haxe.Timer.stamp() - startTime < timeoutSeconds);
	return map;
}
voronoimap.Map.prototype = {
	inside: function(p) {
		return this.islandShape({ x : 2 * (p.x / this.SIZE.width - 0.5), y : 2 * (p.y / this.SIZE.height - 0.5)});
	}
	,lookupEdgeFromCorner: function(q,s) {
		var _g = 0, _g1 = q.protrudes;
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			if(edge.v0 == s || edge.v1 == s) return edge;
		}
		return null;
	}
	,lookupEdgeFromCenter: function(p,r) {
		var _g = 0, _g1 = p.borders;
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			if(edge.d0 == r || edge.d1 == r) return edge;
		}
		return null;
	}
	,assignBiomes: function() {
		var p;
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			p1.biome = voronoimap.Map.getBiome(p1);
		}
	}
	,assignPolygonMoisture: function() {
		var p, q, sumMoisture;
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			sumMoisture = 0.0;
			var _g2 = 0, _g3 = p1.corners;
			while(_g2 < _g3.length) {
				var q1 = _g3[_g2];
				++_g2;
				if(q1.moisture > 1.0) q1.moisture = 1.0;
				sumMoisture += q1.moisture;
			}
			p1.moisture = sumMoisture / p1.corners.length;
		}
	}
	,assignCornerMoisture: function() {
		var q, r, newMoisture;
		var queue = [];
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			if((q1.water || q1.river > 0) && !q1.ocean) {
				q1.moisture = q1.river > 0?Math.min(3.0,0.2 * q1.river):1.0;
				queue.push(q1);
			} else q1.moisture = 0.0;
		}
		while(queue.length > 0) {
			q = queue.shift();
			var _g = 0, _g1 = q.adjacent;
			while(_g < _g1.length) {
				var r1 = _g1[_g];
				++_g;
				newMoisture = q.moisture * 0.9;
				if(newMoisture > r1.moisture) {
					r1.moisture = newMoisture;
					queue.push(r1);
				}
			}
		}
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			if(q1.ocean || q1.coast) q1.moisture = 1.0;
		}
	}
	,createRivers: function(riverChance) {
		riverChance = riverChance == null?(this.SIZE.width + this.SIZE.height) / 4 | 0:riverChance;
		var i, q, edge;
		var _g = 0;
		while(_g < riverChance) {
			var i1 = _g++;
			q = this.corners[this.mapRandom.nextIntRange(0,this.corners.length - 1)];
			if(q.ocean || q.elevation < 0.3 || q.elevation > 0.9) continue;
			while(!q.coast) {
				if(q == q.downslope) break;
				edge = this.lookupEdgeFromCorner(q,q.downslope);
				edge.river = edge.river + 1;
				q.river = (q.river == null?0:q.river) + 1;
				q.downslope.river = (q.downslope.river == null?0:q.downslope.river) + 1;
				q = q.downslope;
			}
		}
	}
	,calculateWatersheds: function() {
		var q, r, i, changed;
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			q1.watershed = q1;
			if(!q1.ocean && !q1.coast) q1.watershed = q1.downslope;
		}
		var _g = 0;
		while(_g < 100) {
			var i1 = _g++;
			changed = false;
			var _g1 = 0, _g2 = this.corners;
			while(_g1 < _g2.length) {
				var q1 = _g2[_g1];
				++_g1;
				if(!q1.ocean && !q1.coast && !q1.watershed.coast) {
					r = q1.downslope.watershed;
					if(!r.ocean) q1.watershed = r;
					changed = true;
				}
			}
			if(!changed) break;
		}
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			r = q1.watershed;
			r.watershed_size = 1 + (r.watershed_size == null?0:r.watershed_size);
		}
	}
	,calculateDownslopes: function() {
		var q, s, r;
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			r = q1;
			var _g2 = 0, _g3 = q1.adjacent;
			while(_g2 < _g3.length) {
				var s1 = _g3[_g2];
				++_g2;
				if(s1.elevation <= r.elevation) r = s1;
			}
			q1.downslope = r;
		}
	}
	,assignPolygonElevations: function() {
		var p, q, sumElevation;
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			sumElevation = 0.0;
			var _g2 = 0, _g3 = p1.corners;
			while(_g2 < _g3.length) {
				var q1 = _g3[_g2];
				++_g2;
				sumElevation += q1.elevation;
			}
			p1.elevation = sumElevation / p1.corners.length;
		}
	}
	,assignOceanCoastAndLand: function(lakeThreshold) {
		var queue = [];
		var p, q, r, numWater;
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			numWater = 0;
			var _g2 = 0, _g3 = p1.corners;
			while(_g2 < _g3.length) {
				var q1 = _g3[_g2];
				++_g2;
				if(q1.border) {
					p1.border = true;
					p1.ocean = true;
					q1.water = true;
					queue.push(p1);
				}
				if(q1.water) numWater += 1;
			}
			p1.water = p1.ocean || numWater >= p1.corners.length * lakeThreshold;
		}
		while(queue.length > 0) {
			p = queue.shift();
			var _g = 0, _g1 = p.neighbors;
			while(_g < _g1.length) {
				var r1 = _g1[_g];
				++_g;
				if(r1.water && !r1.ocean) {
					r1.ocean = true;
					queue.push(r1);
				}
			}
		}
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			var numOcean = 0;
			var numLand = 0;
			var _g2 = 0, _g3 = p1.neighbors;
			while(_g2 < _g3.length) {
				var r1 = _g3[_g2];
				++_g2;
				numOcean += r1.ocean?1:0;
				numLand += !r1.water?1:0;
			}
			p1.coast = numOcean > 0 && numLand > 0;
		}
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			var numOcean = 0;
			var numLand = 0;
			var _g2 = 0, _g3 = q1.touches;
			while(_g2 < _g3.length) {
				var p1 = _g3[_g2];
				++_g2;
				numOcean += p1.ocean?1:0;
				numLand += !p1.water?1:0;
			}
			q1.ocean = numOcean == q1.touches.length;
			q1.coast = numOcean > 0 && numLand > 0;
			q1.water = q1.border || numLand != q1.touches.length && !q1.coast;
		}
	}
	,redistributeMoisture: function(locations) {
		var i;
		locations.sort(function(c1,c2) {
			if(c1.moisture > c2.moisture) return 1;
			if(c1.moisture < c2.moisture) return -1;
			if(c1.index > c2.index) return 1;
			if(c1.index < c2.index) return -1;
			return 0;
		});
		var _g1 = 0, _g = locations.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			locations[i1].moisture = i1 / (locations.length - 1);
		}
	}
	,redistributeElevations: function(locations) {
		var SCALE_FACTOR = 1.1;
		var i, y, x;
		locations.sort(function(c1,c2) {
			if(c1.elevation > c2.elevation) return 1;
			if(c1.elevation < c2.elevation) return -1;
			if(c1.index > c2.index) return 1;
			if(c1.index < c2.index) return -1;
			return 0;
		});
		var _g1 = 0, _g = locations.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			y = i1 / (locations.length - 1);
			x = Math.sqrt(SCALE_FACTOR) - Math.sqrt(SCALE_FACTOR * (1 - y));
			if(x > 1.0) x = 1.0;
			locations[i1].elevation = x;
		}
	}
	,assignCornerElevations: function() {
		var q, s;
		var queue = [];
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			q1.water = !this.inside(q1.point);
		}
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			if(q1.border) {
				q1.elevation = 0.0;
				queue.push(q1);
			} else q1.elevation = Math.POSITIVE_INFINITY;
		}
		while(queue.length > 0) {
			q = queue.shift();
			var _g = 0, _g1 = q.adjacent;
			while(_g < _g1.length) {
				var s1 = _g1[_g];
				++_g;
				var newElevation = 0.01 + q.elevation;
				if(!q.water && !s1.water) newElevation += 1;
				if(newElevation < s1.elevation) {
					s1.elevation = newElevation;
					queue.push(s1);
				}
			}
		}
	}
	,buildGraph: function(points,voronoi) {
		var _g = this;
		var p, q, point, other;
		var libedges = voronoi.edges();
		var centerLookup = new haxe.ds.StringMap();
		var _g1 = 0;
		while(_g1 < points.length) {
			var point1 = points[_g1];
			++_g1;
			p = new voronoimap.graph.Center();
			p.index = this.centers.length;
			p.point = point1;
			p.neighbors = new Array();
			p.borders = new Array();
			p.corners = new Array();
			this.centers.push(p);
			centerLookup.set(as3.PointCore.hash(point1),p);
		}
		var _g1 = 0, _g11 = this.centers;
		while(_g1 < _g11.length) {
			var p1 = _g11[_g1];
			++_g1;
			voronoi.region(p1.point);
		}
		var _cornerMap = [];
		var makeCorner = function(point1) {
			var q1;
			if(point1 == null) return null;
			var bucket;
			var _g1 = (point1.x | 0) - 1, _g2 = (point1.x | 0) + 2;
			while(_g1 < _g2) {
				var bucket1 = _g1++;
				if(_cornerMap[bucket1] != null) {
					var _g21 = 0, _g3 = _cornerMap[bucket1];
					while(_g21 < _g3.length) {
						var q2 = _g3[_g21];
						++_g21;
						var dx = point1.x - q2.point.x;
						var dy = point1.y - q2.point.y;
						if(dx * dx + dy * dy < 1e-6) return q2;
					}
				}
			}
			bucket = point1.x | 0;
			if(_cornerMap[bucket] == null) _cornerMap[bucket] = [];
			q1 = new voronoimap.graph.Corner();
			q1.index = _g.corners.length;
			_g.corners.push(q1);
			q1.point = point1;
			q1.border = point1.x == 0 || point1.x == _g.SIZE.width || point1.y == 0 || point1.y == _g.SIZE.height;
			q1.touches = new Array();
			q1.protrudes = new Array();
			q1.adjacent = new Array();
			_cornerMap[bucket].push(q1);
			return q1;
		};
		var _g1 = 0;
		while(_g1 < libedges.length) {
			var libedge = libedges[_g1];
			++_g1;
			var dedge = libedge.delaunayLine();
			var vedge = libedge.voronoiEdge();
			var edge = new voronoimap.graph.Edge();
			edge.index = this.edges.length;
			edge.river = 0;
			this.edges.push(edge);
			edge.midpoint = vedge.p0 != null && vedge.p1 != null?as3.PointCore.interpolate(vedge.p0,vedge.p1,0.5):null;
			edge.v0 = makeCorner(vedge.p0);
			edge.v1 = makeCorner(vedge.p1);
			edge.d0 = centerLookup.get(as3.PointCore.hash(dedge.p0));
			edge.d1 = centerLookup.get(as3.PointCore.hash(dedge.p1));
			if(edge.d0 != null) edge.d0.borders.push(edge);
			if(edge.d1 != null) edge.d1.borders.push(edge);
			if(edge.v0 != null) edge.v0.protrudes.push(edge);
			if(edge.v1 != null) edge.v1.protrudes.push(edge);
			var addToCornerList = function(v,x) {
				if(x != null && Lambda.indexOf(v,x) < 0) v.push(x);
			};
			var addToCenterList = function(v,x) {
				if(x != null && Lambda.indexOf(v,x) < 0) v.push(x);
			};
			if(edge.d0 != null && edge.d1 != null) {
				addToCenterList(edge.d0.neighbors,edge.d1);
				addToCenterList(edge.d1.neighbors,edge.d0);
			}
			if(edge.v0 != null && edge.v1 != null) {
				addToCornerList(edge.v0.adjacent,edge.v1);
				addToCornerList(edge.v1.adjacent,edge.v0);
			}
			if(edge.d0 != null) {
				addToCornerList(edge.d0.corners,edge.v0);
				addToCornerList(edge.d0.corners,edge.v1);
			}
			if(edge.d1 != null) {
				addToCornerList(edge.d1.corners,edge.v0);
				addToCornerList(edge.d1.corners,edge.v1);
			}
			if(edge.v0 != null) {
				addToCenterList(edge.v0.touches,edge.d0);
				addToCenterList(edge.v0.touches,edge.d1);
			}
			if(edge.v1 != null) {
				addToCenterList(edge.v1.touches,edge.d0);
				addToCenterList(edge.v1.touches,edge.d1);
			}
		}
	}
	,landCorners: function(corners) {
		var q, locations = [];
		var _g = 0;
		while(_g < corners.length) {
			var q1 = corners[_g];
			++_g;
			if(!q1.ocean && !q1.coast) locations.push(q1);
		}
		return locations;
	}
	,improveCorners: function() {
		var newCorners = new Array();
		var q, r, point, i, edge;
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q1 = _g1[_g];
			++_g;
			if(q1.border) newCorners[q1.index] = q1.point; else {
				point = { x : 0.0, y : 0.0};
				var _g2 = 0, _g3 = q1.touches;
				while(_g2 < _g3.length) {
					var r1 = _g3[_g2];
					++_g2;
					point.x += r1.point.x;
					point.y += r1.point.y;
				}
				point.x /= q1.touches.length;
				point.y /= q1.touches.length;
				newCorners[q1.index] = point;
			}
		}
		var _g1 = 0, _g = this.corners.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			this.corners[i1].point = newCorners[i1];
		}
		var _g = 0, _g1 = this.edges;
		while(_g < _g1.length) {
			var edge1 = _g1[_g];
			++_g;
			if(edge1.v0 != null && edge1.v1 != null) edge1.midpoint = as3.PointCore.interpolate(edge1.v0.point,edge1.v1.point,0.5);
		}
	}
	,improveRandomPoints: function(points,numLloydIterations) {
		var i, p, q, voronoi, region;
		var _g = 0;
		while(_g < numLloydIterations) {
			var i1 = _g++;
			voronoi = new com.nodename.delaunay.Voronoi(points,null,new as3.Rectangle(0,0,this.SIZE.width,this.SIZE.height));
			var _g1 = 0;
			while(_g1 < points.length) {
				var p1 = points[_g1];
				++_g1;
				region = voronoi.region(p1);
				p1.x = 0.0;
				p1.y = 0.0;
				var _g2 = 0;
				while(_g2 < region.length) {
					var q1 = region[_g2];
					++_g2;
					p1.x += q1.x;
					p1.y += q1.y;
				}
				p1.x /= region.length;
				p1.y /= region.length;
				region.splice(0,region.length);
			}
			voronoi.dispose();
		}
	}
	,generateRandomPoints: function(NUM_POINTS) {
		var p, i, points = new Array();
		var _g = 0;
		while(_g < NUM_POINTS) {
			var i1 = _g++;
			p = { x : this.mapRandom.nextDoubleRange(10,this.SIZE.width - 10), y : this.mapRandom.nextDoubleRange(10,this.SIZE.height - 10)};
			points.push(p);
		}
		return points;
	}
	,reset: function() {
		var p, q, edge;
		if(this.points != null) this.points.splice(0,this.points.length);
		if(this.edges != null) {
			var _g = 0, _g1 = this.edges;
			while(_g < _g1.length) {
				var edge1 = _g1[_g];
				++_g;
				edge1.d0 = edge1.d1 = null;
				edge1.v0 = edge1.v1 = null;
			}
			this.edges.splice(0,this.edges.length);
		}
		if(this.centers != null) {
			var _g = 0, _g1 = this.centers;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				p1.neighbors.splice(0,p1.neighbors.length);
				p1.corners.splice(0,p1.corners.length);
				p1.borders.splice(0,p1.borders.length);
			}
			this.centers.splice(0,this.centers.length);
		}
		if(this.corners != null) {
			var _g = 0, _g1 = this.corners;
			while(_g < _g1.length) {
				var q1 = _g1[_g];
				++_g;
				q1.adjacent.splice(0,q1.adjacent.length);
				q1.touches.splice(0,q1.touches.length);
				q1.protrudes.splice(0,q1.protrudes.length);
				q1.downslope = null;
				q1.watershed = null;
			}
			this.corners.splice(0,this.corners.length);
		}
		if(this.points == null) this.points = new Array();
		if(this.edges == null) this.edges = new Array();
		if(this.centers == null) this.centers = new Array();
		if(this.corners == null) this.corners = new Array();
	}
	,go5DecorateMap: function() {
		this.assignBiomes();
	}
	,go4AssignMoisture: function(riverChance) {
		this.calculateDownslopes();
		this.calculateWatersheds();
		this.createRivers(riverChance);
		this.assignCornerMoisture();
		this.redistributeMoisture(this.landCorners(this.corners));
		this.assignPolygonMoisture();
	}
	,go3AssignElevations: function(lakeThreshold) {
		if(lakeThreshold == null) lakeThreshold = 0.3;
		this.assignCornerElevations();
		this.assignOceanCoastAndLand(lakeThreshold);
		this.redistributeElevations(this.landCorners(this.corners));
		var _g = 0, _g1 = this.corners;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			if(q.ocean || q.coast) q.elevation = 0.0;
		}
		this.assignPolygonElevations();
	}
	,go2BuildGraph: function() {
		var voronoi = new com.nodename.delaunay.Voronoi(this.points,null,new as3.Rectangle(0,0,this.SIZE.width,this.SIZE.height));
		this.buildGraph(this.points,voronoi);
		this.improveCorners();
		voronoi.dispose();
		voronoi = null;
		this.points = null;
	}
	,go1ImprovePoints: function(numLloydIterations) {
		if(numLloydIterations == null) numLloydIterations = 2;
		this.improveRandomPoints(this.points,numLloydIterations);
	}
	,go0PlacePoints: function(numberOfPoints) {
		if(numberOfPoints == null) numberOfPoints = 1000;
		this.reset();
		this.points = this.generateRandomPoints(numberOfPoints);
	}
	,newIsland: function(islandShape,variant) {
		this.islandShape = islandShape;
		this.mapRandom.seed = variant;
	}
	,__class__: voronoimap.Map
}
voronoimap.NoisyEdges = function() {
	this.path0 = [];
	this.path1 = [];
};
voronoimap.NoisyEdges.__name__ = true;
voronoimap.NoisyEdges.buildNoisyLineSegments = function(seed,A,B,C,D,minLength) {
	var points = new Array();
	var limit = 10;
	var subdivide = (function($this) {
		var $r;
		var subdivide1 = null;
		subdivide1 = function(A1,B1,C1,D1) {
			if(as3.PointCore.distanceFromOrigin({ x : A1.x - C1.x, y : A1.y - C1.y}) < minLength || as3.PointCore.distanceFromOrigin({ x : B1.x - D1.x, y : B1.y - D1.y}) < minLength) return;
			var p = 0.2 + (0.8 - 0.2) * ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0);
			var q = 0.2 + (0.8 - 0.2) * ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0);
			var E = as3.PointCore.interpolate(A1,D1,p);
			var F = as3.PointCore.interpolate(B1,C1,p);
			var G = as3.PointCore.interpolate(A1,B1,q);
			var I = as3.PointCore.interpolate(D1,C1,q);
			var H = as3.PointCore.interpolate(E,F,q);
			var s = 1.0 - (-0.4 + 0.8 * ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0));
			var t = 1.0 - (-0.4 + 0.8 * ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0));
			subdivide1(A1,as3.PointCore.interpolate(G,B1,s),H,as3.PointCore.interpolate(E,D1,t));
			points.push(H);
			subdivide1(H,as3.PointCore.interpolate(F,C1,s),C1,as3.PointCore.interpolate(I,D1,t));
		};
		$r = subdivide1;
		return $r;
	}(this));
	points.push(A);
	subdivide(A,B,C,D);
	points.push(C);
	return points;
}
voronoimap.NoisyEdges.prototype = {
	buildNoisyEdges: function(map,lava,seed,noisyLineTradeoff) {
		if(noisyLineTradeoff == null) noisyLineTradeoff = 0.5;
		var p, edge;
		var _g = 0, _g1 = map.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = p1.borders;
			while(_g2 < _g3.length) {
				var edge1 = _g3[_g2];
				++_g2;
				if(edge1.d0 != null && edge1.d1 != null && edge1.v0 != null && edge1.v1 != null && this.path0[edge1.index] == null) {
					var f = noisyLineTradeoff;
					var t = as3.PointCore.interpolate(edge1.v0.point,edge1.d0.point,f);
					var q = as3.PointCore.interpolate(edge1.v0.point,edge1.d1.point,f);
					var r = as3.PointCore.interpolate(edge1.v1.point,edge1.d0.point,f);
					var s = as3.PointCore.interpolate(edge1.v1.point,edge1.d1.point,f);
					var minLength = 10;
					if(edge1.d0.biome != edge1.d1.biome) minLength = 3;
					if(edge1.d0.ocean && edge1.d1.ocean) minLength = 100;
					if(edge1.d0.coast || edge1.d1.coast) minLength = 1;
					if(as3.ConversionCore.booleanFromInt(edge1.river) || lava.lava[edge1.index] != null) minLength = 1;
					this.path0[edge1.index] = voronoimap.NoisyEdges.buildNoisyLineSegments(seed = seed * 16807.0 % 2147483647.0 | 0,edge1.v0.point,t,edge1.midpoint,q,minLength);
					this.path1[edge1.index] = voronoimap.NoisyEdges.buildNoisyLineSegments(seed = seed * 16807.0 % 2147483647.0 | 0,edge1.v1.point,s,edge1.midpoint,r,minLength);
				}
			}
		}
	}
	,__class__: voronoimap.NoisyEdges
}
voronoimap.Roads = function() {
	this.road = [];
	this.roadConnections = [];
};
voronoimap.Roads.__name__ = true;
voronoimap.Roads.prototype = {
	createRoads: function(map,elevationThresholds) {
		var queue = [];
		var p, q, r, edge, newLevel;
		var cornerContour = [];
		var centerContour = [];
		var _g = 0, _g1 = map.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			if(p1.coast || p1.ocean) {
				centerContour[p1.index] = 1;
				queue.push(p1);
			}
		}
		while(queue.length > 0) {
			p = queue.shift();
			var _g = 0, _g1 = p.neighbors;
			while(_g < _g1.length) {
				var r1 = _g1[_g];
				++_g;
				newLevel = co.janicek.core.NullCore.coalesce(centerContour[p.index],0);
				while(r1.elevation > elevationThresholds[newLevel] && !r1.water) newLevel += 1;
				if(newLevel < co.janicek.core.NullCore.coalesce(centerContour[r1.index],999)) {
					centerContour[r1.index] = newLevel;
					queue.push(r1);
				}
			}
		}
		var _g = 0, _g1 = map.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = p1.corners;
			while(_g2 < _g3.length) {
				var q1 = _g3[_g2];
				++_g2;
				cornerContour[q1.index] = Math.min(co.janicek.core.NullCore.coalesce(cornerContour[q1.index],999),co.janicek.core.NullCore.coalesce(centerContour[p1.index],999)) | 0;
			}
		}
		var _g = 0, _g1 = map.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = p1.borders;
			while(_g2 < _g3.length) {
				var edge1 = _g3[_g2];
				++_g2;
				if(edge1.v0 != null && edge1.v1 != null && cornerContour[edge1.v0.index] != cornerContour[edge1.v1.index]) {
					this.road[edge1.index] = Math.min(cornerContour[edge1.v0.index],cornerContour[edge1.v1.index]) | 0;
					if(this.roadConnections[p1.index] == null) this.roadConnections[p1.index] = new Array();
					this.roadConnections[p1.index].push(edge1);
				}
			}
		}
	}
	,__class__: voronoimap.Roads
}
voronoimap.Watersheds = function() {
	this.lowestCorner = [];
	this.watersheds = [];
};
voronoimap.Watersheds.__name__ = true;
voronoimap.Watersheds.prototype = {
	createWatersheds: function(map) {
		var p, q, s;
		var _g = 0, _g1 = map.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			s = null;
			var _g2 = 0, _g3 = p1.corners;
			while(_g2 < _g3.length) {
				var q1 = _g3[_g2];
				++_g2;
				if(s == null || q1.elevation < s.elevation) s = q1;
			}
			this.lowestCorner[p1.index] = s == null?-1:s.index;
			this.watersheds[p1.index] = s == null?-1:s.watershed == null?-1:s.watershed.index;
		}
	}
	,__class__: voronoimap.Watersheds
}
voronoimap.graph = {}
voronoimap.graph.Center = function() {
};
voronoimap.graph.Center.__name__ = true;
voronoimap.graph.Center.prototype = {
	__class__: voronoimap.graph.Center
}
voronoimap.graph.Corner = function() {
};
voronoimap.graph.Corner.__name__ = true;
voronoimap.graph.Corner.prototype = {
	__class__: voronoimap.graph.Corner
}
voronoimap.graph.Edge = function() {
};
voronoimap.graph.Edge.__name__ = true;
voronoimap.graph.Edge.prototype = {
	__class__: voronoimap.graph.Edge
}
voronoimap.html = {}
voronoimap.html.CanvasRender = function() { }
voronoimap.html.CanvasRender.__name__ = true;
voronoimap.html.CanvasRender.graphicsReset = function(c,mapWidth,mapHeight,displayColors) {
	c.lineWidth = 1.0;
	c.clearRect(0,0,2000,2000);
	c.fillStyle = "#bbbbaa";
	c.fillRect(0,0,2000,2000);
	c.fillStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(displayColors.OCEAN);
	c.fillRect(0,0,mapWidth | 0,mapHeight | 0);
}
voronoimap.html.CanvasRender.calculateLighting = function(p,r,s) {
	var A = new as3.Vector3D(p.point.x,p.point.y,p.elevation);
	var B = new as3.Vector3D(r.point.x,r.point.y,r.elevation);
	var C = new as3.Vector3D(s.point.x,s.point.y,s.elevation);
	var normal = new as3.Vector3D(B.x - A.x,B.y - A.y,B.z - A.z).crossProduct(new as3.Vector3D(C.x - A.x,C.y - A.y,C.z - A.z));
	if(normal.z < 0) {
		normal.x *= -1;
		normal.y *= -1;
		normal.z *= -1;
	}
	normal.normalize();
	var light = 0.5 + 35 * normal.dotProduct(voronoimap.html.CanvasRender.lightVector);
	if(light < 0) light = 0;
	if(light > 1) light = 1;
	return light;
}
voronoimap.html.CanvasRender.colorWithSlope = function(color,p,q,edge,displayColors) {
	var r = edge.v0;
	var s = edge.v1;
	if(r == null || s == null) return displayColors.OCEAN; else if(p.water) return color;
	if(q != null && p.water == q.water) color = co.janicek.core.html.HtmlColorCore.interpolateColor(color,Reflect.field(displayColors,q.biome),0.4);
	var colorLow = co.janicek.core.html.HtmlColorCore.interpolateColor(color,3355443,0.7);
	var colorHigh = co.janicek.core.html.HtmlColorCore.interpolateColor(color,16777215,0.3);
	var light = voronoimap.html.CanvasRender.calculateLighting(p,r,s);
	if(light < 0.5) return co.janicek.core.html.HtmlColorCore.interpolateColor(colorLow,color,light * 2); else return co.janicek.core.html.HtmlColorCore.interpolateColor(color,colorHigh,light * 2 - 1);
}
voronoimap.html.CanvasRender.renderDebugPolygons = function(context,map,displayColors) {
	var p, q, edge, point, color;
	if(map.centers.length == 0) {
		context.fillStyle = "#dddddd";
		context.fillRect(0,0,map.SIZE.width | 0,map.SIZE.height | 0);
		var _g = 0, _g1 = map.points;
		while(_g < _g1.length) {
			var point1 = _g1[_g];
			++_g;
			context.beginPath();
			context.strokeStyle = "#000000";
			context.fillStyle = "#000000";
			context.arc(point1.x,point1.y,1.3,Math.PI,2 * Math.PI,false);
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
	var _g = 0, _g1 = map.centers;
	while(_g < _g1.length) {
		var p1 = _g1[_g];
		++_g;
		color = p1.biome != null?Reflect.field(displayColors,p1.biome):p1.ocean?displayColors.OCEAN:p1.water?displayColors.RIVER:16777215;
		context.beginPath();
		var _g2 = 0, _g3 = p1.borders;
		while(_g2 < _g3.length) {
			var edge1 = _g3[_g2];
			++_g2;
			if(edge1.v0 != null && edge1.v1 != null) {
				context.moveTo(p1.point.x,p1.point.y);
				context.lineTo(edge1.v0.point.x,edge1.v0.point.y);
				context.lineTo(edge1.v1.point.x,edge1.v1.point.y);
			}
		}
		context.closePath();
		context.fillStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(co.janicek.core.html.HtmlColorCore.interpolateColor(color,14540253,0.2));
		context.fill();
		var _g2 = 0, _g3 = p1.borders;
		while(_g2 < _g3.length) {
			var edge1 = _g3[_g2];
			++_g2;
			if(edge1.v0 != null && edge1.v1 != null) {
				context.beginPath();
				context.moveTo(edge1.v0.point.x,edge1.v0.point.y);
				if(edge1.river > 0) {
					context.lineWidth = 1;
					context.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(displayColors.RIVER);
				} else {
					context.lineWidth = 0.1;
					context.strokeStyle = "#000000";
				}
				context.lineTo(edge1.v1.point.x,edge1.v1.point.y);
				context.closePath();
				context.stroke();
			}
		}
		context.beginPath();
		context.fillStyle = p1.water?"#003333":"#000000";
		context.globalAlpha = 0.7;
		context.arc(p1.point.x,p1.point.y,1.3,Math.PI,2 * Math.PI,false);
		context.closePath();
		context.fill();
		context.globalAlpha = 1.0;
		var _g2 = 0, _g3 = p1.corners;
		while(_g2 < _g3.length) {
			var q1 = _g3[_g2];
			++_g2;
			context.fillStyle = q1.water?"#0000ff":"#009900";
			context.fillRect(q1.point.x - 0.7 | 0,q1.point.y - 0.7 | 0,1,1);
		}
	}
}
voronoimap.html.CanvasRender.renderWatersheds = function(graphics,map,watersheds) {
	var edge, w0, w1;
	var _g = 0, _g1 = map.edges;
	while(_g < _g1.length) {
		var edge1 = _g1[_g];
		++_g;
		if(edge1.d0 != null && edge1.d1 != null && edge1.v0 != null && edge1.v1 != null && !edge1.d0.ocean && !edge1.d1.ocean) {
			w0 = watersheds.watersheds[edge1.d0.index];
			w1 = watersheds.watersheds[edge1.d1.index];
			if(w0 != w1) {
				graphics.beginPath();
				graphics.lineWidth = 3.5;
				graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.rgba(0,0,0,0.1 * Math.sqrt(co.janicek.core.NullCore.coalesce(map.corners[w0].watershed_size,1) + co.janicek.core.NullCore.coalesce(map.corners[w1].watershed.watershed_size,1)));
				graphics.moveTo(edge1.v0.point.x,edge1.v0.point.y);
				graphics.lineTo(edge1.v1.point.x,edge1.v1.point.y);
				graphics.closePath();
				graphics.stroke();
			}
		}
	}
	var _g = 0, _g1 = map.edges;
	while(_g < _g1.length) {
		var edge1 = _g1[_g];
		++_g;
		if(as3.ConversionCore.booleanFromInt(edge1.river)) {
			graphics.beginPath();
			graphics.lineWidth = 1.0;
			graphics.strokeStyle = "#6699ff";
			graphics.moveTo(edge1.v0.point.x,edge1.v0.point.y);
			graphics.lineTo(edge1.v1.point.x,edge1.v1.point.y);
			graphics.closePath();
			graphics.stroke();
		}
	}
}
voronoimap.html.CanvasRender.renderPolygons = function(graphics,colors,gradientFillProperty,colorOverrideFunction,map,noisyEdges) {
	var p, r;
	graphics.fillStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.OCEAN);
	graphics.fillRect(0,0,map.SIZE.width | 0,map.SIZE.height | 0);
	var _g = 0, _g1 = map.centers;
	while(_g < _g1.length) {
		var p1 = [_g1[_g]];
		++_g;
		var _g2 = 0, _g3 = p1[0].neighbors;
		while(_g2 < _g3.length) {
			var r1 = _g3[_g2];
			++_g2;
			var edge = [map.lookupEdgeFromCenter(p1[0],r1)];
			var color = co.janicek.core.NullCore.isNull(Reflect.field(colors,p1[0].biome))?0:Reflect.field(colors,p1[0].biome);
			if(colorOverrideFunction != null) color = colorOverrideFunction(color,p1[0],r1,edge[0],colors);
			var drawPath0 = (function(edge,p1) {
				return function() {
					var path = noisyEdges.path0[edge[0].index];
					graphics.moveTo(p1[0].point.x,p1[0].point.y);
					graphics.lineTo(path[0].x,path[0].y);
					voronoimap.html.CanvasRender.drawPathForwards(graphics,path);
					graphics.lineTo(p1[0].point.x,p1[0].point.y);
				};
			})(edge,p1);
			var drawPath1 = (function(edge,p1) {
				return function() {
					var path = noisyEdges.path1[edge[0].index];
					graphics.moveTo(p1[0].point.x,p1[0].point.y);
					graphics.lineTo(path[0].x,path[0].y);
					voronoimap.html.CanvasRender.drawPathForwards(graphics,path);
					graphics.lineTo(p1[0].point.x,p1[0].point.y);
				};
			})(edge,p1);
			if(noisyEdges.path0[edge[0].index] == null || noisyEdges.path1[edge[0].index] == null) continue;
			if(gradientFillProperty != null) {
				var corner0 = edge[0].v0;
				var corner1 = edge[0].v1;
				var midpoint = edge[0].midpoint;
				var midpointAttr = 0.5 * (Reflect.field(corner0,gradientFillProperty) + Reflect.field(corner1,gradientFillProperty));
				voronoimap.html.CanvasRender.drawGradientTriangle(graphics,new as3.Vector3D(p1[0].point.x,p1[0].point.y,Reflect.field(p1[0],gradientFillProperty)),new as3.Vector3D(corner0.point.x,corner0.point.y,Reflect.field(corner0,gradientFillProperty)),new as3.Vector3D(midpoint.x,midpoint.y,midpointAttr),[colors.GRADIENT_LOW,colors.GRADIENT_HIGH],drawPath0);
				voronoimap.html.CanvasRender.drawGradientTriangle(graphics,new as3.Vector3D(p1[0].point.x,p1[0].point.y,Reflect.field(p1[0],gradientFillProperty)),new as3.Vector3D(midpoint.x,midpoint.y,midpointAttr),new as3.Vector3D(corner1.point.x,corner1.point.y,Reflect.field(corner1,gradientFillProperty)),[colors.GRADIENT_LOW,colors.GRADIENT_HIGH],drawPath1);
			} else {
				graphics.fillStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(color);
				graphics.strokeStyle = graphics.fillStyle;
				graphics.beginPath();
				drawPath0();
				drawPath1();
				graphics.closePath();
				graphics.fill();
				graphics.stroke();
			}
		}
	}
}
voronoimap.html.CanvasRender.drawPathForwards = function(graphics,path) {
	var _g1 = 0, _g = path.length;
	while(_g1 < _g) {
		var i = _g1++;
		graphics.lineTo(path[i].x,path[i].y);
	}
}
voronoimap.html.CanvasRender.renderBridges = function(graphics,map,roads,colors) {
	var edge;
	var _g = 0, _g1 = map.edges;
	while(_g < _g1.length) {
		var edge1 = _g1[_g];
		++_g;
		if(edge1.river > 0 && edge1.river < 4 && !edge1.d0.water && !edge1.d1.water && (edge1.d0.elevation > 0.05 || edge1.d1.elevation > 0.05)) {
			var n = { x : -(edge1.v1.point.y - edge1.v0.point.y), y : edge1.v1.point.x - edge1.v0.point.x};
			as3.PointCore.normalize(n,0.25 + (roads.road[edge1.index] != null?0.5:0) + 0.75 * Math.sqrt(edge1.river));
			graphics.beginPath();
			graphics.lineWidth = 1.1;
			graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.BRIDGE);
			graphics.lineCap = "square";
			graphics.moveTo(edge1.midpoint.x - n.x,edge1.midpoint.y - n.y);
			graphics.lineTo(edge1.midpoint.x + n.x,edge1.midpoint.y + n.y);
			graphics.closePath();
			graphics.stroke();
		}
	}
}
voronoimap.html.CanvasRender.renderRoads = function(graphics,map,roads,colors) {
	var p, A, B, C;
	var i, j, d, edge1, edge2, edges;
	var normalTowards = function(e,c,len) {
		var n = { x : -(e.v1.point.y - e.v0.point.y), y : e.v1.point.x - e.v0.point.x};
		var d1 = as3.PointCore.subtract(c,e.midpoint);
		if(n.x * d1.x + n.y * d1.y < 0) {
			n.x = -n.x;
			n.y = -n.y;
		}
		as3.PointCore.normalize(n,len);
		return n;
	};
	var _g = 0, _g1 = map.centers;
	while(_g < _g1.length) {
		var p1 = _g1[_g];
		++_g;
		if(roads.roadConnections[p1.index] != null) {
			if(roads.roadConnections[p1.index].length == 2) {
				edges = p1.borders;
				var _g3 = 0, _g2 = edges.length;
				while(_g3 < _g2) {
					var i1 = _g3++;
					edge1 = edges[i1];
					if(roads.road[edge1.index] > 0) {
						var _g5 = i1 + 1, _g4 = edges.length;
						while(_g5 < _g4) {
							var j1 = _g5++;
							edge2 = edges[j1];
							if(roads.road[edge2.index] > 0) {
								d = 0.5 * Math.min(as3.PointCore.distanceFromOrigin(as3.PointCore.subtract(edge1.midpoint,p1.point)),as3.PointCore.distanceFromOrigin(as3.PointCore.subtract(edge2.midpoint,p1.point)));
								A = as3.PointCore.add(normalTowards(edge1,p1.point,d),edge1.midpoint);
								B = as3.PointCore.add(normalTowards(edge2,p1.point,d),edge2.midpoint);
								C = as3.PointCore.interpolate(A,B,0.5);
								graphics.beginPath();
								graphics.lineWidth = 1.1;
								graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(Reflect.field(colors,"ROAD" + roads.road[edge1.index]));
								graphics.moveTo(edge1.midpoint.x,edge1.midpoint.y);
								graphics.quadraticCurveTo(A.x,A.y,C.x,C.y);
								graphics.moveTo(C.x,C.y);
								graphics.lineWidth = 1.1;
								graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(Reflect.field(colors,"ROAD" + roads.road[edge2.index]));
								graphics.quadraticCurveTo(B.x,B.y,edge2.midpoint.x,edge2.midpoint.y);
								graphics.stroke();
								graphics.closePath();
							}
						}
					}
				}
			} else {
				var _g2 = 0, _g3 = p1.borders;
				while(_g2 < _g3.length) {
					var edge11 = _g3[_g2];
					++_g2;
					if(roads.road[edge11.index] > 0) {
						d = 0.25 * as3.PointCore.distanceFromOrigin(as3.PointCore.subtract(edge11.midpoint,p1.point));
						A = as3.PointCore.add(normalTowards(edge11,p1.point,d),edge11.midpoint);
						graphics.beginPath();
						graphics.lineWidth = 1.4;
						graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(Reflect.field(colors,"ROAD" + roads.road[edge11.index]));
						graphics.moveTo(edge11.midpoint.x,edge11.midpoint.y);
						graphics.quadraticCurveTo(A.x,A.y,p1.point.x,p1.point.y);
						graphics.stroke();
						graphics.closePath();
					}
				}
			}
		}
	}
}
voronoimap.html.CanvasRender.renderEdges = function(graphics,colors,map,noisyEdges,lava,renderRivers) {
	if(renderRivers == null) renderRivers = true;
	var p, r, edge;
	var _g = 0, _g1 = map.centers;
	while(_g < _g1.length) {
		var p1 = _g1[_g];
		++_g;
		var _g2 = 0, _g3 = p1.neighbors;
		while(_g2 < _g3.length) {
			var r1 = _g3[_g2];
			++_g2;
			edge = map.lookupEdgeFromCenter(p1,r1);
			if(noisyEdges.path0[edge.index] == null || noisyEdges.path1[edge.index] == null) continue;
			if(p1.ocean != r1.ocean) {
				graphics.lineWidth = 2;
				graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.COAST);
			} else if((p1.water?1:0) > 0 != (r1.water?1:0) > 0 && p1.biome != "ICE" && r1.biome != "ICE") {
				graphics.lineWidth = 1;
				graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.LAKESHORE);
			} else if(p1.water || r1.water) continue; else if(lava.lava[edge.index]) {
				graphics.lineWidth = 1;
				graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.LAVA);
			} else if(edge.river > 0 && renderRivers) {
				graphics.lineWidth = Math.sqrt(edge.river);
				graphics.strokeStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(colors.RIVER);
			} else continue;
			graphics.beginPath();
			graphics.moveTo(noisyEdges.path0[edge.index][0].x,noisyEdges.path0[edge.index][0].y);
			voronoimap.html.CanvasRender.drawPathForwards(graphics,noisyEdges.path0[edge.index]);
			voronoimap.html.CanvasRender.drawPathBackwards(graphics,noisyEdges.path1[edge.index]);
			graphics.stroke();
			graphics.closePath();
		}
	}
}
voronoimap.html.CanvasRender.renderAllEdges = function(graphics,strokeStyle,map,noisyEdges) {
	var p, r, edge;
	graphics.lineWidth = 5;
	graphics.strokeStyle = strokeStyle;
	var _g = 0, _g1 = map.centers;
	while(_g < _g1.length) {
		var p1 = _g1[_g];
		++_g;
		var _g2 = 0, _g3 = p1.neighbors;
		while(_g2 < _g3.length) {
			var r1 = _g3[_g2];
			++_g2;
			edge = map.lookupEdgeFromCenter(p1,r1);
			if(noisyEdges.path0[edge.index] == null || noisyEdges.path1[edge.index] == null || p1.water) continue;
			graphics.beginPath();
			graphics.moveTo(noisyEdges.path0[edge.index][0].x,noisyEdges.path0[edge.index][0].y);
			voronoimap.html.CanvasRender.drawPathForwards(graphics,noisyEdges.path0[edge.index]);
			voronoimap.html.CanvasRender.drawPathBackwards(graphics,noisyEdges.path1[edge.index]);
			graphics.stroke();
			graphics.closePath();
		}
	}
}
voronoimap.html.CanvasRender.drawPathBackwards = function(graphics,path) {
	var i = path.length - 1;
	while(i >= 0) {
		graphics.lineTo(path[i].x,path[i].y);
		i--;
	}
}
voronoimap.html.CanvasRender.drawGradientTriangle = function(graphics,v1,v2,v3,colors,fillFunction) {
	var m = new as3.Matrix();
	var V = new as3.Vector3D(v1.x + v2.x,v1.y + v2.y,v1.z + v2.z).add(v3);
	V.scaleBy(1 / 3.0);
	var N = new as3.Vector3D(v2.x - v1.x,v2.y - v1.y,v2.z - v1.z).crossProduct(new as3.Vector3D(v3.x - v1.x,v3.y - v1.y,v3.z - v1.z));
	N.normalize();
	var G = new as3.Vector3D(-N.x / N.z,-N.y / N.z,0);
	var C = new as3.Vector3D(V.x - G.x * ((V.z - 0.5) / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D())) / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D()))),V.y - G.y * ((V.z - 0.5) / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D())) / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D()))));
	if(Math.abs(as3.Vector3D.distance(G,new as3.Vector3D())) < 1e-6) {
		var color = colors[0];
		if(colors.length == 2) color = co.janicek.core.html.HtmlColorCore.interpolateColor(colors[0],colors[1],V.z); else if(colors.length == 3) {
			if(V.z < 0.5) color = co.janicek.core.html.HtmlColorCore.interpolateColor(colors[0],colors[1],V.z * 2); else color = co.janicek.core.html.HtmlColorCore.interpolateColor(colors[1],colors[2],V.z * 2 - 1);
		}
		graphics.fillStyle = co.janicek.core.html.HtmlColorCore.intToHexColor(color);
	} else {
		m.createGradientBox(1,1,0,0,0);
		m.translate(-0.5,-0.5);
		m.scale(1 / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D())),1 / Math.abs(as3.Vector3D.distance(G,new as3.Vector3D())));
		m.rotate(Math.atan2(G.y,G.x));
		m.translate(C.x,C.y);
		var alphas = colors.map(function(c) {
			return 1.0;
		});
		var spread = Lambda.mapi(colors,function(index,c) {
			return 255 * index / (colors.length - 1);
		});
	}
	fillFunction();
	graphics.fill();
}
voronoimap.html.Style = function() { }
voronoimap.html.Style.__name__ = true;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var q = window.jQuery;
js.JQuery = q;
co.janicek.core.math.PerlinNoise.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
com.nodename.delaunay.Edge._pool = new Array();
com.nodename.delaunay.Edge._nedges = 0;
com.nodename.delaunay.Edge.DELETED = new com.nodename.delaunay.Edge();
com.nodename.delaunay.Halfedge._pool = new Array();
com.nodename.delaunay.LR.LEFT = new com.nodename.delaunay.LR("left");
com.nodename.delaunay.LR.RIGHT = new com.nodename.delaunay.LR("right");
com.nodename.delaunay.Site._pool = new Array();
com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY = new com.nodename.delaunay.Vertex(Math.NaN,Math.NaN);
com.nodename.delaunay.Vertex._pool = new Array();
com.nodename.delaunay.Vertex._nvertices = 0;
com.nodename.geom.Winding.CLOCKWISE = new com.nodename.geom.Winding("clockwise");
com.nodename.geom.Winding.COUNTERCLOCKWISE = new com.nodename.geom.Winding("counterclockwise");
com.nodename.geom.Winding.NONE = new com.nodename.geom.Winding("none");
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
voronoimap.html.CanvasRender.lightVector = new as3.Vector3D(-1,-1,0);
voronoimap.html.Style.displayColors = { OCEAN : 4473978, COAST : 3355482, LAKESHORE : 2250120, LAKE : 3368601, RIVER : 2250120, MARSH : 3106406, ICE : 10092543, BEACH : 10522743, ROAD1 : 4465169, ROAD2 : 5583650, ROAD3 : 6702131, BRIDGE : 6842464, LAVA : 13382451, SNOW : 16777215, TUNDRA : 12303274, BARE : 8947848, SCORCHED : 5592405, TAIGA : 10070647, SHRUBLAND : 8952183, TEMPERATE_DESERT : 13226651, TEMPERATE_RAIN_FOREST : 4491349, TEMPERATE_DECIDUOUS_FOREST : 6788185, GRASSLAND : 8956501, SUBTROPICAL_DESERT : 13810059, TROPICAL_RAIN_FOREST : 3372885, TROPICAL_SEASONAL_FOREST : 5609796};
voronoimap.Main.main();
})();
