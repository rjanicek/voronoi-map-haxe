var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,__class__: Hash
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.prototype = {
	__class__: Lambda
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.prototype = {
	__class__: Reflect
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.prototype = {
	__class__: Std
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
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
StringTools.prototype = {
	__class__: StringTools
}
var as3 = as3 || {}
if(!as3.ac3core) as3.ac3core = {}
as3.ac3core.BitmapDataCore = $hxClasses["as3.ac3core.BitmapDataCore"] = function() { }
as3.ac3core.BitmapDataCore.__name__ = ["as3","ac3core","BitmapDataCore"];
as3.ac3core.BitmapDataCore.dispose = function(bd) {
}
as3.ac3core.BitmapDataCore.drawLine = function(bd,a,b) {
	throw "not implemented";
	return null;
}
as3.ac3core.BitmapDataCore.prototype = {
	__class__: as3.ac3core.BitmapDataCore
}
as3.ac3core.ConversionCore = $hxClasses["as3.ac3core.ConversionCore"] = function() { }
as3.ac3core.ConversionCore.__name__ = ["as3","ac3core","ConversionCore"];
as3.ac3core.ConversionCore.intFromBoolean = function(b) {
	return b?1:0;
}
as3.ac3core.ConversionCore.booleanFromInt = function(i) {
	return i == null?false:i > 0;
}
as3.ac3core.ConversionCore.isNull = function(d) {
	return d == null;
}
as3.ac3core.ConversionCore.isNotNull = function(d) {
	return d != null;
}
as3.ac3core.ConversionCore.prototype = {
	__class__: as3.ac3core.ConversionCore
}
as3.ac3core.Matrix = $hxClasses["as3.ac3core.Matrix"] = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null?1.0:in_a;
	this.b = in_b == null?0.0:in_b;
	this.c = in_c == null?0.0:in_c;
	this.d = in_d == null?1.0:in_d;
	this.tx = in_tx == null?0.0:in_tx;
	this.ty = in_ty == null?0.0:in_ty;
};
as3.ac3core.Matrix.__name__ = ["as3","ac3core","Matrix"];
as3.ac3core.Matrix.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
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
	,translate: function(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
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
	,scale: function(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
	}
	,__class__: as3.ac3core.Matrix
}
as3.ac3core.PointCore = $hxClasses["as3.ac3core.PointCore"] = function() { }
as3.ac3core.PointCore.__name__ = ["as3","ac3core","PointCore"];
as3.ac3core.PointCore.distanceFromOrigin = function(p) {
	return as3.ac3core.PointCore.distance({ x : 0.0, y : 0.0},p);
}
as3.ac3core.PointCore.distance = function(a,b) {
	return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));
}
as3.ac3core.PointCore.interpolate = function(pt1,pt2,f) {
	return { x : (pt1.x - pt2.x) * f + pt2.x, y : (pt1.y - pt2.y) * f + pt2.y};
}
as3.ac3core.PointCore.subtract = function(p0,p1) {
	return { x : p0.x - p1.x, y : p0.y - p1.y};
}
as3.ac3core.PointCore.hash = function(p) {
	return p.x + "," + p.y;
}
as3.ac3core.PointCore.prototype = {
	__class__: as3.ac3core.PointCore
}
as3.ac3core.RectangleCore = $hxClasses["as3.ac3core.RectangleCore"] = function() { }
as3.ac3core.RectangleCore.__name__ = ["as3","ac3core","RectangleCore"];
as3.ac3core.RectangleCore.left = function(r) {
	return r.x;
}
as3.ac3core.RectangleCore.right = function(r) {
	return r.x + r.width;
}
as3.ac3core.RectangleCore.top = function(r) {
	return r.y;
}
as3.ac3core.RectangleCore.bottom = function(r) {
	return r.y + r.height;
}
as3.ac3core.RectangleCore.prototype = {
	__class__: as3.ac3core.RectangleCore
}
as3.ac3core.Vector3D = $hxClasses["as3.ac3core.Vector3D"] = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
as3.ac3core.Vector3D.__name__ = ["as3","ac3core","Vector3D"];
as3.ac3core.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
}
as3.ac3core.Vector3D.getX_AXIS = function() {
	return new as3.ac3core.Vector3D(1,0,0);
}
as3.ac3core.Vector3D.getY_AXIS = function() {
	return new as3.ac3core.Vector3D(0,1,0);
}
as3.ac3core.Vector3D.getZ_AXIS = function() {
	return new as3.ac3core.Vector3D(0,0,1);
}
as3.ac3core.Vector3D.prototype = {
	length: null
	,getLength: function() {
		return Math.abs(as3.ac3core.Vector3D.distance(this,new as3.ac3core.Vector3D()));
	}
	,getLengthSquared: function() {
		return Math.abs(as3.ac3core.Vector3D.distance(this,new as3.ac3core.Vector3D())) * Math.abs(as3.ac3core.Vector3D.distance(this,new as3.ac3core.Vector3D()));
	}
	,w: null
	,x: null
	,y: null
	,z: null
	,add: function(a) {
		return new as3.ac3core.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,crossProduct: function(a) {
		return new as3.ac3core.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,normalize: function() {
		var l = Math.abs(as3.ac3core.Vector3D.distance(this,new as3.ac3core.Vector3D()));
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,subtract: function(a) {
		return new as3.ac3core.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,__class__: as3.ac3core.Vector3D
	,__properties__: {get_length:"getLength"}
}
if(!as3.as3types) as3.as3types = {}
as3.as3types.Rectangle = $hxClasses["as3.as3types.Rectangle"] = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
as3.as3types.Rectangle.__name__ = ["as3","as3types","Rectangle"];
as3.as3types.Rectangle.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,__class__: as3.as3types.Rectangle
}
var co = co || {}
if(!co.janicek) co.janicek = {}
if(!co.janicek.core) co.janicek.core = {}
co.janicek.core.StringCore = $hxClasses["co.janicek.core.StringCore"] = function() { }
co.janicek.core.StringCore.__name__ = ["co","janicek","core","StringCore"];
co.janicek.core.StringCore.contains = function(string,pattern) {
	return string.indexOf(pattern) != -1;
}
co.janicek.core.StringCore.isInteger = function(s) {
	if(co.janicek.core.StringCore.contains(s,".")) return false;
	return Std.parseInt(s) != null;
}
co.janicek.core.StringCore.prototype = {
	__class__: co.janicek.core.StringCore
}
if(!co.janicek.core.array) co.janicek.core.array = {}
co.janicek.core.array.Array2dCore = $hxClasses["co.janicek.core.array.Array2dCore"] = function() { }
co.janicek.core.array.Array2dCore.__name__ = ["co","janicek","core","array","Array2dCore"];
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
co.janicek.core.array.Array2dCore.dimensions = function(array) {
	var height = array.length;
	var width = 0;
	co.janicek.core.array.Array2dCore.foreachY(array,function(y) {
		width = Math.max(width,y.length);
	});
	return { x : width, y : height};
}
co.janicek.core.array.Array2dCore.prototype = {
	__class__: co.janicek.core.array.Array2dCore
}
if(!co.janicek.core.html) co.janicek.core.html = {}
co.janicek.core.html.CanvasCore = $hxClasses["co.janicek.core.html.CanvasCore"] = function() { }
co.janicek.core.html.CanvasCore.__name__ = ["co","janicek","core","html","CanvasCore"];
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
		delta = co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel);
		var newColors = { red : null, green : null, blue : null, alpha : null};
		if(changeRed) newColors.red = red + delta;
		if(changeGreen) newColors.green = green + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel));
		if(changeBlue) newColors.blue = blue + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel));
		if(changeAlpha) newColors.alpha = alpha + co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel);
		return newColors;
	});
	return pixelData;
}
co.janicek.core.html.CanvasCore.addNoiseToCanvas = function(context,width,height,randomSeed,noiseLevel,grayScale,red,green,blue,alpha) {
	if(alpha == null) alpha = false;
	if(blue == null) blue = true;
	if(green == null) green = true;
	if(red == null) red = true;
	if(grayScale == null) grayScale = false;
	var imageData = context.getImageData(0,0,width,height);
	imageData = co.janicek.core.html.CanvasCore.addNoise(imageData,randomSeed,noiseLevel,grayScale,red,green,blue,alpha);
	context.putImageData(imageData,0,0);
}
co.janicek.core.html.CanvasCore.loadImage = function(url,f) {
	var image = js.Lib.document.createElement("img");
	image.onload = function() {
		f(image);
	};
	image.src = url;
}
co.janicek.core.html.CanvasCore.getImageData = function(image) {
	var canvas = js.Lib.document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image,0,0);
	var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	return imageData;
}
co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap = function(imageData,threshold,invert) {
	if(invert == null) invert = false;
	threshold = co.janicek.core.math.MathCore.clampInt(threshold,0,255);
	return co.janicek.core.html.CanvasCore.makeBitmap(imageData,function(red,green,blue,alpha) {
		return invert?co.janicek.core.math.MathCore.averageInt([red,green,blue]) < threshold:co.janicek.core.math.MathCore.averageInt([red,green,blue]) > threshold;
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
co.janicek.core.html.CanvasCore.prototype = {
	__class__: co.janicek.core.html.CanvasCore
}
co.janicek.core.html.ColorPure = $hxClasses["co.janicek.core.html.ColorPure"] = function() { }
co.janicek.core.html.ColorPure.__name__ = ["co","janicek","core","html","ColorPure"];
co.janicek.core.html.ColorPure.interpolateColor = function(color0,color1,f) {
	var r = (1 - f) * (color0 >> 16) + f * (color1 >> 16) | 0;
	var g = (1 - f) * (color0 >> 8 & 255) + f * (color1 >> 8 & 255) | 0;
	var b = (1 - f) * (color0 & 255) + f * (color1 & 255) | 0;
	if(r > 255) r = 255;
	if(g > 255) g = 255;
	if(b > 255) b = 255;
	return r << 16 | g << 8 | b;
}
co.janicek.core.html.ColorPure.toHtmlColor = function(color) {
	return "#" + StringTools.hex(color);
}
co.janicek.core.html.ColorPure.prototype = {
	__class__: co.janicek.core.html.ColorPure
}
if(!co.janicek.core.math) co.janicek.core.math = {}
co.janicek.core.math.HashCore = $hxClasses["co.janicek.core.math.HashCore"] = function() { }
co.janicek.core.math.HashCore.__name__ = ["co","janicek","core","math","HashCore"];
co.janicek.core.math.HashCore.djb2 = function(s) {
	var hash = 5381;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) + hash + s.charCodeAt(i);
	}
	return hash;
}
co.janicek.core.math.HashCore.prototype = {
	__class__: co.janicek.core.math.HashCore
}
co.janicek.core.math.MathCore = $hxClasses["co.janicek.core.math.MathCore"] = function() { }
co.janicek.core.math.MathCore.__name__ = ["co","janicek","core","math","MathCore"];
co.janicek.core.math.MathCore.clampInt = function(value,min,max) {
	return value < min?0:value > max?max:value;
}
co.janicek.core.math.MathCore.averageInt = function(numbers) {
	return Lambda.fold(numbers,function(number,total) {
		return total + number;
	},0) / numbers.length;
}
co.janicek.core.math.MathCore.prototype = {
	__class__: co.janicek.core.math.MathCore
}
co.janicek.core.math.PerlinNoise = $hxClasses["co.janicek.core.math.PerlinNoise"] = function() { }
co.janicek.core.math.PerlinNoise.__name__ = ["co","janicek","core","math","PerlinNoise"];
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
co.janicek.core.math.PerlinNoise.prototype = {
	__class__: co.janicek.core.math.PerlinNoise
}
co.janicek.core.math.RandomCore = $hxClasses["co.janicek.core.math.RandomCore"] = function() { }
co.janicek.core.math.RandomCore.__name__ = ["co","janicek","core","math","RandomCore"];
co.janicek.core.math.RandomCore.makeRandomSeed = function() {
	return Math.floor(Math.random() * 2147483647.0);
}
co.janicek.core.math.RandomCore.nextParkMiller = function(seed) {
	return seed * 16807.0 % 2147483647.0;
}
co.janicek.core.math.RandomCore.toFloat = function(seed) {
	return seed / 2147483647.0;
}
co.janicek.core.math.RandomCore.toIntRange = function(seed,min,max) {
	return Math.round(min - 0.4999 + (max + 0.4999 - (min - 0.4999)) * (seed / 2147483647.0));
}
co.janicek.core.math.RandomCore.stringToSeed = function(s) {
	return co.janicek.core.math.HashCore.djb2(s) % 2147483647.0 | 0;
}
co.janicek.core.math.RandomCore.prototype = {
	__class__: co.janicek.core.math.RandomCore
}
var com = com || {}
if(!com.nodename) com.nodename = {}
if(!com.nodename.delaunay) com.nodename.delaunay = {}
com.nodename.delaunay.BoundsCheck = $hxClasses["com.nodename.delaunay.BoundsCheck"] = function() { }
com.nodename.delaunay.BoundsCheck.__name__ = ["com","nodename","delaunay","BoundsCheck"];
com.nodename.delaunay.BoundsCheck.check = function(point,bounds) {
	var value = 0;
	if(point.x == as3.ac3core.RectangleCore.left(bounds)) value |= 4;
	if(point.x == as3.ac3core.RectangleCore.right(bounds)) value |= 8;
	if(point.y == as3.ac3core.RectangleCore.top(bounds)) value |= 1;
	if(point.y == as3.ac3core.RectangleCore.bottom(bounds)) value |= 2;
	return value;
}
com.nodename.delaunay.BoundsCheck.prototype = {
	__class__: com.nodename.delaunay.BoundsCheck
}
com.nodename.delaunay.Edge = $hxClasses["com.nodename.delaunay.Edge"] = function() {
	this._edgeIndex = com.nodename.delaunay.Edge._nedges++;
	this.init();
};
com.nodename.delaunay.Edge.__name__ = ["com","nodename","delaunay","Edge"];
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
	_delaunayLineBmp: null
	,getDelaunayLineBmp: function() {
		if(this._delaunayLineBmp == null) this._delaunayLineBmp = this.makeDelaunayLineBmp();
		return this._delaunayLineBmp;
	}
	,makeDelaunayLineBmp: function() {
		throw "unimplemented";
		var p0 = this.leftSite._coord;
		var p1 = this.rightSite._coord;
		var w = Math.ceil(Math.max(p0.x,p1.x)) | 0;
		if(w < 1) w = 1;
		var h = Math.ceil(Math.max(p0.y,p1.y)) | 0;
		if(h < 1) h = 1;
		var bmp = new Array();
		as3.ac3core.BitmapDataCore.drawLine(bmp,p0,p1);
		return bmp;
	}
	,delaunayLine: function() {
		return new com.nodename.geom.LineSegment(this.leftSite._coord,this.rightSite._coord);
	}
	,voronoiEdge: function() {
		if(!(this.clippedEnds != null)) return new com.nodename.geom.LineSegment(null,null);
		return new com.nodename.geom.LineSegment(this.clippedEnds.get(com.nodename.delaunay.LR.LEFT.toString()),this.clippedEnds.get(com.nodename.delaunay.LR.RIGHT.toString()));
	}
	,a: null
	,b: null
	,c: null
	,leftVertex: null
	,rightVertex: null
	,setVertex: function(leftRight,v) {
		if(leftRight == com.nodename.delaunay.LR.LEFT) this.leftVertex = v; else this.rightVertex = v;
	}
	,clippedEnds: null
	,visible: null
	,getVisible: function() {
		return this.clippedEnds != null;
	}
	,leftSite: null
	,rightSite: null
	,site: function(leftRight) {
		return leftRight == com.nodename.delaunay.LR.LEFT?this.leftSite:this.rightSite;
	}
	,_edgeIndex: null
	,dispose: function() {
		if(this._delaunayLineBmp != null) {
			as3.ac3core.BitmapDataCore.dispose(this._delaunayLineBmp);
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
	,init: function() {
		this.leftSite = null;
		this.rightSite = null;
	}
	,clipVertices: function(bounds) {
		var xmin = bounds.x;
		var ymin = bounds.y;
		var xmax = as3.ac3core.RectangleCore.right(bounds);
		var ymax = as3.ac3core.RectangleCore.bottom(bounds);
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
		this.clippedEnds = new Hash();
		if(vertex0 == this.leftVertex) {
			this.clippedEnds.set(com.nodename.delaunay.LR.LEFT.toString(),{ x : x0, y : y0});
			this.clippedEnds.set(com.nodename.delaunay.LR.RIGHT.toString(),{ x : x1, y : y1});
		} else {
			this.clippedEnds.set(com.nodename.delaunay.LR.RIGHT.toString(),{ x : x0, y : y0});
			this.clippedEnds.set(com.nodename.delaunay.LR.LEFT.toString(),{ x : x1, y : y1});
		}
	}
	,__class__: com.nodename.delaunay.Edge
	,__properties__: {get_visible:"getVisible"}
}
if(!com.nodename.utils) com.nodename.utils = {}
com.nodename.utils.IDisposable = $hxClasses["com.nodename.utils.IDisposable"] = function() { }
com.nodename.utils.IDisposable.__name__ = ["com","nodename","utils","IDisposable"];
com.nodename.utils.IDisposable.prototype = {
	dispose: null
	,__class__: com.nodename.utils.IDisposable
}
com.nodename.delaunay.EdgeList = $hxClasses["com.nodename.delaunay.EdgeList"] = function(xmin,deltax,sqrt_nsites) {
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
com.nodename.delaunay.EdgeList.__name__ = ["com","nodename","delaunay","EdgeList"];
com.nodename.delaunay.EdgeList.__interfaces__ = [com.nodename.utils.IDisposable];
com.nodename.delaunay.EdgeList.prototype = {
	_deltax: null
	,_xmin: null
	,_hashsize: null
	,_hash: null
	,_leftEnd: null
	,leftEnd: null
	,getLeftEnd: function() {
		return this._leftEnd;
	}
	,_rightEnd: null
	,rightEnd: null
	,getRightEnd: function() {
		return this._rightEnd;
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
	,insert: function(lb,newHalfedge) {
		newHalfedge.edgeListLeftNeighbor = lb;
		newHalfedge.edgeListRightNeighbor = lb.edgeListRightNeighbor;
		lb.edgeListRightNeighbor.edgeListLeftNeighbor = newHalfedge;
		lb.edgeListRightNeighbor = newHalfedge;
	}
	,remove: function(halfEdge) {
		halfEdge.edgeListLeftNeighbor.edgeListRightNeighbor = halfEdge.edgeListRightNeighbor;
		halfEdge.edgeListRightNeighbor.edgeListLeftNeighbor = halfEdge.edgeListLeftNeighbor;
		halfEdge.edge = com.nodename.delaunay.Edge.DELETED;
		halfEdge.edgeListLeftNeighbor = halfEdge.edgeListRightNeighbor = null;
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
	,getHash: function(b) {
		var halfEdge;
		if(b < 0 || b >= this._hashsize) return null;
		halfEdge = this._hash[b];
		if(halfEdge != null && halfEdge.edge == com.nodename.delaunay.Edge.DELETED) {
			this._hash[b] = null;
			return null;
		} else return halfEdge;
	}
	,__class__: com.nodename.delaunay.EdgeList
	,__properties__: {get_rightEnd:"getRightEnd",get_leftEnd:"getLeftEnd"}
}
com.nodename.delaunay.Criterion = $hxClasses["com.nodename.delaunay.Criterion"] = { __ename__ : ["com","nodename","delaunay","Criterion"], __constructs__ : ["vertex","site"] }
com.nodename.delaunay.Criterion.vertex = ["vertex",0];
com.nodename.delaunay.Criterion.vertex.toString = $estr;
com.nodename.delaunay.Criterion.vertex.__enum__ = com.nodename.delaunay.Criterion;
com.nodename.delaunay.Criterion.site = ["site",1];
com.nodename.delaunay.Criterion.site.toString = $estr;
com.nodename.delaunay.Criterion.site.__enum__ = com.nodename.delaunay.Criterion;
com.nodename.delaunay.EdgeReorderer = $hxClasses["com.nodename.delaunay.EdgeReorderer"] = function(origEdges,criterion) {
	if(criterion != com.nodename.delaunay.Criterion.vertex && criterion != com.nodename.delaunay.Criterion.site) throw "Edges: criterion must be Vertex or Site";
	this.edges = new Array();
	this.edgeOrientations = new Array();
	if(origEdges.length > 0) this.edges = this.reorderEdges(origEdges,criterion);
};
com.nodename.delaunay.EdgeReorderer.__name__ = ["com","nodename","delaunay","EdgeReorderer"];
com.nodename.delaunay.EdgeReorderer.prototype = {
	edges: null
	,edgeOrientations: null
	,dispose: function() {
		this.edges = null;
		this.edgeOrientations = null;
	}
	,reorderEdges: function(origEdges,criterion) {
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
	,__class__: com.nodename.delaunay.EdgeReorderer
}
com.nodename.delaunay.Halfedge = $hxClasses["com.nodename.delaunay.Halfedge"] = function(edge,lr) {
	this.init(edge,lr);
};
com.nodename.delaunay.Halfedge.__name__ = ["com","nodename","delaunay","Halfedge"];
com.nodename.delaunay.Halfedge.create = function(edge,lr) {
	if(com.nodename.delaunay.Halfedge._pool.length > 0) return com.nodename.delaunay.Halfedge._pool.pop().init(edge,lr); else return new com.nodename.delaunay.Halfedge(edge,lr);
}
com.nodename.delaunay.Halfedge.createDummy = function() {
	return com.nodename.delaunay.Halfedge.create(null,null);
}
com.nodename.delaunay.Halfedge.prototype = {
	edgeListLeftNeighbor: null
	,edgeListRightNeighbor: null
	,nextInPriorityQueue: null
	,edge: null
	,leftRight: null
	,vertex: null
	,ystar: null
	,init: function(edge,lr) {
		this.edge = edge;
		this.leftRight = lr;
		this.nextInPriorityQueue = null;
		this.vertex = null;
		return this;
	}
	,dispose: function() {
		if(this.edgeListLeftNeighbor != null || this.edgeListRightNeighbor != null) return;
		if(this.nextInPriorityQueue != null) return;
		this.edge = null;
		this.leftRight = null;
		this.vertex = null;
		com.nodename.delaunay.Halfedge._pool.push(this);
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
	,isLeftOf: function(p) {
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
	,__class__: com.nodename.delaunay.Halfedge
}
com.nodename.delaunay.HalfedgePriorityQueue = $hxClasses["com.nodename.delaunay.HalfedgePriorityQueue"] = function(ymin,deltay,sqrt_nsites) {
	this._ymin = ymin;
	this._deltay = deltay;
	this._hashsize = 4 * sqrt_nsites;
	this.initialize();
};
com.nodename.delaunay.HalfedgePriorityQueue.__name__ = ["com","nodename","delaunay","HalfedgePriorityQueue"];
com.nodename.delaunay.HalfedgePriorityQueue.prototype = {
	_hash: null
	,_count: null
	,_minBucket: null
	,_hashsize: null
	,_ymin: null
	,_deltay: null
	,dispose: function() {
		var _g1 = 0, _g = this._hashsize;
		while(_g1 < _g) {
			var i = _g1++;
			this._hash[i].dispose();
			this._hash[i] = null;
		}
		this._hash = null;
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
	,bucket: function(halfEdge) {
		var theBucket = (halfEdge.ystar - this._ymin) / this._deltay * this._hashsize | 0;
		if(theBucket < 0) theBucket = 0;
		if(theBucket >= this._hashsize) theBucket = this._hashsize - 1;
		return theBucket;
	}
	,isEmpty: function(bucket) {
		return this._hash[bucket].nextInPriorityQueue == null;
	}
	,adjustMinBucket: function() {
		while(this._minBucket < this._hashsize - 1 && this.isEmpty(this._minBucket)) ++this._minBucket;
	}
	,empty: function() {
		return this._count == 0;
	}
	,min: function() {
		this.adjustMinBucket();
		var answer = this._hash[this._minBucket].nextInPriorityQueue;
		return { x : answer.vertex._coord.x, y : answer.ystar};
	}
	,extractMin: function() {
		var answer;
		answer = this._hash[this._minBucket].nextInPriorityQueue;
		this._hash[this._minBucket].nextInPriorityQueue = answer.nextInPriorityQueue;
		this._count--;
		answer.nextInPriorityQueue = null;
		return answer;
	}
	,__class__: com.nodename.delaunay.HalfedgePriorityQueue
}
com.nodename.delaunay.ICoord = $hxClasses["com.nodename.delaunay.ICoord"] = function() { }
com.nodename.delaunay.ICoord.__name__ = ["com","nodename","delaunay","ICoord"];
com.nodename.delaunay.ICoord.prototype = {
	coord: null
	,get_coord: null
	,__class__: com.nodename.delaunay.ICoord
	,__properties__: {get_coord:"get_coord"}
}
com.nodename.delaunay.LR = $hxClasses["com.nodename.delaunay.LR"] = function(name) {
	this._name = name;
};
com.nodename.delaunay.LR.__name__ = ["com","nodename","delaunay","LR"];
com.nodename.delaunay.LR.other = function(leftRight) {
	return leftRight == com.nodename.delaunay.LR.LEFT?com.nodename.delaunay.LR.RIGHT:com.nodename.delaunay.LR.LEFT;
}
com.nodename.delaunay.LR.prototype = {
	_name: null
	,toString: function() {
		return this._name;
	}
	,__class__: com.nodename.delaunay.LR
}
com.nodename.delaunay.Site = $hxClasses["com.nodename.delaunay.Site"] = function(p,index,weight,color) {
	this.init(p,index,weight,color);
};
com.nodename.delaunay.Site.__name__ = ["com","nodename","delaunay","Site"];
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
	return as3.ac3core.PointCore.distance(p0,p1) < .005;
}
com.nodename.delaunay.Site.prototype = {
	coord: null
	,_coord: null
	,get_coord: function() {
		return this._coord;
	}
	,color: null
	,weight: null
	,_siteIndex: null
	,_edges: null
	,get_edges: function() {
		return this._edges;
	}
	,_edgeOrientations: null
	,_region: null
	,init: function(p,index,weight,color) {
		this._coord = p;
		this._siteIndex = index;
		this.weight = weight;
		this.color = color;
		this._edges = new Array();
		this._region = null;
		return this;
	}
	,dispose: function() {
		this._coord = null;
		this.clear();
		com.nodename.delaunay.Site._pool.push(this);
	}
	,clear: function() {
		if(this._edges != null) this._edges = null;
		if(this._edgeOrientations != null) this._edgeOrientations = null;
		if(this._region != null) this._region = null;
	}
	,addEdge: function(edge) {
		this._edges.push(edge);
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
	,reorderEdges: function() {
		var reorderer = new com.nodename.delaunay.EdgeReorderer(this._edges,com.nodename.delaunay.Criterion.vertex);
		this._edges = reorderer.edges;
		this._edgeOrientations = reorderer.edgeOrientations;
		reorderer.dispose();
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
					px = as3.ac3core.RectangleCore.right(bounds);
					if((newCheck & 2) != 0) {
						py = as3.ac3core.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						py = as3.ac3core.RectangleCore.top(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						if(rightPoint.y - bounds.y + newPoint.y - bounds.y < bounds.height) py = as3.ac3core.RectangleCore.top(bounds); else py = as3.ac3core.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
						points.push({ x : as3.ac3core.RectangleCore.left(bounds), y : py});
					}
				} else if((rightCheck & 4) != 0) {
					px = as3.ac3core.RectangleCore.left(bounds);
					if((newCheck & 2) != 0) {
						py = as3.ac3core.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						py = as3.ac3core.RectangleCore.top(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 8) != 0) {
						if(rightPoint.y - bounds.y + newPoint.y - bounds.y < bounds.height) py = as3.ac3core.RectangleCore.top(bounds); else py = as3.ac3core.RectangleCore.bottom(bounds);
						points.push({ x : px, y : py});
						points.push({ x : as3.ac3core.RectangleCore.right(bounds), y : py});
					}
				} else if((rightCheck & 1) != 0) {
					py = as3.ac3core.RectangleCore.top(bounds);
					if((newCheck & 8) != 0) {
						px = as3.ac3core.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						px = as3.ac3core.RectangleCore.left(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 2) != 0) {
						if(rightPoint.x - bounds.x + newPoint.x - bounds.x < bounds.width) px = as3.ac3core.RectangleCore.left(bounds); else px = as3.ac3core.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
						points.push({ x : px, y : as3.ac3core.RectangleCore.bottom(bounds)});
					}
				} else if((rightCheck & 2) != 0) {
					py = as3.ac3core.RectangleCore.bottom(bounds);
					if((newCheck & 8) != 0) {
						px = as3.ac3core.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 4) != 0) {
						px = as3.ac3core.RectangleCore.left(bounds);
						points.push({ x : px, y : py});
					} else if((newCheck & 1) != 0) {
						if(rightPoint.x - bounds.x + newPoint.x - bounds.x < bounds.width) px = as3.ac3core.RectangleCore.left(bounds); else px = as3.ac3core.RectangleCore.right(bounds);
						points.push({ x : px, y : py});
						points.push({ x : px, y : as3.ac3core.RectangleCore.top(bounds)});
					}
				}
			}
			if(closingUp) return;
			points.push(newPoint);
		}
		var newRightPoint = newEdge.clippedEnds.get(com.nodename.delaunay.LR.other(newOrientation).toString());
		if(!com.nodename.delaunay.Site.closeEnough(points[0],newRightPoint)) points.push(newRightPoint);
	}
	,x: null
	,getX: function() {
		return this._coord.x;
	}
	,y: null
	,getY: function() {
		return this._coord.y;
	}
	,dist: function(p) {
		return as3.ac3core.PointCore.distance(p.get_coord(),this._coord);
	}
	,__class__: com.nodename.delaunay.Site
	,__properties__: {get_y:"getY",get_x:"getX",get_coord:"get_coord"}
}
com.nodename.delaunay.SiteList = $hxClasses["com.nodename.delaunay.SiteList"] = function() {
	this._sites = new Array();
	this._sorted = false;
};
com.nodename.delaunay.SiteList.__name__ = ["com","nodename","delaunay","SiteList"];
com.nodename.delaunay.SiteList.__interfaces__ = [com.nodename.utils.IDisposable];
com.nodename.delaunay.SiteList.prototype = {
	_sites: null
	,_currentIndex: null
	,_sorted: null
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
	,push: function(site) {
		this._sorted = false;
		return this._sites.push(site);
	}
	,length: null
	,getLength: function() {
		return this._sites.length;
	}
	,next: function() {
		if(this._sorted == false) throw "SiteList::next():  sites have not been sorted";
		if(this._currentIndex < this._sites.length) return this._sites[this._currentIndex++]; else return null;
	}
	,getSitesBounds: function() {
		if(this._sorted == false) {
			com.nodename.delaunay.Site.sortSites(this._sites);
			this._currentIndex = 0;
			this._sorted = true;
		}
		var xmin, xmax, ymin, ymax;
		if(this._sites.length == 0) return new as3.as3types.Rectangle(0,0,0,0);
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
		return new as3.as3types.Rectangle(xmin,ymin,xmax - xmin,ymax - ymin);
	}
	,__class__: com.nodename.delaunay.SiteList
	,__properties__: {get_length:"getLength"}
}
com.nodename.delaunay.Triangle = $hxClasses["com.nodename.delaunay.Triangle"] = function() { }
com.nodename.delaunay.Triangle.__name__ = ["com","nodename","delaunay","Triangle"];
com.nodename.delaunay.Triangle.prototype = {
	_sites: null
	,get_sites: function() {
		return this._sites;
	}
	,dispose: function() {
		this._sites = null;
	}
	,__class__: com.nodename.delaunay.Triangle
}
com.nodename.delaunay.Vertex = $hxClasses["com.nodename.delaunay.Vertex"] = function(x,y) {
	this.init(x,y);
};
com.nodename.delaunay.Vertex.__name__ = ["com","nodename","delaunay","Vertex"];
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
	_coord: null
	,coord: null
	,get_coord: function() {
		return this._coord;
	}
	,vertexIndex: null
	,init: function(x,y) {
		this._coord = { x : x, y : y};
		return this;
	}
	,dispose: function() {
		this._coord = null;
		com.nodename.delaunay.Vertex._pool.push(this);
	}
	,setIndex: function() {
		this.vertexIndex = com.nodename.delaunay.Vertex._nvertices++;
	}
	,x: null
	,getX: function() {
		return this._coord.x;
	}
	,y: null
	,getY: function() {
		return this._coord.y;
	}
	,__class__: com.nodename.delaunay.Vertex
	,__properties__: {get_y:"getY",get_x:"getX",get_coord:"get_coord"}
}
com.nodename.delaunay.Voronoi = $hxClasses["com.nodename.delaunay.Voronoi"] = function(points,colors,plotBounds) {
	this.makeSureNoDuplicatePoints(points);
	(this._prng = new de.polygonal.math.PM_PRNG()).seed = 1;
	this._sites = new com.nodename.delaunay.SiteList();
	this._sitesIndexedByLocation = new Hash();
	this.addSites(points,colors);
	this.plotBounds = plotBounds;
	this._triangles = new Array();
	this._edges = new Array();
	this.fortunesAlgorithm();
};
com.nodename.delaunay.Voronoi.__name__ = ["com","nodename","delaunay","Voronoi"];
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
	_prng: null
	,_sites: null
	,_sitesIndexedByLocation: null
	,_triangles: null
	,_edges: null
	,plotBounds: null
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
	,makeSureNoDuplicatePoints: function(points) {
		var h = new Hash();
		var _g = 0;
		while(_g < points.length) {
			var p = points[_g];
			++_g;
			if(h.exists(as3.ac3core.PointCore.hash(p))) throw "Duplicate points not supported yet!";
			h.set(as3.ac3core.PointCore.hash(p),p);
		}
	}
	,addSites: function(points,colors) {
		var length = points.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			this.addSite(points[i],colors != null?colors[i]:0,i);
		}
	}
	,addSite: function(p,color,index) {
		var weight = this._prng.nextDouble() * 100;
		var site = com.nodename.delaunay.Site.create(p,index,weight,color);
		this._sites.push(site);
		this._sitesIndexedByLocation.set(as3.ac3core.PointCore.hash(p),site);
	}
	,edges: function() {
		return this._edges;
	}
	,region: function(p) {
		var site = this._sitesIndexedByLocation.get(as3.ac3core.PointCore.hash(p));
		if(site == null) return new Array();
		return site.region(this.plotBounds);
	}
	,fortunesAlgorithm: function() {
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
	,__class__: com.nodename.delaunay.Voronoi
}
if(!com.nodename.geom) com.nodename.geom = {}
com.nodename.geom.LineSegment = $hxClasses["com.nodename.geom.LineSegment"] = function(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
};
com.nodename.geom.LineSegment.__name__ = ["com","nodename","geom","LineSegment"];
com.nodename.geom.LineSegment.prototype = {
	p0: null
	,p1: null
	,__class__: com.nodename.geom.LineSegment
}
com.nodename.geom.Polygon = $hxClasses["com.nodename.geom.Polygon"] = function(vertices) {
	this._vertices = vertices;
};
com.nodename.geom.Polygon.__name__ = ["com","nodename","geom","Polygon"];
com.nodename.geom.Polygon.prototype = {
	_vertices: null
	,winding: function() {
		var signedDoubleArea = this.signedDoubleArea();
		if(signedDoubleArea < 0) return com.nodename.geom.Winding.CLOCKWISE;
		if(signedDoubleArea > 0) return com.nodename.geom.Winding.COUNTERCLOCKWISE;
		return com.nodename.geom.Winding.NONE;
	}
	,signedDoubleArea: function() {
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
	,__class__: com.nodename.geom.Polygon
}
com.nodename.geom.Winding = $hxClasses["com.nodename.geom.Winding"] = function(name) {
	this._name = name;
};
com.nodename.geom.Winding.__name__ = ["com","nodename","geom","Winding"];
com.nodename.geom.Winding.prototype = {
	_name: null
	,__class__: com.nodename.geom.Winding
}
var de = de || {}
if(!de.polygonal) de.polygonal = {}
if(!de.polygonal.math) de.polygonal.math = {}
de.polygonal.math.PM_PRNG = $hxClasses["de.polygonal.math.PM_PRNG"] = function() {
	this.seed = 1;
};
de.polygonal.math.PM_PRNG.__name__ = ["de","polygonal","math","PM_PRNG"];
de.polygonal.math.PM_PRNG.prototype = {
	seed: null
	,nextDouble: function() {
		return this.gen() / 2147483647;
	}
	,nextIntRange: function(min,max) {
		min -= .4999;
		max += .4999;
		return Math.round(min + (max - min) * this.nextDouble());
	}
	,nextDoubleRange: function(min,max) {
		return min + (max - min) * this.nextDouble();
	}
	,gen: function() {
		return this.seed = this.seed * 16807 % 2147483647;
	}
	,__class__: de.polygonal.math.PM_PRNG
}
var haxe = haxe || {}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.onerror = haxe.Firebug.onError;
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype = {
	__class__: haxe.Firebug
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
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
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var voronoimap = voronoimap || {}
voronoimap.IslandShape = $hxClasses["voronoimap.IslandShape"] = function() { }
voronoimap.IslandShape.__name__ = ["voronoimap","IslandShape"];
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
		var length = 0.5 * (Math.max(Math.abs(q.x),Math.abs(q.y)) + as3.ac3core.PointCore.distanceFromOrigin(q));
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
		return c > oceanRatio + oceanRatio * as3.ac3core.PointCore.distanceFromOrigin(q) * as3.ac3core.PointCore.distanceFromOrigin(q);
	};
}
voronoimap.IslandShape.makeSquare = function() {
	return function(q) {
		return true;
	};
}
voronoimap.IslandShape.makeBlob = function() {
	return function(q) {
		var eye1 = as3.ac3core.PointCore.distanceFromOrigin({ x : q.x - 0.2, y : q.y / 2 + 0.2}) < 0.05;
		var eye2 = as3.ac3core.PointCore.distanceFromOrigin({ x : q.x + 0.2, y : q.y / 2 + 0.2}) < 0.05;
		var body = as3.ac3core.PointCore.distanceFromOrigin(q) < 0.8 - 0.18 * Math.sin(5 * Math.atan2(q.y,q.x));
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
voronoimap.IslandShape.prototype = {
	__class__: voronoimap.IslandShape
}
voronoimap.Lava = $hxClasses["voronoimap.Lava"] = function() {
	this.lava = [];
};
voronoimap.Lava.__name__ = ["voronoimap","Lava"];
voronoimap.Lava.prototype = {
	lava: null
	,__class__: voronoimap.Lava
}
voronoimap.Html = $hxClasses["voronoimap.Html"] = function() { }
voronoimap.Html.__name__ = ["voronoimap","Html"];
voronoimap.Html.prototype = {
	__class__: voronoimap.Html
}
voronoimap.Main = $hxClasses["voronoimap.Main"] = function() { }
voronoimap.Main.__name__ = ["voronoimap","Main"];
voronoimap.Main.main = function() {
	haxe.Firebug.redirectTraces();
	voronoimap.Main.initializeUi();
	voronoimap.Main.generate();
}
voronoimap.Main.initializeUi = function() {
	new js.JQuery("#random").click(function() {
		new js.JQuery("#seed").val(Std.string(co.janicek.core.math.RandomCore.makeRandomSeed()));
	});
	new js.JQuery("#shapeRandom").click(function() {
		new js.JQuery("#shapeSeed").val(Std.string(co.janicek.core.math.RandomCore.makeRandomSeed()));
	});
	new js.JQuery("#islandShape").change(function(e) {
		new js.JQuery(["#islandFactor","#oceanRatio","#shapeSeed","#bitmapUrl"].toString()).parent().hide();
		switch(new js.JQuery("#islandShape").val()) {
		case "bitmap":
			new js.JQuery("#bitmapUrl").parent().show();
			break;
		case "perlin":
			new js.JQuery(["#oceanRatio","#shapeSeed"].toString()).parent().show();
			break;
		case "radial":
			new js.JQuery(["#islandFactor","#shapeSeed"].toString()).parent().show();
			break;
		}
	});
	new js.JQuery("#width").val(Std.string(js.Lib.window.innerWidth));
	new js.JQuery("#height").val(Std.string(js.Lib.window.innerHeight));
	new js.JQuery("#view").change(function(e) {
		switch(new js.JQuery("#view").val()) {
		case "debug polygons":
			new js.JQuery("#addNoise").removeAttr("checked");
			break;
		case "smooth":
			new js.JQuery("#addNoise").attr("checked","true");
			break;
		}
	});
	new js.JQuery("#generate").click(voronoimap.Main.generate);
	new js.JQuery("#toggle").click(function() {
		var fields = new js.JQuery("#fields");
		fields.toggle(500,function() {
			new js.JQuery("#toggle").text(fields["is"](":visible")?"hide":"show");
		});
	});
}
voronoimap.Main.getContext = function() {
	var canvas = js.Lib.document.getElementById("map");
	return canvas.getContext("2d");
}
voronoimap.Main.findOrCreateCanvas = function() {
	var canvas = js.Lib.document.getElementById("map");
	if(canvas == null) {
		canvas = js.Lib.document.createElement("canvas");
		canvas.id = "map";
		js.Lib.document.body.appendChild(canvas);
	}
	return canvas;
}
voronoimap.Main.generate = function() {
	var canvas = voronoimap.Main.findOrCreateCanvas();
	canvas.width = Std.parseInt(new js.JQuery("#width").val());
	canvas.height = Std.parseInt(new js.JQuery("#height").val());
	var map = new voronoimap.Map({ width : canvas.width + 0.0, height : canvas.height + 0.0},Std.parseInt(new js.JQuery("#numberOfPoints").val()),Std.parseFloat(new js.JQuery("#lakeThreshold").val()),Std.parseInt(new js.JQuery("#lloydIterations").val()),Std.parseInt(new js.JQuery("#riverChance").val()));
	var seed = voronoimap.Main.getIntegerOrStringSeed(new js.JQuery("#seed").val());
	var shapeSeed = voronoimap.Main.getIntegerOrStringSeed(new js.JQuery("#shapeSeed").val());
	var islandShape = new js.JQuery("#islandShape").val();
	switch(islandShape) {
	case "bitmap":
		co.janicek.core.html.CanvasCore.loadImage(new js.JQuery("#bitmapUrl").val(),function(image) {
			var imageData = co.janicek.core.html.CanvasCore.getImageData(image);
			var bitmap = co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap(imageData,127,true);
			map.newIsland(voronoimap.IslandShape.makeBitmap(bitmap),1);
			voronoimap.Main.buildMapAndRender(map);
		});
		break;
	case "blob":
		map.newIsland(voronoimap.IslandShape.makeBlob(),seed);
		break;
	case "perlin":
		map.newIsland(voronoimap.IslandShape.makePerlin(shapeSeed,Std.parseFloat(new js.JQuery("#oceanRatio").val())),seed);
		break;
	case "radial":
		map.newIsland(voronoimap.IslandShape.makeRadial(shapeSeed,Std.parseFloat(new js.JQuery("#islandFactor").val())),seed);
		break;
	case "square":
		map.newIsland(voronoimap.IslandShape.makeSquare(),seed);
		break;
	}
	if(islandShape != "bitmap") voronoimap.Main.buildMapAndRender(map);
}
voronoimap.Main.getIntegerOrStringSeed = function(s) {
	if(co.janicek.core.StringCore.isInteger(s)) return Std.parseInt(s);
	return co.janicek.core.math.RandomCore.stringToSeed(s);
}
voronoimap.Main.buildMapAndRender = function(map) {
	var noisyEdges = new voronoimap.NoisyEdges();
	var lava = new voronoimap.Lava();
	map.go(0,1);
	map.go(1,2);
	map.go(2,3);
	map.assignBiomes();
	map.go(3,6);
	map.assignBiomes();
	noisyEdges.buildNoisyEdges(map,lava,new de.polygonal.math.PM_PRNG());
	voronoimap.Main.render(map,noisyEdges,lava);
}
voronoimap.Main.render = function(map,noisyEdges,lava) {
	var c = voronoimap.Main.getContext();
	voronoimap.html.CanvasRender.graphicsReset(c,map.SIZE.width | 0,map.SIZE.height | 0,voronoimap.html.Style.displayColors);
	switch(new js.JQuery("#view").val()) {
	case "debug polygons":
		voronoimap.html.CanvasRender.renderDebugPolygons(c,map,voronoimap.html.Style.displayColors);
		break;
	case "smooth":
		voronoimap.html.CanvasRender.renderPolygons(c,voronoimap.html.Style.displayColors,null,voronoimap.html.CanvasRender.colorWithSlope,map,noisyEdges);
		voronoimap.html.CanvasRender.renderEdges(c,voronoimap.html.Style.displayColors,map,noisyEdges,lava);
		break;
	}
	if(new js.JQuery("#addNoise")["is"](":checked")) co.janicek.core.html.CanvasCore.addNoiseToCanvas(c,map.SIZE.width,map.SIZE.height,666,10,true);
}
voronoimap.Main.prototype = {
	__class__: voronoimap.Main
}
voronoimap.Map = $hxClasses["voronoimap.Map"] = function(size,numPoints,lakeThreshold,numlLloydIterations,riverChance) {
	if(numlLloydIterations == null) numlLloydIterations = 2;
	if(lakeThreshold == null) lakeThreshold = 0.3;
	if(numPoints == null) numPoints = 1000;
	this.mapRandom = new de.polygonal.math.PM_PRNG();
	this.SIZE = size;
	this.NUM_POINTS = numPoints;
	this.LAKE_THRESHOLD = lakeThreshold;
	this.NUM_LLOYD_ITERATIONS = numlLloydIterations;
	this.RIVER_CHANCE = riverChance == null?(this.SIZE.width + this.SIZE.height) / 4 | 0:riverChance;
	this.reset();
};
voronoimap.Map.__name__ = ["voronoimap","Map"];
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
voronoimap.Map.prototype = {
	NUM_POINTS: null
	,LAKE_THRESHOLD: null
	,NUM_LLOYD_ITERATIONS: null
	,RIVER_CHANCE: null
	,SIZE: null
	,islandShape: null
	,mapRandom: null
	,points: null
	,centers: null
	,corners: null
	,edges: null
	,newIsland: function(islandShape,variant) {
		this.islandShape = islandShape;
		this.mapRandom.seed = variant;
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
	,go: function(first,last) {
		var me = this;
		var stages = [];
		var timeIt = function(name,fn) {
			fn();
		};
		stages.push(["Place points...",function() {
			me.reset();
			me.points = me.generateRandomPoints();
		}]);
		stages.push(["Improve points...",function() {
			me.improveRandomPoints(me.points);
		}]);
		stages.push(["Build graph...",function() {
			var voronoi = new com.nodename.delaunay.Voronoi(me.points,null,new as3.as3types.Rectangle(0,0,me.SIZE.width,me.SIZE.height));
			me.buildGraph(me.points,voronoi);
			me.improveCorners();
			voronoi.dispose();
			voronoi = null;
			me.points = null;
		}]);
		stages.push(["Assign elevations...",function() {
			me.assignCornerElevations();
			me.assignOceanCoastAndLand();
			me.redistributeElevations(me.landCorners(me.corners));
			var _g = 0, _g1 = me.corners;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				if(q.ocean || q.coast) q.elevation = 0.0;
			}
			me.assignPolygonElevations();
		}]);
		stages.push(["Assign moisture...",function() {
			me.calculateDownslopes();
			me.calculateWatersheds();
			me.createRivers(me.RIVER_CHANCE);
			me.assignCornerMoisture();
			me.redistributeMoisture(me.landCorners(me.corners));
			me.assignPolygonMoisture();
		}]);
		stages.push(["Decorate map...",function() {
			me.assignBiomes();
		}]);
		var _g = first;
		while(_g < last) {
			var i = _g++;
			timeIt(stages[i][0],stages[i][1]);
		}
	}
	,generateRandomPoints: function() {
		var p, i, points = new Array();
		var _g1 = 0, _g = this.NUM_POINTS;
		while(_g1 < _g) {
			var i1 = _g1++;
			p = { x : this.mapRandom.nextDoubleRange(10,this.SIZE.width - 10), y : this.mapRandom.nextDoubleRange(10,this.SIZE.height - 10)};
			points.push(p);
		}
		return points;
	}
	,improveRandomPoints: function(points) {
		var i, p, q, voronoi, region;
		var _g1 = 0, _g = this.NUM_LLOYD_ITERATIONS;
		while(_g1 < _g) {
			var i1 = _g1++;
			voronoi = new com.nodename.delaunay.Voronoi(points,null,new as3.as3types.Rectangle(0,0,this.SIZE.width,this.SIZE.height));
			var _g2 = 0;
			while(_g2 < points.length) {
				var p1 = points[_g2];
				++_g2;
				region = voronoi.region(p1);
				p1.x = 0.0;
				p1.y = 0.0;
				var _g3 = 0;
				while(_g3 < region.length) {
					var q1 = region[_g3];
					++_g3;
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
			if(edge1.v0 != null && edge1.v1 != null) edge1.midpoint = as3.ac3core.PointCore.interpolate(edge1.v0.point,edge1.v1.point,0.5);
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
	,buildGraph: function(points,voronoi) {
		var me = this;
		var p, q, point, other;
		var libedges = voronoi.edges();
		var centerLookup = new Hash();
		var _g = 0;
		while(_g < points.length) {
			var point1 = points[_g];
			++_g;
			p = new voronoimap.graph.Center();
			p.index = this.centers.length;
			p.point = point1;
			p.neighbors = new Array();
			p.borders = new Array();
			p.corners = new Array();
			this.centers.push(p);
			centerLookup.set(as3.ac3core.PointCore.hash(point1),p);
		}
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			voronoi.region(p1.point);
		}
		var _cornerMap = [];
		var makeCorner = function(point1) {
			var q1;
			if(point1 == null) return null;
			var bucket;
			var _g1 = (point1.x | 0) - 1, _g = (point1.x | 0) + 2;
			while(_g1 < _g) {
				var bucket1 = _g1++;
				if(_cornerMap[bucket1] != null) {
					var _g2 = 0, _g3 = _cornerMap[bucket1];
					while(_g2 < _g3.length) {
						var q2 = _g3[_g2];
						++_g2;
						var dx = point1.x - q2.point.x;
						var dy = point1.y - q2.point.y;
						if(dx * dx + dy * dy < 1e-6) return q2;
					}
				}
			}
			bucket = point1.x | 0;
			if(_cornerMap[bucket] == null) _cornerMap[bucket] = [];
			q1 = new voronoimap.graph.Corner();
			q1.index = me.corners.length;
			me.corners.push(q1);
			q1.point = point1;
			q1.border = point1.x == 0 || point1.x == me.SIZE.width || point1.y == 0 || point1.y == me.SIZE.height;
			q1.touches = new Array();
			q1.protrudes = new Array();
			q1.adjacent = new Array();
			_cornerMap[bucket].push(q1);
			return q1;
		};
		var _g = 0;
		while(_g < libedges.length) {
			var libedge = libedges[_g];
			++_g;
			var dedge = libedge.delaunayLine();
			var vedge = libedge.voronoiEdge();
			var edge = new voronoimap.graph.Edge();
			edge.index = this.edges.length;
			edge.river = 0;
			this.edges.push(edge);
			edge.midpoint = vedge.p0 != null && vedge.p1 != null?as3.ac3core.PointCore.interpolate(vedge.p0,vedge.p1,0.5):null;
			edge.v0 = makeCorner(vedge.p0);
			edge.v1 = makeCorner(vedge.p1);
			edge.d0 = centerLookup.get(as3.ac3core.PointCore.hash(dedge.p0));
			edge.d1 = centerLookup.get(as3.ac3core.PointCore.hash(dedge.p1));
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
	,assignOceanCoastAndLand: function() {
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
			p1.water = p1.ocean || numWater >= p1.corners.length * this.LAKE_THRESHOLD;
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
	,createRivers: function(riverChance) {
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
	,assignBiomes: function() {
		var p;
		var _g = 0, _g1 = this.centers;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			p1.biome = voronoimap.Map.getBiome(p1);
		}
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
	,lookupEdgeFromCorner: function(q,s) {
		var _g = 0, _g1 = q.protrudes;
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			if(edge.v0 == s || edge.v1 == s) return edge;
		}
		return null;
	}
	,inside: function(p) {
		return this.islandShape({ x : 2 * (p.x / this.SIZE.width - 0.5), y : 2 * (p.y / this.SIZE.height - 0.5)});
	}
	,__class__: voronoimap.Map
}
voronoimap.NoisyEdges = $hxClasses["voronoimap.NoisyEdges"] = function() {
	this.path0 = [];
	this.path1 = [];
};
voronoimap.NoisyEdges.__name__ = ["voronoimap","NoisyEdges"];
voronoimap.NoisyEdges.buildNoisyLineSegments = function(random,A,B,C,D,minLength) {
	var points = new Array();
	var limit = 10;
	var subdivide = (function($this) {
		var $r;
		var subdivide1 = null;
		subdivide1 = function(A1,B1,C1,D1) {
			if(as3.ac3core.PointCore.distanceFromOrigin({ x : A1.x - C1.x, y : A1.y - C1.y}) < minLength || as3.ac3core.PointCore.distanceFromOrigin({ x : B1.x - D1.x, y : B1.y - D1.y}) < minLength) return;
			var p = random.nextDoubleRange(0.2,0.8);
			var q = random.nextDoubleRange(0.2,0.8);
			var E = as3.ac3core.PointCore.interpolate(A1,D1,p);
			var F = as3.ac3core.PointCore.interpolate(B1,C1,p);
			var G = as3.ac3core.PointCore.interpolate(A1,B1,q);
			var I = as3.ac3core.PointCore.interpolate(D1,C1,q);
			var H = as3.ac3core.PointCore.interpolate(E,F,q);
			var s = 1.0 - random.nextDoubleRange(-0.4,0.4);
			var t = 1.0 - random.nextDoubleRange(-0.4,0.4);
			subdivide1(A1,as3.ac3core.PointCore.interpolate(G,B1,s),H,as3.ac3core.PointCore.interpolate(E,D1,t));
			points.push(H);
			subdivide1(H,as3.ac3core.PointCore.interpolate(F,C1,s),C1,as3.ac3core.PointCore.interpolate(I,D1,t));
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
	path0: null
	,path1: null
	,buildNoisyEdges: function(map,lava,random) {
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
					var f = voronoimap.NoisyEdges.NOISY_LINE_TRADEOFF;
					var t = as3.ac3core.PointCore.interpolate(edge1.v0.point,edge1.d0.point,f);
					var q = as3.ac3core.PointCore.interpolate(edge1.v0.point,edge1.d1.point,f);
					var r = as3.ac3core.PointCore.interpolate(edge1.v1.point,edge1.d0.point,f);
					var s = as3.ac3core.PointCore.interpolate(edge1.v1.point,edge1.d1.point,f);
					var minLength = 10;
					if(edge1.d0.biome != edge1.d1.biome) minLength = 3;
					if(edge1.d0.ocean && edge1.d1.ocean) minLength = 100;
					if(edge1.d0.coast || edge1.d1.coast) minLength = 1;
					if(as3.ac3core.ConversionCore.booleanFromInt(edge1.river) || lava.lava[edge1.index] != null) minLength = 1;
					this.path0[edge1.index] = voronoimap.NoisyEdges.buildNoisyLineSegments(random,edge1.v0.point,t,edge1.midpoint,q,minLength);
					this.path1[edge1.index] = voronoimap.NoisyEdges.buildNoisyLineSegments(random,edge1.v1.point,s,edge1.midpoint,r,minLength);
				}
			}
		}
	}
	,__class__: voronoimap.NoisyEdges
}
if(!voronoimap.graph) voronoimap.graph = {}
voronoimap.graph.Center = $hxClasses["voronoimap.graph.Center"] = function() {
};
voronoimap.graph.Center.__name__ = ["voronoimap","graph","Center"];
voronoimap.graph.Center.prototype = {
	index: null
	,point: null
	,water: null
	,ocean: null
	,coast: null
	,border: null
	,biome: null
	,elevation: null
	,moisture: null
	,neighbors: null
	,borders: null
	,corners: null
	,__class__: voronoimap.graph.Center
}
voronoimap.graph.Corner = $hxClasses["voronoimap.graph.Corner"] = function() {
};
voronoimap.graph.Corner.__name__ = ["voronoimap","graph","Corner"];
voronoimap.graph.Corner.prototype = {
	index: null
	,point: null
	,ocean: null
	,water: null
	,coast: null
	,border: null
	,elevation: null
	,moisture: null
	,touches: null
	,protrudes: null
	,adjacent: null
	,river: null
	,downslope: null
	,watershed: null
	,watershed_size: null
	,__class__: voronoimap.graph.Corner
}
voronoimap.graph.Edge = $hxClasses["voronoimap.graph.Edge"] = function() {
};
voronoimap.graph.Edge.__name__ = ["voronoimap","graph","Edge"];
voronoimap.graph.Edge.prototype = {
	index: null
	,d0: null
	,d1: null
	,v0: null
	,v1: null
	,midpoint: null
	,river: null
	,__class__: voronoimap.graph.Edge
}
if(!voronoimap.html) voronoimap.html = {}
voronoimap.html.CanvasRender = $hxClasses["voronoimap.html.CanvasRender"] = function() { }
voronoimap.html.CanvasRender.__name__ = ["voronoimap","html","CanvasRender"];
voronoimap.html.CanvasRender.graphicsReset = function(c,mapWidth,mapHeight,displayColors) {
	c.clearRect(0,0,2000,2000);
	c.fillStyle = "#bbbbaa";
	c.fillRect(0,0,2000,2000);
	c.fillStyle = co.janicek.core.html.ColorPure.toHtmlColor(displayColors.OCEAN);
	c.fillRect(0,0,mapWidth | 0,mapHeight | 0);
}
voronoimap.html.CanvasRender.calculateLighting = function(p,r,s) {
	var A = new as3.ac3core.Vector3D(p.point.x,p.point.y,p.elevation);
	var B = new as3.ac3core.Vector3D(r.point.x,r.point.y,r.elevation);
	var C = new as3.ac3core.Vector3D(s.point.x,s.point.y,s.elevation);
	var normal = new as3.ac3core.Vector3D(B.x - A.x,B.y - A.y,B.z - A.z).crossProduct(new as3.ac3core.Vector3D(C.x - A.x,C.y - A.y,C.z - A.z));
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
	if(q != null && p.water == q.water) color = co.janicek.core.html.ColorPure.interpolateColor(color,Reflect.field(displayColors,q.biome),0.4);
	var colorLow = co.janicek.core.html.ColorPure.interpolateColor(color,3355443,0.7);
	var colorHigh = co.janicek.core.html.ColorPure.interpolateColor(color,16777215,0.3);
	var light = voronoimap.html.CanvasRender.calculateLighting(p,r,s);
	if(light < 0.5) return co.janicek.core.html.ColorPure.interpolateColor(colorLow,color,light * 2); else return co.janicek.core.html.ColorPure.interpolateColor(color,colorHigh,light * 2 - 1);
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
		context.fillStyle = co.janicek.core.html.ColorPure.toHtmlColor(co.janicek.core.html.ColorPure.interpolateColor(color,14540253,0.2));
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
					context.strokeStyle = co.janicek.core.html.ColorPure.toHtmlColor(displayColors.RIVER);
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
			context.fillRect(q1.point.x - 0.7 | 0,q1.point.y - 0.7 | 0,1.5 | 0,1.5 | 0);
		}
	}
}
voronoimap.html.CanvasRender.renderPolygons = function(graphics,colors,gradientFillProperty,colorOverrideFunction,map,noisyEdges) {
	var p, r;
	graphics.fillStyle = co.janicek.core.html.ColorPure.toHtmlColor(colors.OCEAN);
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
			var color = Reflect.field(colors,p1[0].biome) == null?0:Reflect.field(colors,p1[0].biome);
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
				voronoimap.html.CanvasRender.drawGradientTriangle(graphics,new as3.ac3core.Vector3D(p1[0].point.x,p1[0].point.y,Reflect.field(p1[0],gradientFillProperty)),new as3.ac3core.Vector3D(corner0.point.x,corner0.point.y,Reflect.field(corner0,gradientFillProperty)),new as3.ac3core.Vector3D(midpoint.x,midpoint.y,midpointAttr),[colors.GRADIENT_LOW,colors.GRADIENT_HIGH],drawPath0);
				voronoimap.html.CanvasRender.drawGradientTriangle(graphics,new as3.ac3core.Vector3D(p1[0].point.x,p1[0].point.y,Reflect.field(p1[0],gradientFillProperty)),new as3.ac3core.Vector3D(midpoint.x,midpoint.y,midpointAttr),new as3.ac3core.Vector3D(corner1.point.x,corner1.point.y,Reflect.field(corner1,gradientFillProperty)),[colors.GRADIENT_LOW,colors.GRADIENT_HIGH],drawPath1);
			} else {
				graphics.fillStyle = co.janicek.core.html.ColorPure.toHtmlColor(color);
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
voronoimap.html.CanvasRender.renderEdges = function(graphics,colors,map,noisyEdges,lava) {
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
				graphics.strokeStyle = co.janicek.core.html.ColorPure.toHtmlColor(colors.COAST);
			} else if((p1.water?1:0) > 0 != (r1.water?1:0) > 0 && p1.biome != "ICE" && r1.biome != "ICE") {
				graphics.lineWidth = 1;
				graphics.strokeStyle = co.janicek.core.html.ColorPure.toHtmlColor(colors.LAKESHORE);
			} else if(p1.water || r1.water) continue; else if(lava.lava[edge.index]) {
				graphics.lineWidth = 1;
				graphics.strokeStyle = co.janicek.core.html.ColorPure.toHtmlColor(colors.LAVA);
			} else if(edge.river > 0) {
				graphics.lineWidth = Math.sqrt(edge.river);
				graphics.strokeStyle = co.janicek.core.html.ColorPure.toHtmlColor(colors.RIVER);
			} else continue;
			graphics.beginPath();
			graphics.moveTo(noisyEdges.path0[edge.index][0].x,noisyEdges.path0[edge.index][0].y);
			voronoimap.html.CanvasRender.drawPathForwards(graphics,noisyEdges.path0[edge.index]);
			voronoimap.html.CanvasRender.drawPathBackwards(graphics,noisyEdges.path1[edge.index]);
			graphics.stroke();
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
	var m = new as3.ac3core.Matrix();
	var V = new as3.ac3core.Vector3D(v1.x + v2.x,v1.y + v2.y,v1.z + v2.z).add(v3);
	V.scaleBy(1 / 3.0);
	var N = new as3.ac3core.Vector3D(v2.x - v1.x,v2.y - v1.y,v2.z - v1.z).crossProduct(new as3.ac3core.Vector3D(v3.x - v1.x,v3.y - v1.y,v3.z - v1.z));
	N.normalize();
	var G = new as3.ac3core.Vector3D(-N.x / N.z,-N.y / N.z,0);
	var C = new as3.ac3core.Vector3D(V.x - G.x * ((V.z - 0.5) / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D())) / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D()))),V.y - G.y * ((V.z - 0.5) / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D())) / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D()))));
	if(Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D())) < 1e-6) {
		var color = colors[0];
		if(colors.length == 2) color = co.janicek.core.html.ColorPure.interpolateColor(colors[0],colors[1],V.z); else if(colors.length == 3) {
			if(V.z < 0.5) color = co.janicek.core.html.ColorPure.interpolateColor(colors[0],colors[1],V.z * 2); else color = co.janicek.core.html.ColorPure.interpolateColor(colors[1],colors[2],V.z * 2 - 1);
		}
		graphics.fillStyle = co.janicek.core.html.ColorPure.toHtmlColor(color);
	} else {
		m.createGradientBox(1,1,0,0,0);
		m.translate(-0.5,-0.5);
		m.scale(1 / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D())),1 / Math.abs(as3.ac3core.Vector3D.distance(G,new as3.ac3core.Vector3D())));
		m.rotate(Math.atan2(G.y,G.x));
		m.translate(C.x,C.y);
		var alphas = Lambda.map(colors,function(c) {
			return 1.0;
		});
		var spread = Lambda.mapi(colors,function(index,c) {
			return 255 * index / (colors.length - 1);
		});
	}
	fillFunction();
	graphics.fill();
}
voronoimap.html.CanvasRender.prototype = {
	__class__: voronoimap.html.CanvasRender
}
voronoimap.html.Style = $hxClasses["voronoimap.html.Style"] = function() { }
voronoimap.html.Style.__name__ = ["voronoimap","html","Style"];
voronoimap.html.Style.prototype = {
	__class__: voronoimap.html.Style
}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	/*! jQuery v1.6.4 http://jquery.com/ | http://jquery.org/license */
(function(a,b){function cu(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cr(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cq(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cp(){cn=b}function co(){setTimeout(cp,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bA.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bW(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bP,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bW(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bW(a,c,d,e,"*",g));return l}function bV(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bL),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function by(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bt:bu;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bv(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bd,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function V(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(Q.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function U(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function M(a,b){return(a&&a!=="*"?a+".":"")+b.replace(y,"`").replace(z,"&")}function L(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(w,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function J(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function D(){return!0}function C(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(!b)return-1;if(I)return I.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g+"With"](this===b?d:this,[h])}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i=f.expando,j=typeof c=="string",k=a.nodeType,l=k?f.cache:a,m=k?a[f.expando]:a[f.expando]&&f.expando;if((!m||e&&m&&l[m]&&!l[m][i])&&j&&d===b)return;m||(k?a[f.expando]=m=++f.uuid:m=f.expando),l[m]||(l[m]={},k||(l[m].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?l[m][i]=f.extend(l[m][i],c):l[m]=f.extend(l[m],c);g=l[m],e&&(g[i]||(g[i]={}),g=g[i]),d!==b&&(g[f.camelCase(c)]=d);if(c==="events"&&!g[c])return g[i]&&g[i].events;j?(h=g[c],h==null&&(h=g[f.camelCase(c)])):h=g;return h}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e=f.expando,g=a.nodeType,h=g?f.cache:a,i=g?a[f.expando]:f.expando;if(!h[i])return;if(b){d=c?h[i][e]:h[i];if(d){d[b]||(b=f.camelCase(b)),delete d[b];if(!l(d))return}}if(c){delete h[i][e];if(!l(h[i]))return}var j=h[i][e];f.support.deleteExpando||!h.setInterval?delete h[i]:h[i]=null,j?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=j):g&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=v:u&&(i=u)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.attr(a,b,""),a.removeAttribute(b),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(u&&f.nodeName(a,"button"))return u.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(u&&f.nodeName(a,"button"))return u.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==null?g:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabIndex=f.propHooks.tabIndex,v={get:function(a,c){var d;return f.prop(a,c)===!0||(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(u=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=/\.(.*)$/,x=/^(?:textarea|input|select)$/i,y=/\./g,z=/ /g,A=/[^\w\s.|`]/g,B=function(a){return a.replace(A,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=C;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=C);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),B).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete 
t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,M(a.origType,a.selector),f.extend({},a,{handler:L,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,M(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?D:C):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=D;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=D;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=D,this.stopPropagation()},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};var E=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},F=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?F:E,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?F:E)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="submit"||c==="image")&&f(b).closest("form").length&&J("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&J("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var G,H=function(a){var b=f.nodeName(a,"input")?a.type:"",c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},I=function(c){var d=c.target,e,g;if(!!x.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=H(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:I,beforedeactivate:I,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&I.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&I.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",H(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in G)f.event.add(this,c+".specialChange",G[c]);return x.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return x.test(this.nodeName)}},G=f.event.special.change.filters,G.focus=G.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var K={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||C,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=w.exec(h),k="",j&&(k=j[0],h=h.replace(w,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,K[h]?(a.push(K[h]+k),h=h+k):h=(K[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+M(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+M(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var N=/Until$/,O=/^(?:parents|prevUntil|prevAll)/,P=/,/,Q=/^.[^:#\[\.,]*$/,R=Array.prototype.slice,S=f.expr.match.POS,T={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(V(this,a,!1),"not",a)},filter:function(a){return this.pushStack(V(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=S.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=S.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(U(c[0])||U(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=R.call(arguments);N.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!T[a]?f.unique(e):e,(this.length>1||P.test(d))&&O.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|object|embed|option|style)/i,bb=/checked\s*(?:[^=]|=\s*.checked.)/i,bc=/\/(java|ecma)script/i,bd=/^\s*<!(?:\[CDATA\[|\-\-)/,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!be[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bb.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!ba.test(a[0])&&(f.support.checkClone||!bb.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean
(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)g[h]&&bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=be[l]||be._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bk(k[i]);else bk(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bc.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/([A-Z]|^ms)/g,bp=/^-?\d+(?:px)?$/i,bq=/^-?\d/,br=/^([\-+])=([\-+.\de]+)/,bs={position:"absolute",visibility:"hidden",display:"block"},bt=["Left","Right"],bu=["Top","Bottom"],bv,bw,bx;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bv(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=br.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bv)return bv(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return by(a,b,d);f.swap(a,bs,function(){e=by(a,b,d)});return e}},set:function(a,b){if(!bp.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bm,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bv(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bw=function(a,c){var d,e,g;c=c.replace(bo,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bx=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bp.test(d)&&bq.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bv=bw||bx,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bz=/%20/g,bA=/\[\]$/,bB=/\r?\n/g,bC=/#.*$/,bD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bE=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bF=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bG=/^(?:GET|HEAD)$/,bH=/^\/\//,bI=/\?/,bJ=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bK=/^(?:select|textarea)/i,bL=/\s+/,bM=/([?&])_=[^&]*/,bN=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bO=f.fn.load,bP={},bQ={},bR,bS,bT=["*/"]+["*"];try{bR=e.href}catch(bU){bR=c.createElement("a"),bR.href="",bR=bR.href}bS=bN.exec(bR.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bO)return bO.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bJ,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bK.test(this.nodeName)||bE.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bB,"\r\n")}}):{name:b.name,value:c.replace(bB,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?bX(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),bX(a,b);return a},ajaxSettings:{url:bR,isLocal:bF.test(bS[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bT},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bV(bP),ajaxTransport:bV(bQ),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?bZ(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=b$(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bD.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bC,"").replace(bH,bS[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bL),d.crossDomain==null&&(r=bN.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bS[1]&&r[2]==bS[2]&&(r[3]||(r[1]==="http:"?80:443))==(bS[3]||(bS[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bW(bP,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bG.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bI.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bM,"$1_="+x);d.url=y+(y===d.url?(bI.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bT+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bW(bQ,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bz,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cq("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cr(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cq("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cq("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cr(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cq("show",1),slideUp:cq("hide",1),slideToggle:cq("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return d.step(a)}var d=this,e=f.fx;this.startTime=cn||co(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&f.timers.push(g)&&!cl&&(cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||co(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cs=/^t(?:able|d|h)$/i,ct=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cu(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cs.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=ct.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!ct.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cu(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cu(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNaN(j)?i:j}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);;
	var q = window.jQuery;
	js.JQuery = q;
	q.fn.iterator = function() {
		return { pos : 0, j : this, hasNext : function() {
			return this.pos < this.j.length;
		}, next : function() {
			return $(this.j[this.pos++]);
		}};
	};
}
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
co.janicek.core.html.CanvasCore.CANVAS_ELEMENTS_PER_PIXEL = 4;
co.janicek.core.html.CanvasCore.CANVAS_RED_OFFSET = 0;
co.janicek.core.html.CanvasCore.CANVAS_GREEN_OFFSET = 1;
co.janicek.core.html.CanvasCore.CANVAS_BLUE_OFFSET = 2;
co.janicek.core.html.CanvasCore.CANVAS_ALPHA_OFFSET = 3;
co.janicek.core.math.PerlinNoise.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
co.janicek.core.math.RandomCore.MPM = 2147483647.0;
co.janicek.core.math.RandomCore.MINSTD = 16807.0;
com.nodename.delaunay.BoundsCheck.TOP = 1;
com.nodename.delaunay.BoundsCheck.BOTTOM = 2;
com.nodename.delaunay.BoundsCheck.LEFT = 4;
com.nodename.delaunay.BoundsCheck.RIGHT = 8;
com.nodename.delaunay.Edge._pool = new Array();
com.nodename.delaunay.Edge._nedges = 0;
com.nodename.delaunay.Edge.DELETED = new com.nodename.delaunay.Edge();
com.nodename.delaunay.Halfedge._pool = new Array();
com.nodename.delaunay.LR.LEFT = new com.nodename.delaunay.LR("left");
com.nodename.delaunay.LR.RIGHT = new com.nodename.delaunay.LR("right");
com.nodename.delaunay.Site._pool = new Array();
com.nodename.delaunay.Site.EPSILON = .005;
com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY = new com.nodename.delaunay.Vertex(Math.NaN,Math.NaN);
com.nodename.delaunay.Vertex._pool = new Array();
com.nodename.delaunay.Vertex._nvertices = 0;
com.nodename.geom.Winding.CLOCKWISE = new com.nodename.geom.Winding("clockwise");
com.nodename.geom.Winding.COUNTERCLOCKWISE = new com.nodename.geom.Winding("counterclockwise");
com.nodename.geom.Winding.NONE = new com.nodename.geom.Winding("none");
js.Lib.onerror = null;
voronoimap.Html.ID_map = "map";
voronoimap.Html.S_addNoise = "#addNoise";
voronoimap.Html.S_bitmapUrl = "#bitmapUrl";
voronoimap.Html.S_fields = "#fields";
voronoimap.Html.S_generate = "#generate";
voronoimap.Html.S_height = "#height";
voronoimap.Html.S_islandFactor = "#islandFactor";
voronoimap.Html.S_islandShape = "#islandShape";
voronoimap.Html.S_lakeThreshold = "#lakeThreshold";
voronoimap.Html.S_lloydIterations = "#lloydIterations";
voronoimap.Html.S_numberOfPoints = "#numberOfPoints";
voronoimap.Html.S_oceanRatio = "#oceanRatio";
voronoimap.Html.S_random = "#random";
voronoimap.Html.S_riverChance = "#riverChance";
voronoimap.Html.S_seed = "#seed";
voronoimap.Html.S_shapeRandom = "#shapeRandom";
voronoimap.Html.S_shapeSeed = "#shapeSeed";
voronoimap.Html.S_toggle = "#toggle";
voronoimap.Html.S_view = "#view";
voronoimap.Html.S_width = "#width";
voronoimap.NoisyEdges.NOISY_LINE_TRADEOFF = 0.5;
voronoimap.html.CanvasRender.lightVector = new as3.ac3core.Vector3D(-1,-1,0);
voronoimap.html.Style.displayColors = { OCEAN : 4473978, COAST : 3355482, LAKESHORE : 2250120, LAKE : 3368601, RIVER : 2250120, MARSH : 3106406, ICE : 10092543, BEACH : 10522743, ROAD1 : 4465169, ROAD2 : 5583650, ROAD3 : 6702131, BRIDGE : 6842464, LAVA : 13382451, SNOW : 16777215, TUNDRA : 12303274, BARE : 8947848, SCORCHED : 5592405, TAIGA : 10070647, SHRUBLAND : 8952183, TEMPERATE_DESERT : 13226651, TEMPERATE_RAIN_FOREST : 4491349, TEMPERATE_DECIDUOUS_FOREST : 6788185, GRASSLAND : 8956501, SUBTROPICAL_DESERT : 13810059, TROPICAL_RAIN_FOREST : 3372885, TROPICAL_SEASONAL_FOREST : 5609796};
voronoimap.Main.main()
//@ sourceMappingURL=voronoi-map.js.map