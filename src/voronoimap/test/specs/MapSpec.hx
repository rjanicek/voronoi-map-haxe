package voronoimap.test.specs;

import jasmine.J;
import voronoimap.Map;

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

			J.it("should place points", function() {
				map.go(0, 1);
				J.expect(map.points.length).toBe(map.NUM_POINTS);
			});
			
			J.it("should improve points", function() {
				map.go(1, 2);
				J.expect(map.points.length).toBe(map.NUM_POINTS);
			});

			J.it("should build a graph", function() {
				map.go(2, 3);
				map.assignBiomes();
				J.expect(true).toBeTruthy();
			});

			J.it("should add features", function() {
				map.go(3, 6);
				map.assignBiomes();
				J.expect(true).toBeTruthy();
			});
			
			J.it("should add edges", function() {
				var lava = new Lava();
			    var roads = new Roads();
				roads.createRoads(map);
			    //lava.createLava(map, map.mapRandom.nextDouble);
			   var watersheds = new Watersheds();
			   watersheds.createWatersheds(map);
				var noisyEdges = new NoisyEdges();
			   noisyEdges.buildNoisyEdges(map, lava, map.mapRandom);
			   J.expect(roads).not.toBeNull();
			   J.expect(watersheds).not.toBeNull();
			   J.expect(noisyEdges).not.toBeNull();
			});
		});
	}
	
}