package voronoimap.graph;

import as3.TypeDefs;

class Center {
	public function new() { }
	
    public var index:Int;
  
    public var point:Point;  // location
    public var water:Boolean;  // lake or ocean
    public var ocean:Boolean;  // ocean
    public var coast:Boolean;  // land polygon touching an ocean
    public var border:Boolean;  // at the edge of the map
    public var biome:String;  // biome type (see article)
    public var elevation:Number;  // 0.0-1.0
    public var moisture:Number;  // 0.0-1.0

    public var neighbors:Vector<Center>;
    public var borders:Vector<Edge>;
    public var corners:Vector<Corner>;
}