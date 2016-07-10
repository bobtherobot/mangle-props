# Mangle Properties
------------------------
By Mike Gieson [www.gieson.com](http://www.gieson.com "www.gieson.com")

Compresses / minifies / mangles javascript property names.

Mangle-props works with any javascript compress / minify package (not just UglifyJs), because I'm using a separate AST parser (Falafal).

Mangling is conducted on strings (not files). In other words, you're feeding mangle-props a string and receiving a mangled string in return. You're responsible for managing how the javascript files are opened and saved.

Since I couldn't get UglifyJs's mangle properties options to work, this script deals with property mangling separately in a way that's straight-forward, simple (and works).  

## Usage

Usage is pretty straigh-forward:
```
mangle(string [, regex, regexOptions]);
```

> **regex** : a regex pattern WITHOUT the opening /and/ closing slashes
>       Example: "^_" will search for identifiers that begin with and underscore
> **regexOptions** : Regex options such as ignore case (i), multi-line(m). These are kinda useless since variable/properties generally are single words, but it's there for you if you need it. Example: "im"
> **returns** : string

Here's and example of how to use Mangle-props with UglifyJs:
```
var fs = require("fs");
var ugly = require("uglify-js");
var mangle = require("mangle-props");

var path = "/Users/bob/Desktop/test/test.js";

// Open the javascript file:
var src = fs.readFileSync(path, "UTF-8");

// First pass using uglify
var ug = ugly.minify(src, {
	compress: true,
	fromString : true
});

// Second pass to mangle the properties
var result = mangle(ug.code, "^_");

// Save the results
var lastDot = path.lastIndexOf(".");
var outPath = path.substr(0, lastDot+1) + "min" + path.substr(lastDot);
fs.writeFileSync(outPath, result, "UTF-8");
```


Here's en example javascript that uses "_" to represent "private" variables:

```
(function(){
var Klass = function(){
	this.propA = "prop A ";
	this._propB = "prop B ";
	this.propC = "prop C ";
	this._propD = "prop D ";
}

var p = Klass.prototype;

	p.propA = "prop A ";
	p._propB = "prop B ";
	p.propC = "prop C ";
	p._propD = "prop D ";
	
	window.Klass = Klass;
	
})();
```

Using mangle-props, we can set the "regex" pattern to "^_" so that all the properties that begin with "_" will be mangled -- leaving others alone.

The resulting code would read as:

```
(function(){
var Klass = function(){
	this.propA = "prop A ";
	this.y = "prop B ";
	this.propC = "prop C ";
	this.z = "prop D ";
}

var p = Klass.prototype;

	p.propA = "prop A ";
	p.y = "prop B ";
	p.propC = "prop C ";
	p.z = "prop D ";
	
	window.Klass = Klass;
	
})();
```
Where mangle replaced _propB with a random character, in this example "x". Likewise _propD was repalced throughout the script with "z".

Mangle also replaced literal object properties as well. Example:
```
var obj = {
		objA : "object A ",
		_objB : "object B ",
		objC : "object C ",
		_objD : "object D "
	}
```

After using mangle(str, "^_"), the object would read as:
```
var obj = {
		objA : "object A ",
		y : "object B ",
		objC : "object C ",
		z : "object D "
	}
```

Where "y" and "z" are replacements made by mangle-props.




