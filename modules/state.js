class State {

  constructor (world) {
    this.world = world


  }

  reset () {

  }

  toJSON () {


    var tanks = {}
    this.world.forEach('tank', (item) => tanks[item.id] = item )

	var holograms = {}
	this.world.forEach('hologram', (item) => holograms[item.id] = item )


    return {
      // world state
      players: tanks,
	  holograms: holograms
    }
  }

}

module.exports = State
