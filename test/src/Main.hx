import haxe.Firebug;
import jasmine.Jasmine;
import js.Lib;
import specs.AS3Spec;
import specs.ConversionCoreSpec;
import specs.MapSpec;
import specs.PointCoreSpec;
import specs.PrngSpec;
import specs.VoronoiSpec;

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