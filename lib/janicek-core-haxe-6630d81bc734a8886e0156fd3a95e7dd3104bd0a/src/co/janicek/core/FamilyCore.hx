/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package co.janicek.core;

using co.janicek.core.FamilyCore;
using co.janicek.core.LambdaCore;
using Reflect;

/**
 * Functions for objects that have parent / child or tree structures.
 * Objects should have a "parent" object and "children" Array.
 * Lineages are terminated by a null parent.
 * @author Richard Janicek
 */
class FamilyCore {

	/**
	 * Detect the root node.
	 */
	public static function isRoot( node : {parent : Null<Dynamic>} ) : Bool {
		return node.parent == null;
	}

	/**
	 * Get the root node.
	 */
	public static function root<T>( node : T ) : T {
		// TODO: when Haxe >2.10, add type constraint "root<T:{parent:Null<Dynamic>}>( node : T ) : T"
		
		return node.lineage().first(function(n) {
			// TODO: when Haxe >2.10, remove untyped
			return untyped n.parent == null;
		});
	}

	/**
	 * Lineage iterator.
	 * Iterates parent objects until null is reached.
	 * 
	 * 
	 * TODO: Detect and throw on circular references.
	 */
	public static function lineage<T>( node : T ) : Iterable<T> {
		// TODO: when Haxe >2.10, add type constraint "lineage<T : {parent : Null<D>}>( node : T ) : Iterable<T>"
		// see: http://code.google.com/p/haxe/issues/detail?id=516
		
		return { iterator: function() {
			return {
				hasNext : function() : Bool {
					return node != null;
				},
				next : function() : T {
					var current = node;
					// TODO: when haxe >2.10, remove untyped
					untyped node = node.parent;
					return current;
				}
			};
		}};
	}
	
	/**
	 * Family iterator.
	 * Recursively iterates every node in a family including the parent node.
	 * Nodes may have a field called children : Array.
	 */
	public static function family<T>( parent : T ) : Iterable<T> {
		var stack = new Array<T>();
		stack.push(parent);
		return { iterator: function() {
			return {
				hasNext : function() : Bool {
					return stack.length > 0;
				},
				next : function() : T {
					var node = stack.pop();
					if (node.hasField("children")) {
						stack = stack.concat(untyped node.children);
					}
					return node;
				}
			};
		}};
	}
	
	/**
	 * Descendants iterator.
	 * Recursively iterates every node that is a descendant of the parent node.
	 * Nodes may have a field called children : Array.
	 */
	public static function descendants<T>( parent : T ) : Iterable<T> {
		var stack = new Array<T>();
		var loadStack = function(node : T) {
			if (node.hasField("children")) {
				stack = stack.concat(untyped node.children);
			}
		}
		loadStack(parent);
		return { iterator: function() {
			return {
				hasNext : function() : Bool {
					return stack.length > 0;
				},
				next : function() : T {
					var n = stack.pop();
					loadStack(n);
					return n;
				}
			};
		}};
	}

}