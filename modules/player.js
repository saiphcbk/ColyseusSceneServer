var Vec3 = require('./vec3');


var playerIds = 0;

function Player(client) {
    this.client = client

    this.deleted = false;

    this.id = ++playerIds;
    this.owner = client;
    // this.hue = Math.floor(Math.random() * 360);

    this.pos = Vec3.new(0, 0, 0)

}


Player.prototype.delete = function() {
    this.deleted = true;

    this.pos.delete();
    this.owner = null;
};


Player.prototype.update = function() 
{
    if (this.deleted) return;

    var now = Date.now();
    
};

Player.prototype.toJSON = function() {
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

module.exports = Player;
