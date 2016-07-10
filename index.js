
//             ___                            
//     _____  |__| ___   ____   __   _.___
//   /  __  \|  |/ __ \|  ___|/   \ |     \ 
//  |  |_|  |  |  ___/ \___  |  |  |   |  |
//  \___   |__|\_____ \____/ \___/|___|__|
// |______|                     
//              www.gieson.com
// 
// ------------------------------------------
// Mangle
// Mangles javascript properties.
// ------------------------------------------
// v1.0
// Copyright (c) 2016 Mike Gieson. 
// MIT license.
// ------------------------------------------




var falafel = require('falafel');
var replacers = require("./replacements").replacements;


function mangle (sample, rex, ropts){
	
 	rex = rex || "^_";
	rex = new RegExp(rex, ropts);

	var out = "";
	var ifire = "Identifier";

	var existing = [];
	var matches = [];
	falafel(sample, function (node) {
	
		if(node.type == ifire){
			var name = node.name;
			if( rex.test(name) ) {
			//if(name.substr(0, 1) == "_"){
				matches.push(name);
			}
			existing.push(name);
		}
	
	});

	var clean = [];
	for(var i=0; i<matches.length; i++){
		var item = matches[i];
		if(clean.indexOf(item) < 0){
			clean.push(item);
		}
	}

	clean.sort();
	clean.reverse();

	var existingClean = [];
	for(var i=0; i<existing.length; i++){
		var item = existing[i];
		if(existingClean.indexOf(item) < 0){
			existingClean.push(item);
		}
	}

	clean.sort();
	clean.reverse();

	var mapped = {};
	var overrun = 0;
	for(var i=0; i<clean.length; i++){
		var replaceWith = replacers.shift();
		while(existingClean.indexOf(replaceWith) > -1){
			replaceWith = replacers.shift();
			overrun++;
			if(overrun > 1000){
				break;
			}
		}
		mapped[clean[i]] = replaceWith;
	}




	var output = falafel(sample, function (node) {
	
		if(node.type == ifire){
			var name = node.name;
			if( rex.test(name) ) {
			//if(name.substr(0, 1) == "_"){
				node.update(mapped[name]);
			}
		}
	
	});
	
	return output;

}



module.exports = mangle;

