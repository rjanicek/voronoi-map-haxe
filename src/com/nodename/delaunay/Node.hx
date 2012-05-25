package com.nodename.delaunay;

import as3.as3types.TypeDefs;

class Node {
	public static var pool:Vector<Node> = new Vector<Node>();
	public var parent:Node;
	public var treeSize:Int;
	public function new() {}
}