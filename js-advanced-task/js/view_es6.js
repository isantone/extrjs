class View {
  constructor (world, vector) {
    this.world = world;
    this.vector = vector;
  }

  look(dir) {
    let target = this.vector.plus(directions[dir]);

    if (this.world.grid.isInside(target)) {
      return charFromElement(this.world.grid.get(target));
    }

    return WALL_SYMBOL;
    //return "#"; //WALL_SYMBOL
  }

  findAll(ch) {
    let found = [];

    for (let dir in directions) {
      if (this.look(dir) == ch) {
        found.push(dir);
      }
    }

    return found;
  }

  find(ch) {
    let found = this.findAll(ch);

    if (found.length == 0) {
      return null;
    }

    return randomElement(found);
  }
}