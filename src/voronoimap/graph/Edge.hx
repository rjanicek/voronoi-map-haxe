package voronoimap.graph;

import as3.as3types.TypeDefs;

class Edge {
	public function new () { }
	
    public var index:Int;
    public var d0:Center; public var d1:Center;  // Delaunay edge
    public var v0:Corner; public var v1:Corner;  // Voronoi edge
    public var midpoint:Point;  // halfway between v0,v1
    public var river:Int;  // volume of water, or 0
}