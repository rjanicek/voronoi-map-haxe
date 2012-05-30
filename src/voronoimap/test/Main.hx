package voronoimap.test;

import haxe.Firebug;
import jasmine.Jasmine;
import js.Lib;
import voronoimap.test.specs.AS3Spec;
import voronoimap.test.specs.ConversionCoreSpec;
import voronoimap.test.specs.MapSpec;
import voronoimap.test.specs.PointCoreSpec;
import voronoimap.test.specs.PrngSpec;
import voronoimap.test.specs.VoronoiSpec;

/**
 * ...
 * @author Richard Janicek
 */

class Main {
	
	static function main() {
		Firebug.redirectTraces();
		trace(Std.format("Testing..."));

		new AS3Spec();
		new ConversionCoreSpec();
		new PointCoreSpec();
		new PrngSpec();
		new MapSpec();
		new VoronoiSpec();

		Jasmine.getEnv().addReporter(Jasmine.newHtmlReporter());
		Jasmine.getEnv().execute();
		trace("Done testing.");		
	}
	
}