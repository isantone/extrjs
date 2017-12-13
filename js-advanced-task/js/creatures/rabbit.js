class Rabbit {
  constructor() {
    this.energy = 240;
  }

  act(view) {
    let space = view.find(EMPTYSPACE_SYMBOL);
    let hunter = view.find(PREDATOR_SYMBOL);

    if (hunter) {
      return {
        type: "move",
        direction: space
      };
    }
  }
}