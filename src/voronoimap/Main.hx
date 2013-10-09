package voronoimap;

import co.janicek.core.html.CanvasCore;
import co.janicek.core.html.HtmlColorCore;
import co.janicek.core.math.RandomCore;
import de.polygonal.math.PM_PRNG;
import haxe.Timer;
import html5.Canvas;
import html5.CanvasRenderingContext2D;
import html5.File;
import html5.FileList;
import html5.FileReader;
import html5.Image;
import html5.typedArrays.ArrayBuffer;
import js.Browser;
import js.JQuery;
import js.Lib;
import voronoimap.html.CanvasRender;
import voronoimap.html.Style;

using Lambda;
using Math;
using Std;
using co.janicek.core.html.CanvasCore;
using co.janicek.core.StringCore;

class Html {
	public static inline var ID_map = "map";
	
	public static inline var S_addNoise = "#addNoise";
	public static inline var S_edgeNoise = "#edgeNoise";
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
	public static inline var S_numberOfLands = "#numberOfLands";
	public static inline var S_numberOfPoints = "#numberOfPoints";
	public static inline var S_oceanRatio = "#oceanRatio";
	public static inline var S_random = "#random";
	public static inline var S_riverChance = "#riverChance";
	public static inline var S_roadElevationThresholds = "#roadElevationThresholds";
	public static inline var S_seed = "#seed";
	public static inline var S_shapeRandom = "#shapeRandom";
	public static inline var S_shapeSeed = "#shapeSeed";
	public static inline var S_toggle = "#toggle";
	public static inline var S_view = "#view";
	public static inline var S_viewBridges = "#viewBridges";
	public static inline var S_viewEdges = "#viewEdges";
	public static inline var S_viewRivers = "#viewRivers";
	public static inline var S_viewRoads = "#viewRoads";
	public static inline var S_viewWatersheds = "#viewWatersheds";
	public static inline var S_width = "#width";
}

typedef State = {
	map : Map,
	noisyEdges : NoisyEdges,
	roads : Roads,
	watersheds : Watersheds,
	lava : Lava
}

class Main {

	private static var image : Image;
	private static var state : State;
	
	static function main() {
		initializeUi();
		state = generate();
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
			new JQuery([Html.S_islandFactor, Html.S_oceanRatio, Html.S_shapeSeed, Html.S_imageFile, Html.S_imageThumb, Html.S_invertImage, Html.S_imageThreshold].toString()).parent().hide();
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
		
		new JQuery(Html.S_width).val(Std.string(Browser.window.innerWidth));
		new JQuery(Html.S_height).val(Std.string(Browser.window.innerHeight));
		
		new JQuery(Html.S_view).change(function(e) {
			switch(new JQuery(Html.S_view).val()) {
				case "debug polygons": new JQuery(Html.S_addNoise).removeAttr("checked");
				case "smooth": new JQuery(Html.S_addNoise).attr("checked", "true");
			}
		});
		
		new JQuery([Html.S_view, Html.S_viewRivers, Html.S_viewRoads, Html.S_viewBridges, Html.S_viewWatersheds, Html.S_viewEdges, Html.S_addNoise].toString()).change(function(e) {
			render(state);
		});

		new JQuery(Html.S_viewRoads).change(function(e) {
			new JQuery(Html.S_roadElevationThresholds).parent().toggle();
		});
		
		new JQuery(Html.S_generate).click(function() { state = generate(); } );
		
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
		var canvas:Canvas = cast Browser.document.getElementById(Html.ID_map);
		return canvas.getContext("2d");
	}
	
	private static function findOrCreateCanvas():Canvas {
		var canvas:Canvas = cast Browser.document.getElementById(Html.ID_map);
		if (canvas == null) {
			canvas = cast Browser.document.createElement("canvas");
			canvas.id = Html.ID_map;
			Browser.document.body.appendChild(canvas);
		}
		
		return canvas;
	}
	
	public static function generate() : State {
		var start = Timer.stamp();		
		var state = { map : null, noisyEdges : null, roads : null, watersheds : null, lava : null };
		
		var canvas = findOrCreateCanvas();
		canvas.width = new JQuery(Html.S_width).val().parseInt();
		canvas.height = new JQuery(Html.S_height).val().parseInt();
		
		state.map = new Map( { width:canvas.width + 0.0, height:canvas.height + 0.0 });
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
					state.map.newIsland(IslandShape.makeBitmap(bitmap), seed);
			case "blob" : state.map.newIsland(IslandShape.makeBlob(), seed);
			case "noise" : state.map.newIsland(IslandShape.makeNoise(shapeSeed), seed);
			case "perlin" : state.map.newIsland(IslandShape.makePerlin(shapeSeed, new JQuery(Html.S_oceanRatio).val().parseFloat()), seed);
			case "radial" :	state.map.newIsland(IslandShape.makeRadial(shapeSeed, new JQuery(Html.S_islandFactor).val().parseFloat()), seed);
			case "square" :	state.map.newIsland(IslandShape.makeSquare(), seed);
		}
		
		state.watersheds = new Watersheds();
		state.noisyEdges = new NoisyEdges();
		state.lava = new Lava();
		state.roads = new Roads();
		
		var numberOfLands = new JQuery(Html.S_numberOfLands).val();
		if (numberOfLands.isInteger()) {
			Map.tryMutateMapPointsToGetNumberLands(state.map, numberOfLands.parseInt(), 30, numberOfLands.parseInt() * 2);
		}
		else {
			state.map.go0PlacePoints(new JQuery(Html.S_numberOfPoints).val().parseInt());
			state.map.go1ImprovePoints(new JQuery(Html.S_lloydIterations).val().parseInt());
			state.map.go2BuildGraph();
			state.map.go3AssignElevations(new JQuery(Html.S_lakeThreshold).val().parseFloat());
		}
		state.map.go4AssignMoisture(new JQuery(Html.S_riverChance).val().parseInt());
		state.map.go5DecorateMap();
		
		var thresholds = new JQuery(Html.S_roadElevationThresholds).val().split(",").map(Std.parseFloat.bind()).array();
		state.roads.createRoads(state.map, thresholds);
		state.watersheds.createWatersheds(state.map);
		state.noisyEdges.buildNoisyEdges(state.map, state.lava, seed, new JQuery(Html.S_edgeNoise).val().parseFloat());
		
		var generateMs = Std.int((Timer.stamp() - start) * 1000);
		new JQuery('#generateMs').text(Std.string(generateMs));
		start = Timer.stamp();
		
		render(state);
		
		var renderMs = Std.int((Timer.stamp() - start) * 1000);
		new JQuery('#renderMs').text(Std.string(renderMs));
		
		new JQuery('#totalMs').text(Std.string(renderMs + generateMs));
		
		return state;
	}
	
	private static function getIntegerOrStringSeed( s : String ) : Int {
		if (s.isInteger()) {
			return s.parseInt();
		}
		
		return RandomCore.stringToSeed(s).abs().int();
	}
	
	private static function render( state : State ) : Void {
		var c = getContext();
		CanvasRender.graphicsReset(c, state.map.SIZE.width.int(), state.map.SIZE.height.int(), Style.displayColors);
		switch (new JQuery(Html.S_view).val()) {
			case "debug polygons":
				CanvasRender.renderDebugPolygons(c, state.map, Style.displayColors);

			case "smooth":
				CanvasRender.renderPolygons(c, Style.displayColors, null, CanvasRender.colorWithSlope, state.map, state.noisyEdges);
				CanvasRender.renderEdges(c, Style.displayColors, state.map, state.noisyEdges, state.lava,
					new JQuery(Html.S_viewRivers).is(":checked"));
		}

		if (new JQuery(Html.S_viewEdges).is(":checked")) {
			CanvasRender.renderAllEdges(c, HtmlColorCore.rgba(0xd0, 0xd0, 0xd0, 0.25), state.map, state.noisyEdges);
		}

		if (new JQuery(Html.S_viewRoads).is(":checked")) {
			CanvasRender.renderRoads(c, state.map, state.roads, Style.displayColors);
		}
		
		if (new JQuery(Html.S_viewBridges).is(":checked")) {
			CanvasRender.renderBridges(c, state.map, state.roads, Style.displayColors);
		}
		
		if (new JQuery(Html.S_viewWatersheds).is(":checked")) {
			CanvasRender.renderWatersheds(c, state.map, state.watersheds);
		}
		
		if (new JQuery(Html.S_addNoise).is(":checked")) {
			CanvasCore.addNoiseToCanvas(c, 666, 10, true);
		}
	}
	
}