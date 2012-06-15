package voronoimap;

import co.janicek.core.html.CanvasCore;
import co.janicek.core.math.HashCore;
import co.janicek.core.math.RandomCore;
import de.polygonal.math.PM_PRNG;
import haxe.Firebug;
import html5.Canvas;
import html5.CanvasRenderingContext2D;
import js.JQuery;
import js.Lib;
import voronoimap.html.CanvasRender;
import voronoimap.html.Style;

using Std;
using co.janicek.core.StringCore;

class Html {
	public static inline var ID_map = "map";
	
	public static inline var S_addNoise = "#addNoise";
	public static inline var S_bitmapUrl = "#bitmapUrl";
	public static inline var S_fields = "#fields";
	public static inline var S_fieldset = "#fieldset";
	public static inline var S_generate = "#generate";
	public static inline var S_height = "#height";
	public static inline var S_islandFactor = "#islandFactor";
	public static inline var S_islandShape = "#islandShape";
	public static inline var S_lakeThreshold = "#lakeThreshold";
	public static inline var S_lloydIterations = "#lloydIterations";
	public static inline var S_map = "#" + ID_map;
	public static inline var S_numberOfPoints = "#numberOfPoints";
	public static inline var S_oceanRatio = "#oceanRatio";
	public static inline var S_random = "#random";
	public static inline var S_riverChance = "#riverChance";
	public static inline var S_seed = "#seed";
	public static inline var S_shapeRandom = "#shapeRandom";
	public static inline var S_shapeSeed = "#shapeSeed";
	public static inline var S_toggle = "#toggle";
	public static inline var S_view = "#view";
	public static inline var S_width = "#width";
}

class Main {
	
	static function main() {
		Firebug.redirectTraces();
		initializeUi();
		generate();
	}
	
	public static function initializeUi():Void {
		new JQuery(Html.S_random).click(function(){
			new JQuery(Html.S_seed).val(Std.string(RandomCore.makeRandomSeed()));
		});
		new JQuery(Html.S_shapeRandom).click(function(){
			new JQuery(Html.S_shapeSeed).val(Std.string(RandomCore.makeRandomSeed()));
		});
		
		new JQuery(Html.S_islandShape).change(function(e) {
			new JQuery([Html.S_islandFactor, Html.S_oceanRatio, Html.S_shapeSeed, Html.S_bitmapUrl].toString()).parent().hide();
			switch(new JQuery(Html.S_islandShape).val()) {
				case "bitmap": new JQuery(Html.S_bitmapUrl).parent().show();
				case "perlin": new JQuery([Html.S_oceanRatio, Html.S_shapeSeed].toString()).parent().show();
				case "radial": new JQuery([Html.S_islandFactor, Html.S_shapeSeed].toString()).parent().show();
			}
		});
		
		new JQuery(Html.S_width).val(Std.string(Lib.window.innerWidth));
		new JQuery(Html.S_height).val(Std.string(Lib.window.innerHeight));
		
		new JQuery(Html.S_view).change(function(e) {
			switch(new JQuery(Html.S_view).val()) {
				case "debug polygons": new JQuery(Html.S_addNoise).removeAttr("checked");
				case "smooth": new JQuery(Html.S_addNoise).attr("checked", "true");
			}
		});
		
		new JQuery(Html.S_generate).click(generate);
		
		new JQuery(Html.S_toggle).click(function() {
			var fields = new JQuery(Html.S_fields);
			fields.toggle(500, function(){
				new JQuery(Html.S_toggle).text(fields.is(":visible") ? "hide" : "show");
			});
		});
	}	
	
	public static function getContext():CanvasRenderingContext2D {
		var canvas:Canvas = cast Lib.document.getElementById(Html.ID_map);
		return canvas.getContext("2d");
	}
	
	private static function findOrCreateCanvas():Canvas {
		var canvas:Canvas = cast Lib.document.getElementById(Html.ID_map);
		if (canvas == null) {
			canvas = cast Lib.document.createElement("canvas");
			canvas.id = Html.ID_map;
			Lib.document.body.appendChild(canvas);
		}
		
		return canvas;
	}
	
	public static function generate() {
		var canvas = findOrCreateCanvas();
		canvas.width = new JQuery(Html.S_width).val().parseInt();
		canvas.height = new JQuery(Html.S_height).val().parseInt();
		
		var map = new Map( { width:canvas.width + 0.0, height:canvas.height + 0.0 },
			new JQuery(Html.S_numberOfPoints).val().parseInt(),
			new JQuery(Html.S_lakeThreshold).val().parseFloat(),
			new JQuery(Html.S_lloydIterations).val().parseInt(), 
			new JQuery(Html.S_riverChance).val().parseInt());
		
		var seed = getIntegerOrStringSeed(new JQuery(Html.S_seed).val());
		var shapeSeed = getIntegerOrStringSeed(new JQuery(Html.S_shapeSeed).val());
		
		var islandShape = new JQuery(Html.S_islandShape).val();
		
		switch(islandShape) {
			case "bitmap" :
				CanvasCore.loadImage(new JQuery(Html.S_bitmapUrl).val(), function(image) {
					var imageData = CanvasCore.getImageData(image);
					var bitmap = CanvasCore.makeAverageThresholdBitmap(imageData, 127, true);
					map.newIsland(IslandShape.makeBitmap(bitmap), 1);
					buildMapAndRender(map);
				});
			case "blob" : map.newIsland(IslandShape.makeBlob(), seed);
			case "perlin" : map.newIsland(IslandShape.makePerlin(shapeSeed, new JQuery(Html.S_oceanRatio).val().parseFloat()), seed);
			case "radial" :	map.newIsland(IslandShape.makeRadial(shapeSeed, new JQuery(Html.S_islandFactor).val().parseFloat()), seed);
			case "square" :	map.newIsland(IslandShape.makeSquare(), seed);
		}
		
		if (islandShape != "bitmap") {
			buildMapAndRender(map);
		}
	}
	
	private static function getIntegerOrStringSeed( s : String ) : Int {
		if (s.isInteger()) {
			return s.parseInt();
		}
		
		return RandomCore.stringToSeed(s);
	}
	
	private static function buildMapAndRender(map:Map) {
		var noisyEdges = new NoisyEdges();
		var lava = new Lava();
		
		map.go(0, 1);
		map.go(1, 2);
		map.go(2, 3);
		map.assignBiomes();
		map.go(3, 6);
		map.assignBiomes();
		noisyEdges.buildNoisyEdges(map, lava, new PM_PRNG());
		render(map, noisyEdges, lava);
	}	
	
	private static function render(map:Map, noisyEdges:NoisyEdges, lava:Lava):Void {
		var c = getContext();
		CanvasRender.graphicsReset(c, map.SIZE.width.int(), map.SIZE.height.int(), Style.displayColors);
		
		switch (new JQuery(Html.S_view).val()) {
			case "debug polygons":
				CanvasRender.renderDebugPolygons(c, map, Style.displayColors);
			case "smooth":
				CanvasRender.renderPolygons(c, Style.displayColors, null, CanvasRender.colorWithSlope, map, noisyEdges);
				CanvasRender.renderEdges(c, Style.displayColors, map, noisyEdges, lava);
		}
		
		if (new JQuery(Html.S_addNoise).is(":checked")) {
			CanvasCore.addNoiseToCanvas(c, map.SIZE.width, map.SIZE.height, 666, 10, true);
		}		
		
	}
	
}