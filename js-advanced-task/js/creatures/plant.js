const         PLANT_HP =  7 + Math.random() * 4; // Points to be alive
const         PLANT_RP = 10;                     // Points to reproduce
const         PLANT_GP = 15;                     // Points to grow

class Plant {
  constructor() {
    this.energy = PLANT_HP;
  }

  act(view) {
    if (this.energy > PLANT_RP) {
      let space = view.find(EMPTYSPACE_SYMBOL);

      if (space) {
        return {
          type: "reproduce",
          direction: space
        };
      }
    }

    if (this.energy < PLANT_GP) {
      return {
        type: "grow"
      };
    }
  }
}