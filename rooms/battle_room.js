var Room = require('colyseus').Room;
var World = require('../modules/world');
var Tank = require('../modules/tank');
var Vec3 = require('../modules/vec3');
var State = require('../modules/state');
var Hologram = require('../modules/hologram');

class BattleRoom extends Room {

  onInit (options) {
    this.maxClients = 12;

    this.world = new World({
      width: 48,
      height: 48,
      clusterSize: 4,
      indexes: [ 'tank', 'hologram']
    });

    this.setSimulationInterval(() => this.update(), 1000 / 20);

    this.setState(new State(this.world));
  }

  onJoin (client, options) {
    var tank = new Tank(client);
    client.tank = tank;

    this.world.add('tank', tank);
  }

  onMessage (client, data) 
  {
	var world = this.world;
    var type = data.Command
      , message = data.field1
      , tank = client.tank

	console.log("Message received from ", client.tank.id, type, message);
    if (type === 'name') 
	{
      if (/^([a-z0-9\-_]){4,8}$/i.test(message)) 
	  {
        client.name = message
      }
    } 
	else if (type === 'create_hologram')
	{
		var hologram = new Hologram({
                x: data.x,
                y: data.y,
				z: data.z,
				rx: data.rx,
				ry: data.ry,
				rz: data.rz,
				rw: data.rw,
				sx: data.sx,
				sy: data.sy,
				sz: data.sz,
				holoName: data.Name,
				isLocal: data.isLocal,
				URI: data.URI,
				Server_ID: data.Server_id,
				Hash: data.HASH,
				UID: data.UID,
				Parent: data.Parent,
				OnClick: data.click
            })

			world.add('hologram', hologram);
			console.log("Created hologram ", hologram.id);
	}
	else if (type === 'move_hologram') 
	{
		world.forEach('hologram', (hologram) => {
			if(hologram.id == message)
			{
				//move it to the right
				var x = data.x;
				var y = data.y;
				var z = data.z;
				hologram.pos = Vec3.new(x, y, z);
			}
		});
	}
	else if (type === 'rotate_hologram') 
	{
		world.forEach('hologram', (hologram) => {
			if(hologram.id == message)
			{
				var rw = data.w;
				var rx = data.x;
				var ry = data.y;
				var rz = data.z;
				hologram.rot = Vec3.new(rx, ry, rz);
				hologram.rotw = rw;
			}
		});
	}
	else if (type === 'scale_hologram') 
	{
		world.forEach('hologram', (hologram) => {
			if(hologram.id == message)
			{
				var x = data.x;
				var y = data.y;
				var z = data.z;
				hologram.scl = Vec3.new(x, y, z);
			}
		});
	}
	else if (type === 'change_hologram_property') 
	{
		console.log("change property ", data.property, data.value);
		world.forEach('hologram', (hologram) => {
			if(hologram.id == message)
			{
				hologram[data.property] = data.value;
				console.log("change property ", data.property, data.value);
			}
		});
	}
	else if (type === 'move') 
	{
		if(message == "left")
		{
			var x = data.x;
			var y = data.y;
			var z = data.z;
			console.log("Message received from ", client.tank.id, x, y, z);
			client.tank.pos = Vec3.new(x, y, z);
		}
		
    } 
  }

  update () {
    var world = this.world;
    var now = Date.now();
    var winner = null;

    // for each player
    world.forEach('tank', (tank) => {
		tank.update();
		// update in world
		tank.node.root.updateItem(tank);
	});

	// for each hologram
	world.forEach('hologram', (hologram) => {
		hologram.update();
		// update in world
		hologram.node.root.updateItem(hologram);
	});
  }

  onLeave (client) {
    this.world.remove('tank', client.tank);
    client.tank.delete();
  }

}

module.exports = BattleRoom;
