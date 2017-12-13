class Eater {
  constructor(hp, rp, food) {
    this.energy = hp;
    this.reproduceEnergy = rp;
    this.food = food;
    this.direction = "n"; /*randomElement(directionNames);*/
  }

  act(view) {
    var space = this.chooseDirection(view);

    if (this.energy > this.reproduceEnergy && space) {
      return {
        type: "reproduce",
        direction: space,
      };
    }

    var food = view.find(this.food);

    if (food) {
      return {
        type: "eat",
        direction: food,
      };
    }

    if (space) {
      return {
        type: "move",
        direction: space,
      };
    }
  }

  chooseDirection(view) {
    if (view.look(this.direction) != EMPTYSPACE_SYMBOL ) {
      var newSpace = view.find(EMPTYSPACE_SYMBOL);

      this.direction = newSpace || this.direction;
    }

    return this.direction;
  }
}