package voronoimap.graph;

import as3.as3types.TypeDefs;

class Corner {
	public function new() { }
	
    public var index:Int;
  
    public var point:Point;  // location
    public var ocean:Boolean;  // ocean
    public var water:Boolean;  // lake or ocean
    public var coast:Boolean;  // touches ocean and land polygons
    public var border:Boolean;  // at the edge of the map
    public var elevation:Number;  // 0.0-1.0
    public var moisture:Number;  // 0.0-1.0

    public var touches:Vector<Center>;
    public var protrudes:Vector<Edge>;
    public var adjacent:Vector<Corner>;
  
    public var river:Int;  // 0 if no river, or volume of water in river
    public var downslope:Corner;  // pointer to adjacent corner most downhill
    public var watershed:Corner;  // pointer to coastal corner, or null
    public var watershed_size:Int;
}