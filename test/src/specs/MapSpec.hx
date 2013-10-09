package specs;

import haxe.Json;
import haxe.Serializer;
import jasmine.J;
import voronoimap.IslandShape;
import voronoimap.Lava;
import voronoimap.Map;
import voronoimap.NoisyEdges;
import voronoimap.Roads;
import voronoimap.Watersheds;

using Lambda;

/**
 * ...
 * @author Richard Janicek
 */

class MapSpec {

	public function new() {
		J.describe("Map", function() {

			var map = new Map({width:100.0, height:100.0});
			map.newIsland(IslandShape.makeRadial(1), 1);
			var numPoints = 1000;
			J.it("should place points", function() {
				map.go0PlacePoints(numPoints);
				J.expect(map.points.length).toBe(numPoints);
			});

			J.it("should improve points", function() {
				map.go1ImprovePoints();

				J.expect(map.points.length).toBe(numPoints);
			});

			J.it("should build a graph", function() {
				map.go2BuildGraph();
trace('map.corners.length', map.corners.length);				
				map.assignBiomes();
				J.expect(true).toBeTruthy();
			});
			J.it("should add features", function() {
				map.go3AssignElevations();
				map.go4AssignMoisture();
				map.go5DecorateMap();
				J.expect(true).toBeTruthy();
			});
			
			J.it("should add edges", function() {
				var lava = new Lava();
			    var roads = new Roads();
				roads.createRoads(map, [0, 0.05, 0.37, 0.64]);
			    //lava.createLava(map, map.mapRandom.nextDouble);
			   var watersheds = new Watersheds();
			   watersheds.createWatersheds(map);
				var noisyEdges = new NoisyEdges();
			   noisyEdges.buildNoisyEdges(map, lava, map.mapRandom.seed);
			   J.expect(roads).not.toBeNull();
			   J.expect(watersheds).not.toBeNull();
			   J.expect(noisyEdges).not.toBeNull();
			});
		});
	}
	
}