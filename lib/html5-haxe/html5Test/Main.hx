package html5Test;
import haxe.Firebug;
import html5Test.specs.IndexedDBSpec;
import jasmine.Jasmine;

class Main {
	static function main() {
		new Main();
	}
	
	public function new() {
		Firebug.redirectTraces();
		
		new IndexedDBSpec();

		Jasmine.getEnv().addReporter(Jasmine.newTrivialReporter());
		Jasmine.getEnv().execute();
	}
}