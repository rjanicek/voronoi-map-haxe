package jasmine;
import js.Lib;

/**
 * @link http://pivotal.github.com/jasmine/jsdoc/index.html
 */

class Jasmine {
	public static function getEnv() : Env untyped {
		return jasmine.getEnv();
	}
	
	public static function newTrivialReporter() : Reporter {
		return untyped __js__("new jasmine.TrivialReporter()");
	}
	
	public static function createSpy( name : String ) : Spy untyped {
		return jasmine.createSpy(name);
	}
}