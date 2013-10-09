janicek-core-haxe
-----------------

My personal collection of Haxe core libraries.

Functional style preferred:
* Modularity through simple data types and simple functions.
* Functions are organized into "core" libraries using static classes.
* Libraries are designed to be used as mix-ins.
* Favor pure functions, avoid state and side effects.
* Favor readability and modularity over performance.
* Functions that take many parameters are ok.
* Favor passing parameters by value, and immutability.
* Functions that have reference parameter types can mutate the parameters, but should always return the mutated parameter reference. Callers of these functions should not depend on the parameter mutations but should only depend on the returned values. This will make it easier to add immutability should Haxe ever support it without sacrificing performance now.

Tested with Haxe 3.0, JavaScript, and Node.js.

See [spec classes](https://github.com/rjanicek/janicek-core-haxe/tree/master/test/src/specs/co/janicek/core) for examples of how to use the libraries.

API docs -> http://rjanicek.github.com/janicek-core-haxe/api

browser tests -> http://rjanicek.github.com/janicek-core-haxe

GitHub -> https://github.com/rjanicek/janicek-core-haxe

###Examples
```haxe
using co.janicek.core.FamilyCore;
using co.janicek.core.LambdaCore;
using co.janicek.core.NullCore;
using co.janicek.core.StringCore;
using Lambda;

class MainDemo{
	public static function main() {
		
		trace("NullCore".isNull());							// false
		trace("NullCore".isNotNull());						// true
		trace(NullCore.coalesce(null, "Hobbit"));			// Hobbit
		trace([null, "Bilbo", "Hobbit"].coalesceIter());	// Bilbo
		
		var hobbit : {name : String, parent : Dynamic, children : Array<Dynamic>} = null;
		
		if (hobbit.isNull()) {
			hobbit = {
				name : "Drogo",
				parent : null,
				children: []
			};
		}
		
		var frodo = {
			name : "Frodo",
			parent : hobbit
		}
		
		hobbit.children.push(frodo);
		
		trace(hobbit.family().count());			// 2
		trace(hobbit.descendants().count());	// 1
		trace(frodo.lineage().count());			// 2
		trace(frodo.lineage().map(function(h) { return h.name; } ).array());				// [ 'Frodo', 'Drogo' ]
		trace(hobbit.family().first(function(h) { return h.name.contains("odo"); }).name);	// Frodo
		
	}
}
```