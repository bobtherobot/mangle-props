(function(){

var Klass = function(){
	var local = bob();
	this._propD = local;
}

var p = Klass.prototype;
	p.propA = "prop A ";
	p._propB = "prop B ";
	p.propC = "prop C ";
	p._propD = "prop D ";
	
	var locA = "local A ";
	var _locB = "local B ";
	var locC = "local C ";
	var _locD = "local D ";
	
	var obj = {
		objA : "object A ",
		_objB : "object B ",
		objC : "object C ",
		_objD : "object D "
	}
	
	function _sally(){
		var objStr = "";
		for(var prop in obj){
			objStr += prop + " : " + obj[prop];
		}
		return locA + _locB + locC + _locD + objStr;
	}
	
	function bob(arg){
		return _sally() + arg;
	}
	
	window.Klass = Klass;
	
})();
