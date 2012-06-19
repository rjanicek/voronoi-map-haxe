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
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
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
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
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
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
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
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
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
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Main = $hxClasses["Main"] = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	haxe.Firebug.redirectTraces();
	haxe.Log.trace("Testing...",{ fileName : "Main.hx", lineNumber : 15, className : "Main", methodName : "main"});
	new specs.AS3Spec();
	new specs.ConversionCoreSpec();
	new specs.PointCoreSpec();
	new specs.PrngSpec();
	new specs.MapSpec();
	new specs.VoronoiSpec();
	jasmine.Jasmine.getEnv().addReporter(jasmine.Jasmine.newHtmlReporter());
	jasmine.Jasmine.getEnv().execute();
	haxe.Log.trace("Done testing.",{ fileName : "Main.hx", lineNumber : 26, className : "Main", methodName : "main"});
}
Main.prototype = {
	__class__: Main
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
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
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
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
as3.ac3core.BitmapDataCore.getPixel = function(bd,x,y) {
	throw "not implemented";
	return null;
}
as3.ac3core.BitmapDataCore.hitTest = function(bd,firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
	if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
	throw "not implemented";
	return null;
}
as3.ac3core.BitmapDataCore.perlinNoise = function(bd,baseX,baseY,numOctaves,randomSeed,stitch,fractalNoise) {
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
as3.ac3core.NumberCore = $hxClasses["as3.ac3core.NumberCore"] = function() { }
as3.ac3core.NumberCore.__name__ = ["as3","ac3core","NumberCore"];
as3.ac3core.NumberCore.prototype = {
	__class__: as3.ac3core.NumberCore
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
co.janicek.core.array.Array2dCore.any = function(a,f) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var yIndex = _g1++;
		if(a[yIndex] != null) {
			var _g3 = 0, _g2 = a[yIndex].length;
			while(_g3 < _g2) {
				var xIndex = _g3++;
				var value = a[yIndex][xIndex];
				if(value != null) {
					if(f(value)) return { x : xIndex, y : yIndex};
				}
			}
		}
	}
	return null;
}
co.janicek.core.array.Array2dCore.dimensions = function(array) {
	var height = array.length;
	var width = 0;
	co.janicek.core.array.Array2dCore.foreachY(array,function(y) {
		width = Math.max(width,y.length);
	});
	return { x : width, y : height};
}
co.janicek.core.array.Array2dCore.values = function(array) {
	return { iterator : function() {
		return new co.janicek.core.array.Array2dValueIterator(array);
	}};
}
co.janicek.core.array.Array2dCore.indexes = function(array) {
	return { iterator : function() {
		return new co.janicek.core.array.Array2dIterator(array);
	}};
}
co.janicek.core.array.Array2dCore.prototype = {
	__class__: co.janicek.core.array.Array2dCore
}
co.janicek.core.array.Array2dIterator = $hxClasses["co.janicek.core.array.Array2dIterator"] = function(a) {
	this.a = a;
	this.y = 0;
	this.x = 0;
	this.nextValue = null;
};
co.janicek.core.array.Array2dIterator.__name__ = ["co","janicek","core","array","Array2dIterator"];
co.janicek.core.array.Array2dIterator.prototype = {
	a: null
	,nextValue: null
	,y: null
	,x: null
	,hasNext: function() {
		if(this.nextValue != null) return true;
		while(this.y < this.a.length) {
			if(this.a[this.y] != null) {
				while(this.x < this.a[this.y].length && this.a[this.y][this.x] == null) this.x++;
				if(this.a[this.y][this.x] != null) {
					this.nextValue = { x : this.x, y : this.y};
					this.x++;
					return true;
				}
				this.x = 0;
			}
			this.y++;
		}
		return false;
	}
	,next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
	,__class__: co.janicek.core.array.Array2dIterator
}
co.janicek.core.array.Array2dValueIterator = $hxClasses["co.janicek.core.array.Array2dValueIterator"] = function(a) {
	this.yIterator = a.iterator();
	this.xIterator = null;
	this.nextValue = null;
};
co.janicek.core.array.Array2dValueIterator.__name__ = ["co","janicek","core","array","Array2dValueIterator"];
co.janicek.core.array.Array2dValueIterator.prototype = {
	yIterator: null
	,xIterator: null
	,nextValue: null
	,hasNext: function() {
		if(this.nextValue != null) return true;
		if(this.xIterator != null) while(this.xIterator.hasNext()) {
			this.nextValue = this.xIterator.next();
			if(this.nextValue != null) return true;
		}
		while(this.yIterator.hasNext()) {
			var z = this.yIterator.next();
			if(z != null) {
				this.xIterator = z.iterator();
				return this.hasNext();
			}
		}
		return false;
	}
	,next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
	,__class__: co.janicek.core.array.Array2dValueIterator
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
co.janicek.core.math.HashCore.sdbm = function(s) {
	var hash = 0;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = s.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
	}
	return hash;
}
co.janicek.core.math.HashCore.javaHashCode = function(s) {
	var hash = 0;
	if(s.length == 0) return hash;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) - hash + s.charCodeAt(i);
		hash = hash & hash;
	}
	return hash;
}
co.janicek.core.math.HashCore.prototype = {
	__class__: co.janicek.core.math.HashCore
}
co.janicek.core.math.MathCore = $hxClasses["co.janicek.core.math.MathCore"] = function() { }
co.janicek.core.math.MathCore.__name__ = ["co","janicek","core","math","MathCore"];
co.janicek.core.math.MathCore.isEven = function(n) {
	return n % 2 == 0;
}
co.janicek.core.math.MathCore.isOdd = function(n) {
	return !co.janicek.core.math.MathCore.isEven(n);
}
co.janicek.core.math.MathCore.clampInt = function(value,min,max) {
	return value < min?0:value > max?max:value;
}
co.janicek.core.math.MathCore.clamp = function(value,min,max) {
	return value < min?0:value > max?max:value;
}
co.janicek.core.math.MathCore.degreesToRadians = function(degrees) {
	return degrees * Math.PI / 180;
}
co.janicek.core.math.MathCore.radiansToDegrees = function(radians) {
	return radians * 180 / Math.PI;
}
co.janicek.core.math.MathCore.average = function(numbers) {
	return Lambda.fold(numbers,function(number,total) {
		return total + number;
	},0) / numbers.length;
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
co.janicek.core.math.RandomCore.nextLCG = function(seed) {
	return (1103515245.0 * seed + 12345) % 2147483647.0;
}
co.janicek.core.math.RandomCore.toFloat = function(seed) {
	return seed / 2147483647.0;
}
co.janicek.core.math.RandomCore.toBool = function(seed) {
	return seed / 2147483647.0 > 0.5;
}
co.janicek.core.math.RandomCore.toFloatRange = function(seed,min,max) {
	return min + (max - min) * (seed / 2147483647.0);
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
com.nodename.delaunay.Delaunay = $hxClasses["com.nodename.delaunay.Delaunay"] = function() { }
com.nodename.delaunay.Delaunay.__name__ = ["com","nodename","delaunay","Delaunay"];
com.nodename.delaunay.Delaunay.delaunayLinesForEdges = function(edges) {
	var segments = new Array();
	var _g = 0;
	while(_g < edges.length) {
		var edge = edges[_g];
		++_g;
		segments.push(edge.delaunayLine());
	}
	return segments;
}
com.nodename.delaunay.Delaunay.selectEdgesForSitePoint = function(coord,edgesToTest) {
	return Lambda.array(Lambda.filter(edgesToTest,function(edge) {
		return edge.leftSite != null && edge.leftSite._coord == coord || edge.rightSite != null && edge.rightSite._coord == coord;
	}));
}
com.nodename.delaunay.Delaunay.selectNonIntersectingEdges = function(keepOutMask,edgesToTest) {
	if(keepOutMask == null) return edgesToTest;
	var zeroPoint = { x : 0.0, y : 0.0};
	return Lambda.array(Lambda.filter(edgesToTest,function(edge) {
		var delaunayLineBmp = edge.makeDelaunayLineBmp();
		var notIntersecting = !as3.ac3core.BitmapDataCore.hitTest(keepOutMask,zeroPoint,1,delaunayLineBmp,zeroPoint,1);
		as3.ac3core.BitmapDataCore.dispose(delaunayLineBmp);
		return notIntersecting;
	}));
}
com.nodename.delaunay.Delaunay.visibleLineSegments = function(edges) {
	var segments = new Array();
	var _g = 0;
	while(_g < edges.length) {
		var edge = edges[_g];
		++_g;
		if(edge.clippedEnds != null) {
			var p1 = edge.clippedEnds.get(com.nodename.delaunay.LR.LEFT.toString());
			var p2 = edge.clippedEnds.get(com.nodename.delaunay.LR.RIGHT.toString());
			segments.push(new com.nodename.geom.LineSegment(p1,p2));
		}
	}
	return segments;
}
com.nodename.delaunay.Delaunay.prototype = {
	__class__: com.nodename.delaunay.Delaunay
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
com.nodename.delaunay.Edge.compareSitesDistances_MAX = function(edge0,edge1) {
	var length0 = edge0.sitesDistance();
	var length1 = edge1.sitesDistance();
	if(length0 < length1) return 1;
	if(length0 > length1) return -1;
	return 0;
}
com.nodename.delaunay.Edge.compareSitesDistances = function(edge0,edge1) {
	return -com.nodename.delaunay.Edge.compareSitesDistances_MAX(edge0,edge1);
}
com.nodename.delaunay.Edge.prototype = {
	delaunayLineBmp: null
	,_delaunayLineBmp: null
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
	,vertex: function(leftRight) {
		return leftRight == com.nodename.delaunay.LR.LEFT?this.leftVertex:this.rightVertex;
	}
	,setVertex: function(leftRight,v) {
		if(leftRight == com.nodename.delaunay.LR.LEFT) this.leftVertex = v; else this.rightVertex = v;
	}
	,isPartOfConvexHull: function() {
		return this.leftVertex == null || this.rightVertex == null;
	}
	,sitesDistance: function() {
		return as3.ac3core.PointCore.distance(this.leftSite._coord,this.rightSite._coord);
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
	,toString: function() {
		return "Edge " + this._edgeIndex + "; sites " + this.leftSite + ", " + this.rightSite + "; endVertices " + (this.leftVertex != null?Std.string(this.leftVertex.vertexIndex):"null") + ", " + (this.rightVertex != null?Std.string(this.rightVertex.vertexIndex):"null") + "::";
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
	,__properties__: {get_visible:"getVisible",get_delaunayLineBmp:"getDelaunayLineBmp"}
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
	,toString: function() {
		return "Halfedge (leftRight: " + this.leftRight + "; vertex: " + this.vertex + ")";
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
com.nodename.delaunay.Kruskal = $hxClasses["com.nodename.delaunay.Kruskal"] = function() { }
com.nodename.delaunay.Kruskal.__name__ = ["com","nodename","delaunay","Kruskal"];
com.nodename.delaunay.Kruskal.kruskal = function(lineSegments,type) {
	if(type == null) type = "minimum";
	var nodes = new Hash();
	var mst = new Array();
	var nodePool = com.nodename.delaunay.Node.pool;
	switch(type) {
	case "maximum":
		lineSegments.sort(com.nodename.geom.LineSegment.compareLengths);
		break;
	default:
		lineSegments.sort(com.nodename.geom.LineSegment.compareLengths_MAX);
	}
	var i = lineSegments.length - 1;
	while(i >= 0) {
		var lineSegment = lineSegments[i];
		i--;
		var node0 = nodes.get(as3.ac3core.PointCore.hash(lineSegment.p0));
		var rootOfSet0;
		if(node0 == null) {
			node0 = nodePool.length > 0?nodePool.pop():new com.nodename.delaunay.Node();
			rootOfSet0 = node0.parent = node0;
			node0.treeSize = 1;
			nodes.set(as3.ac3core.PointCore.hash(lineSegment.p0),node0);
		} else rootOfSet0 = com.nodename.delaunay.Kruskal.find(node0);
		var node1 = nodes.get(as3.ac3core.PointCore.hash(lineSegment.p1));
		var rootOfSet1;
		if(node1 == null) {
			node1 = nodePool.length > 0?nodePool.pop():new com.nodename.delaunay.Node();
			rootOfSet1 = node1.parent = node1;
			node1.treeSize = 1;
			nodes.set(as3.ac3core.PointCore.hash(lineSegment.p1),node1);
		} else rootOfSet1 = com.nodename.delaunay.Kruskal.find(node1);
		if(rootOfSet0 != rootOfSet1) {
			mst.push(lineSegment);
			var treeSize0 = rootOfSet0.treeSize;
			var treeSize1 = rootOfSet1.treeSize;
			if(treeSize0 >= treeSize1) {
				rootOfSet1.parent = rootOfSet0;
				rootOfSet0.treeSize += treeSize1;
			} else {
				rootOfSet0.parent = rootOfSet1;
				rootOfSet1.treeSize += treeSize0;
			}
		}
	}
	var $it0 = nodes.iterator();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		nodePool.push(node);
	}
	return mst;
}
com.nodename.delaunay.Kruskal.find = function(node) {
	if(node.parent == node) return node; else {
		var root = com.nodename.delaunay.Kruskal.find(node.parent);
		node.parent = root;
		return root;
	}
}
com.nodename.delaunay.Kruskal.prototype = {
	__class__: com.nodename.delaunay.Kruskal
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
com.nodename.delaunay.Node = $hxClasses["com.nodename.delaunay.Node"] = function() {
};
com.nodename.delaunay.Node.__name__ = ["com","nodename","delaunay","Node"];
com.nodename.delaunay.Node.prototype = {
	parent: null
	,treeSize: null
	,__class__: com.nodename.delaunay.Node
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
	,edges: null
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
	,toString: function() {
		return "Site " + this._siteIndex + ": " + Std.string(this._coord);
	}
	,move: function(p) {
		this.clear();
		this._coord = p;
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
	,nearestEdge: function() {
		this._edges.sort(com.nodename.delaunay.Edge.compareSitesDistances);
		return this._edges[0];
	}
	,neighborSites: function() {
		if(this._edges == null || this._edges.length == 0) return new Array();
		if(this._edgeOrientations == null) this.reorderEdges();
		var list = new Array();
		var edge;
		var _g = 0, _g1 = this._edges;
		while(_g < _g1.length) {
			var edge1 = _g1[_g];
			++_g;
			list.push(this.neighborSite(edge1));
		}
		return list;
	}
	,neighborSite: function(edge) {
		if(this == edge.leftSite) return edge.rightSite;
		if(this == edge.rightSite) return edge.leftSite;
		return null;
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
	,__properties__: {get_y:"getY",get_x:"getX",get_edges:"get_edges",get_coord:"get_coord"}
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
	,siteColors: function(referenceImage) {
		var colors = new Array();
		var _g = 0, _g1 = this._sites;
		while(_g < _g1.length) {
			var site = _g1[_g];
			++_g;
			colors.push(referenceImage != null?as3.ac3core.BitmapDataCore.getPixel(referenceImage,site._coord.x | 0,site._coord.y | 0):site.color);
		}
		return colors;
	}
	,siteCoords: function() {
		var coords = new Array();
		var _g = 0, _g1 = this._sites;
		while(_g < _g1.length) {
			var site = _g1[_g];
			++_g;
			coords.push(site._coord);
		}
		return coords;
	}
	,circles: function() {
		var circles = new Array();
		var _g = 0, _g1 = this._sites;
		while(_g < _g1.length) {
			var site = _g1[_g];
			++_g;
			var nearestEdge = site.nearestEdge();
			var radius = !nearestEdge.isPartOfConvexHull()?nearestEdge.sitesDistance() * 0.5:0;
			circles.push(new com.nodename.geom.Circle(site._coord.x,site._coord.y,radius));
		}
		return circles;
	}
	,regions: function(plotBounds) {
		var regions = new Array();
		var _g = 0, _g1 = this._sites;
		while(_g < _g1.length) {
			var site = _g1[_g];
			++_g;
			regions.push(site.region(plotBounds));
		}
		return regions;
	}
	,nearestSitePoint: function(proximityMap,x,y) {
		var index = as3.ac3core.BitmapDataCore.getPixel(proximityMap,x,y);
		if(index > this._sites.length - 1) return null;
		return this._sites[index]._coord;
	}
	,__class__: com.nodename.delaunay.SiteList
	,__properties__: {get_length:"getLength"}
}
com.nodename.delaunay.Triangle = $hxClasses["com.nodename.delaunay.Triangle"] = function(a,b,c) {
	this._sites = [a,b,c];
};
com.nodename.delaunay.Triangle.__name__ = ["com","nodename","delaunay","Triangle"];
com.nodename.delaunay.Triangle.prototype = {
	_sites: null
	,sites: null
	,get_sites: function() {
		return this._sites;
	}
	,dispose: function() {
		this._sites = null;
	}
	,__class__: com.nodename.delaunay.Triangle
	,__properties__: {get_sites:"get_sites"}
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
	,toString: function() {
		return "Vertex (" + this.vertexIndex + ")";
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
com.nodename.delaunay.Voronoi.isInfSite = function(s1,s2) {
	return s1._coord.y < s2._coord.y || s1._coord.y == s2._coord.y && s1._coord.x < s2._coord.x;
}
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
	,neighborSitesForSite: function(coord) {
		var points = new Array();
		var site = this._sitesIndexedByLocation.get(as3.ac3core.PointCore.hash(coord));
		if(site == null) return points;
		var sites = site.neighborSites();
		var neighbor;
		var _g = 0;
		while(_g < sites.length) {
			var neighbor1 = sites[_g];
			++_g;
			points.push(neighbor1._coord);
		}
		return points;
	}
	,circles: function() {
		return this._sites.circles();
	}
	,voronoiBoundaryForSite: function(coord) {
		return com.nodename.delaunay.Delaunay.visibleLineSegments(com.nodename.delaunay.Delaunay.selectEdgesForSitePoint(coord,this._edges));
	}
	,delaunayLinesForSite: function(coord) {
		return com.nodename.delaunay.Delaunay.delaunayLinesForEdges(com.nodename.delaunay.Delaunay.selectEdgesForSitePoint(coord,this._edges));
	}
	,voronoiDiagram: function() {
		return com.nodename.delaunay.Delaunay.visibleLineSegments(this._edges);
	}
	,delaunayTriangulation: function(keepOutMask) {
		return com.nodename.delaunay.Delaunay.delaunayLinesForEdges(com.nodename.delaunay.Delaunay.selectNonIntersectingEdges(keepOutMask,this._edges));
	}
	,hull: function() {
		return com.nodename.delaunay.Delaunay.delaunayLinesForEdges(this.hullEdges());
	}
	,hullEdges: function() {
		return Lambda.array(Lambda.filter(this._edges,function(edge) {
			return edge.isPartOfConvexHull();
		}));
	}
	,hullPointsInOrder: function() {
		var hullEdges = this.hullEdges();
		var points = new Array();
		if(hullEdges.length == 0) return points;
		var reorderer = new com.nodename.delaunay.EdgeReorderer(hullEdges,com.nodename.delaunay.Criterion.site);
		hullEdges = reorderer.edges;
		var orientations = reorderer.edgeOrientations;
		reorderer.dispose();
		var orientation;
		var n = hullEdges.length;
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			var edge = hullEdges[i];
			orientation = orientations[i];
			points.push(edge.site(orientation)._coord);
		}
		return points;
	}
	,spanningTree: function(type,keepOutMask) {
		if(type == null) type = "minimum";
		var edges = com.nodename.delaunay.Delaunay.selectNonIntersectingEdges(keepOutMask,this._edges);
		var segments = com.nodename.delaunay.Delaunay.delaunayLinesForEdges(edges);
		return com.nodename.delaunay.Kruskal.kruskal(segments,type);
	}
	,regions: function() {
		return this._sites.regions(this.plotBounds);
	}
	,siteColors: function(referenceImage) {
		return this._sites.siteColors(referenceImage);
	}
	,nearestSitePoint: function(proximityMap,x,y) {
		return this._sites.nearestSitePoint(proximityMap,x,y);
	}
	,siteCoords: function() {
		return this._sites.siteCoords();
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
com.nodename.geom.Circle = $hxClasses["com.nodename.geom.Circle"] = function(centerX,centerY,radius) {
	this.center = { x : centerX, y : centerY};
	this.radius = radius;
};
com.nodename.geom.Circle.__name__ = ["com","nodename","geom","Circle"];
com.nodename.geom.Circle.prototype = {
	center: null
	,radius: null
	,toString: function() {
		return "Circle (center: " + this.center + "; radius: " + this.radius + ")";
	}
	,__class__: com.nodename.geom.Circle
}
com.nodename.geom.LineSegment = $hxClasses["com.nodename.geom.LineSegment"] = function(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
};
com.nodename.geom.LineSegment.__name__ = ["com","nodename","geom","LineSegment"];
com.nodename.geom.LineSegment.compareLengths_MAX = function(segment0,segment1) {
	var length0 = as3.ac3core.PointCore.distance(segment0.p0,segment0.p1);
	var length1 = as3.ac3core.PointCore.distance(segment1.p0,segment1.p1);
	if(length0 < length1) return 1;
	if(length0 > length1) return -1;
	return 0;
}
com.nodename.geom.LineSegment.compareLengths = function(edge0,edge1) {
	return -com.nodename.geom.LineSegment.compareLengths_MAX(edge0,edge1);
}
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
	,area: function() {
		return Math.abs(this.signedDoubleArea() * 0.5);
	}
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
	,toString: function() {
		return this._name;
	}
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
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
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
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
var jasmine = jasmine || {}
jasmine.J = $hxClasses["jasmine.J"] = function() { }
jasmine.J.__name__ = ["jasmine","J"];
jasmine.J.beforeEach = function(beforeEachFunction) {
	beforeEach(beforeEachFunction);
}
jasmine.J.afterEach = function(afterEachFunction) {
	afterEach(afterEachFunction);
}
jasmine.J.describe = function(description,specDefinitions) {
	describe(description, specDefinitions);
}
jasmine.J.xdescribe = function(description,specDefinitions) {
	xdescribe(description, specDefinitions);
}
jasmine.J.it = function(description,func) {
	it(description, func);
}
jasmine.J.xit = function(description,func) {
	xit(description, func);
}
jasmine.J.expect = function(actual) {
	return expect(actual);
}
jasmine.J.runs = function(func) {
	runs(func);
}
jasmine.J.waits = function(timeoutMilliseconds) {
	waits(timeoutMilliseconds);
}
jasmine.J.waitsFor = function(func,message,timeoutMilliseconds) {
	waitsFor(func, message, timeoutMilliseconds);
}
jasmine.J.spyOn = function(x,method) {
	return spyOn(x, method);
}
jasmine.J.prototype = {
	__class__: jasmine.J
}
jasmine.Jasmine = $hxClasses["jasmine.Jasmine"] = function() { }
jasmine.Jasmine.__name__ = ["jasmine","Jasmine"];
jasmine.Jasmine.getEnv = function() {
	return jasmine.getEnv();
}
jasmine.Jasmine.newTrivialReporter = function() {
	return new jasmine.TrivialReporter();
}
jasmine.Jasmine.newHtmlReporter = function() {
	return new jasmine.HtmlReporter();
}
jasmine.Jasmine.createSpy = function(name) {
	return jasmine.createSpy(name);
}
jasmine.Jasmine.prototype = {
	__class__: jasmine.Jasmine
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
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
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
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var specs = specs || {}
specs.AS3Spec = $hxClasses["specs.AS3Spec"] = function() {
	jasmine.J.describe("AS3",function() {
		jasmine.J.xit("should allow duplicate points as Dictionary keys",function() {
			var p1 = { x : 1.0, y : 1.0};
			var p2 = { x : 1.0, y : 1.0};
			var d = new Hash();
			d.set(as3.ac3core.PointCore.hash(p1),p1);
			d.set(as3.ac3core.PointCore.hash(p2),p2);
			jasmine.J.expect(Lambda.count(d)).toEqual(2);
		});
	});
};
specs.AS3Spec.__name__ = ["specs","AS3Spec"];
specs.AS3Spec.prototype = {
	__class__: specs.AS3Spec
}
specs.ConversionCoreSpec = $hxClasses["specs.ConversionCoreSpec"] = function() {
	jasmine.J.describe("ConversionCore",function() {
		jasmine.J.it("should make int from boolean",function() {
			jasmine.J.expect(0).toBe(0);
			jasmine.J.expect(1).toBe(1);
		});
		jasmine.J.it("should make boolean from int",function() {
			var i = null;
			jasmine.J.expect(i == null?false:i > 0).toBeFalsy();
			jasmine.J.expect(false).toBeFalsy();
			jasmine.J.expect(true).toBeTruthy();
		});
		jasmine.J.it("should make boolean from dynamic",function() {
			jasmine.J.expect(false).toBeFalsy();
			jasmine.J.expect(true).toBeTruthy();
			jasmine.J.expect(false).toBeFalsy();
			jasmine.J.expect(true).toBeTruthy();
			var p = null;
			jasmine.J.expect(p == null).toBeTruthy();
			jasmine.J.expect(p != null).toBeFalsy();
			p = { x : 0.0, y : 0.0};
			jasmine.J.expect(p == null).toBeFalsy();
			jasmine.J.expect(p != null).toBeTruthy();
		});
	});
};
specs.ConversionCoreSpec.__name__ = ["specs","ConversionCoreSpec"];
specs.ConversionCoreSpec.prototype = {
	i: null
	,__class__: specs.ConversionCoreSpec
}
specs.MapSpec = $hxClasses["specs.MapSpec"] = function() {
	jasmine.J.describe("Map",function() {
		var map = new voronoimap.Map({ width : 100.0, height : 100.0});
		map.newIsland(voronoimap.IslandShape.makeRadial(1),1);
		jasmine.J.it("should place points",function() {
			map.go(0,1);
			jasmine.J.expect(map.points.length).toBe(map.NUM_POINTS);
		});
		jasmine.J.it("should improve points",function() {
			map.go(1,2);
			jasmine.J.expect(map.points.length).toBe(map.NUM_POINTS);
		});
		jasmine.J.it("should build a graph",function() {
			map.go(2,3);
			map.assignBiomes();
			jasmine.J.expect(true).toBeTruthy();
		});
		jasmine.J.it("should add features",function() {
			map.go(3,6);
			map.assignBiomes();
			jasmine.J.expect(true).toBeTruthy();
		});
		jasmine.J.it("should add edges",function() {
			var lava = new voronoimap.Lava();
			var roads = new voronoimap.Roads();
			roads.createRoads(map);
			var watersheds = new voronoimap.Watersheds();
			watersheds.createWatersheds(map);
			var noisyEdges = new voronoimap.NoisyEdges();
			noisyEdges.buildNoisyEdges(map,lava,map.mapRandom);
			jasmine.J.expect(roads).not.toBeNull();
			jasmine.J.expect(watersheds).not.toBeNull();
			jasmine.J.expect(noisyEdges).not.toBeNull();
		});
	});
};
specs.MapSpec.__name__ = ["specs","MapSpec"];
specs.MapSpec.prototype = {
	__class__: specs.MapSpec
}
specs.PointCoreSpec = $hxClasses["specs.PointCoreSpec"] = function() {
	jasmine.J.xdescribe("PointCore",function() {
		jasmine.J.it("should interpolate points",function() {
			var a = { x : 0.0, y : 0.0};
			var b = { x : 1.0, y : 1.0};
			var i = as3.ac3core.PointCore.interpolate(a,b,0.5);
			jasmine.J.expect(i.x).toBe(0.5);
			jasmine.J.expect(i.y).toBe(0.5);
			var i1 = as3.ac3core.PointCore.interpolate(a,b,0.0);
			jasmine.J.expect(i1.x).toBe(0);
			jasmine.J.expect(i1.y).toBe(0);
			var i2 = as3.ac3core.PointCore.interpolate(a,b,1.0);
			jasmine.J.expect(i2.x).toBe(1);
			jasmine.J.expect(i2.y).toBe(1);
		});
	});
};
specs.PointCoreSpec.__name__ = ["specs","PointCoreSpec"];
specs.PointCoreSpec.prototype = {
	__class__: specs.PointCoreSpec
}
specs.PrngSpec = $hxClasses["specs.PrngSpec"] = function() {
	jasmine.J.describe("PRNG",function() {
		var random = new de.polygonal.math.PM_PRNG();
		jasmine.J.it("should make floats in range",function() {
			var d = random.nextDoubleRange(-0.4,0.4);
			jasmine.J.expect(d >= -1).toBeTruthy();
			jasmine.J.expect(d <= 1).toBeTruthy();
		});
	});
};
specs.PrngSpec.__name__ = ["specs","PrngSpec"];
specs.PrngSpec.prototype = {
	__class__: specs.PrngSpec
}
specs.VoronoiSpec = $hxClasses["specs.VoronoiSpec"] = function() {
	jasmine.J.describe("Voronoi",function() {
		jasmine.J.it("should make voronoi",function() {
			var r = 1;
			var points = new Array();
			var _g = 0;
			while(_g < 100) {
				var i = _g++;
				var x = 1 + 98 * ((r = r * 16807.0 % 2147483647.0) / 2147483647.0);
				var y = 1 + 98 * ((r = r * 16807.0 % 2147483647.0) / 2147483647.0);
				var p = { x : x, y : y};
				points.push(p);
			}
			var v = new com.nodename.delaunay.Voronoi(points,null,new as3.as3types.Rectangle(0,0,100,100));
			jasmine.J.expect(v).not.toBeNull();
		});
	});
};
specs.VoronoiSpec.__name__ = ["specs","VoronoiSpec"];
specs.VoronoiSpec.prototype = {
	__class__: specs.VoronoiSpec
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
	,createLava: function(map,randomDouble) {
		var edge;
		var _g = 0, _g1 = map.edges;
		while(_g < _g1.length) {
			var edge1 = _g1[_g];
			++_g;
			if(!as3.ac3core.ConversionCore.booleanFromInt(edge1.river) && !edge1.d0.water && !edge1.d1.water && edge1.d0.elevation > 0.8 && edge1.d1.elevation > 0.8 && edge1.d0.moisture < 0.3 && edge1.d1.moisture < 0.3 && randomDouble() < voronoimap.Lava.FRACTION_LAVA_FISSURES) this.lava[edge1.index] = true;
		}
	}
	,__class__: voronoimap.Lava
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
voronoimap.Roads = $hxClasses["voronoimap.Roads"] = function() {
	this.road = [];
	this.roadConnections = [];
};
voronoimap.Roads.__name__ = ["voronoimap","Roads"];
voronoimap.Roads.prototype = {
	road: null
	,roadConnections: null
	,createRoads: function(map) {
		var queue = [];
		var p, q, r, edge, newLevel;
		var elevationThresholds = [0,0.05,0.37,0.64];
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
				newLevel = centerContour[p.index] == null?0:centerContour[p.index];
				while(r1.elevation > elevationThresholds[newLevel] && !r1.water) newLevel += 1;
				if(newLevel < (centerContour[r1.index] == null?999:centerContour[r1.index])) {
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
				cornerContour[q1.index] = Math.min(cornerContour[q1.index] == null?999:cornerContour[q1.index],centerContour[p1.index] == null?999:cornerContour[q1.index]) | 0;
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
voronoimap.Watersheds = $hxClasses["voronoimap.Watersheds"] = function() {
	this.lowestCorner = [];
	this.watersheds = [];
};
voronoimap.Watersheds.__name__ = ["voronoimap","Watersheds"];
voronoimap.Watersheds.prototype = {
	lowestCorner: null
	,watersheds: null
	,createWatersheds: function(map) {
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
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
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
as3.ac3core.NumberCore.MIN_VALUE = 5 * Math.pow(10,-324);
as3.ac3core.NumberCore.MAX_VALUE = 1.7976931348623157 * Math.pow(10,308);
co.janicek.core.math.MathCore.INT32_MAX = 2147483647;
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
com.nodename.delaunay.Node.pool = new Array();
com.nodename.delaunay.Site._pool = new Array();
com.nodename.delaunay.Site.EPSILON = .005;
com.nodename.delaunay.Vertex.VERTEX_AT_INFINITY = new com.nodename.delaunay.Vertex(Math.NaN,Math.NaN);
com.nodename.delaunay.Vertex._pool = new Array();
com.nodename.delaunay.Vertex._nvertices = 0;
com.nodename.geom.Winding.CLOCKWISE = new com.nodename.geom.Winding("clockwise");
com.nodename.geom.Winding.COUNTERCLOCKWISE = new com.nodename.geom.Winding("counterclockwise");
com.nodename.geom.Winding.NONE = new com.nodename.geom.Winding("none");
js.Lib.onerror = null;
voronoimap.Lava.FRACTION_LAVA_FISSURES = 0.2;
voronoimap.NoisyEdges.NOISY_LINE_TRADEOFF = 0.5;
Main.main()
//@ sourceMappingURL=voronoi-map-test.js.map