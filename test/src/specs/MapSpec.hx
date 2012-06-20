package specs;

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

			J.it("should place points", function() {
				map.go0PlacePoints();
				J.expect(map.points.length).toBe(map.NUM_POINTS);
			});
			
			J.it("should improve points", function() {
				map.go1ImprovePoints();
				J.expect(map.points.length).toBe(map.NUM_POINTS);
			});

			J.it("should build a graph", function() {
				map.go2BuildGraph();
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