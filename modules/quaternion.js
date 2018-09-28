// degree to radians constant
var rd = Math.PI / 180.0;

// Quaternion [w, x, y, z] library
var Quaternion = {
    cacheSize: 64,
    cache: [ ],
    clear: function() {
        this.cache = [ ];
    },
    new: function(w, x, y, z) {
		if (this.cache.length) 
		{
			console.log("pop");
            return this.cache.pop().setWXYZ(w, x, y, z);
        } else {
            return new Float32Array([ w || 0, x || 0, y || 0, z || 0 ]);
        }
    }
};



// push vector into cache stack for reusability
Float32Array.prototype.delete = function() {
    if (Quaternion.cache.length >= Quaternion.cacheSize) return;
    Quaternion.cache.push(this);
};


// clone
Float32Array.prototype.clone = function() {
    return Quaternion.new(this[0], this[1], this[2], this[3]);
};




Float32Array.prototype.setWXYZ = function (w, x, y, z)
{
	console.log("Set wxyz z ", z)
	this[0] = w || 0;
    this[1] = x || 0;
    this[2] = y || 0;
	this[3] = z || 0;
    return this;
};



// length
Float32Array.prototype.len = function() {
    return Math.sqrt((this[0] * this[0]) + (this[1] * this[1]));
};


module.exports = Quaternion;
