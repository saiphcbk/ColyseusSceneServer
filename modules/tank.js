var Vec3 = require('./vec3');


var tankIds = 0;

function Tank(client) {
    this.client = client

    this.deleted = false;

    this.id = ++tankIds;
    this.owner = client;
    // this.hue = Math.floor(Math.random() * 360);

    this.pos = Vec3.new(0, 0, 0)
}


Tank.prototype.delete = function() {
    this.deleted = true;

    this.pos.delete();
    this.owner = null;
};


Tank.prototype.update = function() 
{
    if (this.deleted) return;

    var now = Date.now();

    //if (this.movementDirection.len())
	//{
	//	this.pos.add(Vec2.alpha.setV(this.movementDirection).norm().mulS(this.speed));
	//}
    
};

Tank.prototype.toJSON = function() {
  return {
    clientName: this.client.name || 'guest',
    clientId: this.client.id,
    id: this.id,
    owner: this.owner.sessionId,
    x: parseFloat(this.pos[0].toFixed(3), 10),
    y: parseFloat(this.pos[1].toFixed(3), 10),
	z: parseFloat(this.pos[2].toFixed(3), 10)
  };
}

module.exports = Tank;
