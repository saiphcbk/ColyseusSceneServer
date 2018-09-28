// degree to radians constant
var rd = Math.PI / 180.0;

// 3d vector [x, y, z] library
var Vec3 = {
    cacheSize: 64,
    cache: [ ],
    clear: function() {
        this.cache = [ ];
    },
    new: function(x, y, z) {
        if (this.cache.length) {
            return this.cache.pop().setXYZ(x, y, z);
        } else {
            return new Float32Array([ x || 0, y || 0, z || 0 ]);
        }
    }
};



// push vector into cache stack for reusability
Float32Array.prototype.delete = function() {
    if (Vec3.cache.length >= Vec3.cacheSize) return;
    Vec3.cache.push(this);
};


// clone
Float32Array.prototype.clone = function() {
    return Vec3.new(this[0], this[1], this[2]);
};




Float32Array.prototype.setXYZ = function (x, y, z)
{
	console.log("Set xyz");
    this[0] = x || 0;
    this[1] = y || 0;
	this[2] = z || 0;
    return this;
};



// length
Float32Array.prototype.len = function() {
    return Math.sqrt((this[0] * this[0]) + (this[1] * this[1]));
};


module.exports = Vec3;
