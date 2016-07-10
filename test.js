var fs = require("fs");
var mangle = require("./index.js");


// Open the javascript file:
var path = "./example.js";
var src = fs.readFileSync(path, "UTF-8");

// Mangle properties
var result = mangle(src, "^_");

// Save the results
var lastDot = path.lastIndexOf(".");
var outPath = path.substr(0, lastDot+1) + "min" + path.substr(lastDot);
fs.writeFileSync(outPath, result, "UTF-8");

