package voronoimap;

import co.janicek.core.html.CanvasCore;
import co.janicek.core.math.HashCore;
import co.janicek.core.math.RandomCore;
import de.polygonal.math.PM_PRNG;
import haxe.Firebug;
import html5.Canvas;
import html5.CanvasRenderingContext2D;
import html5.File;
import html5.FileList;
import html5.FileReader;
import html5.Image;
import html5.typedArrays.ArrayBuffer;
import js.JQuery;
import js.Lib;
import voronoimap.html.CanvasRender;
import voronoimap.html.Style;

using Math;
using Std;
using co.janicek.core.html.CanvasCore;
using co.janicek.core.StringCore;

class Html {
	public static inline var ID_map = "map";
	
	public static inline var S_addNoise = "#addNoise";
	public static inline var S_fields = "#fields";
	public static inline var S_fieldset = "#fieldset";
	public static inline var S_generate = "#generate";
	public static inline var S_height = "#height";
	public static inline var S_imageFile = "#imageFile";
	public static inline var S_imageThreshold = "#imageThreshold";
	public static inline var S_imageThumb = "#imageThumb";
	public static inline var S_invertImage = "#invertImage";
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
	public static inline var S_viewRivers = "#viewRivers";
	public static inline var S_viewRoads = "#viewRoads";
	public static inline var S_viewWatersheds = "#viewWatersheds";
	public static inline var S_width = "#width";
}

class Main {

	private static var image : Image;
	
	static function main() {
		Firebug.redirectTraces();
		initializeUi();
		generate();
	}
	
	public static function initializeUi():Void {
		image = new Image();
		image.onload = function() {
			new JQuery(Html.S_imageThumb).attr("src", image.src);
			updateThumb();
		}
		image.src = "world-map.jpg";
		
		new JQuery(Html.S_random).click(function(){
			new JQuery(Html.S_seed).val(Std.string(RandomCore.makeRandomSeed()));
		});
		new JQuery(Html.S_shapeRandom).click(function(){
			new JQuery(Html.S_shapeSeed).val(Std.string(RandomCore.makeRandomSeed()));
		});
		
		new JQuery(Html.S_islandShape).change(function(e) {
			new JQuery([Html.S_islandFactor, Html.S_oceanRatio, Html.S_shapeSeed, Html.S_imageThumb, Html.S_invertImage, Html.S_imageThreshold].toString()).parent().hide();
			switch(new JQuery(Html.S_islandShape).val()) {
				case "bitmap": new JQuery([Html.S_imageFile, Html.S_imageThumb, Html.S_invertImage, Html.S_imageThreshold].toString()).parent().show();
				case "noise": new JQuery(Html.S_shapeSeed).parent().show();
				case "perlin": new JQuery([Html.S_oceanRatio, Html.S_shapeSeed].toString()).parent().show();
				case "radial": new JQuery([Html.S_islandFactor, Html.S_shapeSeed].toString()).parent().show();
			}
		});
		
		new JQuery(Html.S_imageFile).change(function(e) {
			trace("file changed");
			var fileUpload:Dynamic = new JQuery(Html.S_imageFile).get()[0];
			var files:FileList = fileUpload.files;
			if (files.length == 1) {
				var file:File = files[0];
				if (StringTools.startsWith(file.type, "image")) {
					CanvasCore.loadFileIntoImage(file, image);
				}
			}
		} );

		new JQuery([Html.S_invertImage, Html.S_imageThreshold].toString()).change(function(e) { updateThumb(); } );
		
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
	
	private static function updateThumb() : Void {
		var threshold = new JQuery(Html.S_imageThreshold).val().parseInt();
		var color1 = Style.displayColors.OCEAN;
		var color2 = Style.displayColors.GRASSLAND;
		if (new JQuery(Html.S_invertImage).is(":checked")) {
			var colorHold = color1;
			color1 = color2;
			color2 = colorHold;
		}
		var thresholdImageData = image.getImageData().makeAverageThresholdImageData(threshold, color1, color2);
		var imageDataUrl = thresholdImageData.makeImageDataUrlFromImageData();
		new JQuery(Html.S_imageThumb).attr("src", imageDataUrl);
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
					var imageData = CanvasCore.getImageData(image);
					trace(new JQuery(Html.S_imageThreshold).val().parseInt());
					var bitmap = CanvasCore.makeAverageThresholdBitmap(imageData, new JQuery(Html.S_imageThreshold).val().parseInt());
					if (new JQuery(Html.S_invertImage).is(":checked")) {
						bitmap = bitmap.invertBitmap();
					}
					map.newIsland(IslandShape.makeBitmap(bitmap), seed);
			case "blob" : map.newIsland(IslandShape.makeBlob(), seed);
			case "noise" : map.newIsland(IslandShape.makeNoise(shapeSeed), seed);
			case "perlin" : map.newIsland(IslandShape.makePerlin(shapeSeed, new JQuery(Html.S_oceanRatio).val().parseFloat()), seed);
			case "radial" :	map.newIsland(IslandShape.makeRadial(shapeSeed, new JQuery(Html.S_islandFactor).val().parseFloat()), seed);
			case "square" :	map.newIsland(IslandShape.makeSquare(), seed);
		}
		
		var watersheds = new Watersheds();
		var noisyEdges = new NoisyEdges();
		var lava = new Lava();
		var roads = new Roads();
		
		map.go0PlacePoints();
		map.go1ImprovePoints();
		map.go2BuildGraph();
		map.go3AssignElevations();
		map.go4AssignMoisture();
		map.go5DecorateMap();
		
		roads.createRoads(map);
		watersheds.createWatersheds(map);
		noisyEdges.buildNoisyEdges(map, lava, new PM_PRNG());
		render(map, noisyEdges, lava, watersheds, roads);
	}
	
	private static function getIntegerOrStringSeed( s : String ) : Int {
		if (s.isInteger()) {
			return s.parseInt();
		}
		
		return RandomCore.stringToSeed(s).abs().int();
	}
	
	private static function render( map : Map, noisyEdges : NoisyEdges, lava : Lava, watersheds : Watersheds, roads : Roads ) : Void {
		var c = getContext();
		CanvasRender.graphicsReset(c, map.SIZE.width.int(), map.SIZE.height.int(), Style.displayColors);
		
		switch (new JQuery(Html.S_view).val()) {
			case "debug polygons":
				CanvasRender.renderDebugPolygons(c, map, Style.displayColors);

			case "smooth":
				CanvasRender.renderPolygons(c, Style.displayColors, null, CanvasRender.colorWithSlope, map, noisyEdges);
				CanvasRender.renderEdges(c, Style.displayColors, map, noisyEdges, lava, new JQuery(Html.S_viewRivers).is(":checked"));
		}
		
		if (new JQuery(Html.S_viewRoads).is(":checked")) {
			CanvasRender.renderRoads(c, map, roads, Style.displayColors);
		}
		
		if (new JQuery(Html.S_viewWatersheds).is(":checked")) {
			CanvasRender.renderWatersheds(c, map, watersheds);
		}
		
		if (new JQuery(Html.S_addNoise).is(":checked")) {
			CanvasCore.addNoiseToCanvas(c, 666, 10, true);
		}
		
	}
	
}