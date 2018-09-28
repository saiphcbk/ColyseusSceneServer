'use strict';

var Vec3 = require('./vec3');

var hologramIds = 0;


function Hologram(args) 
{
	this.deleted = false;
	this.id = ++hologramIds;
	this.pos = Vec3.new(args.x, args.y, args.z);

	//console.log("Create rotation: ", args.rw, args.rx, args.ry, args.rz);
	this.rot = Vec3.new(args.rx, args.ry, args.rz);
	this.rotw = args.rw;
	//console.log("rotation created: ", parseFloat(this.rot[3].toFixed(2), 10));

	this.scl = Vec3.new(args.sx, args.sy, args.sz);
	this.holoName = args.holoName;
	this.localResource = args.isLocal;
	this.URI = args.URI;
	this.Server_ID = args.Server_ID;
	this.Hash = args.Hash;
	this.UID = args.UID;
	this.Parent = args.Parent;
	this.OnClick = args.OnClick;
	this.visible = true;
	
}


Hologram.prototype.delete = function() 
{
	if (this.deleted)
		return;

	this.deleted = true;
	this.pos.delete();
};


Hologram.prototype.update = function() 
{
    if (this.deleted) return;
};


Hologram.prototype.toJSON = function() 
{
	//console.log("rotation: ", parseFloat(this.rot[0].toFixed(2), 10) + "," + parseFloat(this.rot[1].toFixed(2), 10) + "," + parseFloat(this.rot[2].toFixed(2), 10));
	try
	{
	var obj = {
    id: this.id,
    x: 0,
    y: 0,
	z: 0,
	position: parseFloat(this.pos[0].toFixed(2), 10) + "," + parseFloat(this.pos[1].toFixed(2), 10) + "," + parseFloat(this.pos[2].toFixed(2), 10),
	rotation: parseFloat(this.rotw.toFixed(2), 10) + "," + parseFloat(this.rot[0].toFixed(2), 10) + "," + parseFloat(this.rot[1].toFixed(2), 10) + "," + parseFloat(this.rot[2].toFixed(2), 10),
	scale: parseFloat(this.scl[0].toFixed(2), 10) + "," + parseFloat(this.scl[1].toFixed(2), 10) + "," + parseFloat(this.scl[2].toFixed(2), 10),
	holoName: this.holoName,
	localResource: this.localResource,
	uri: this.URI,
	server_id: this.Server_ID,
	asset_hash: this.Hash,
	UID: this.UID,
	parentUID: this.Parent,
	visible: this.visible
		};
	}
	catch (err)
	{
		console.log("id: ", this.id);
		console.log("rotation: ", parseFloat(this.rot[0].toFixed(2), 10) + "," + parseFloat(this.rot[1].toFixed(2), 10) + "," + parseFloat(this.rot[2].toFixed(2), 10));
		throw(err);
	}

  return obj;
}

module.exports = Hologram;
