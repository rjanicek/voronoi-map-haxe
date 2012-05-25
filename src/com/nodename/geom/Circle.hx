package com.nodename.geom;

import as3.as3types.TypeDefs;

class Circle {

	public var center:Point;
	public var radius:Number;
	
	public function new(centerX:Number, centerY:Number, radius:Number)
	{
		this.center = {x:centerX, y:centerY};
		this.radius = radius;
	}
	
	public function toString():String
	{
		return "Circle (center: " + center + "; radius: " + radius + ")";
	}
	
}