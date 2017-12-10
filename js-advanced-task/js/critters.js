const         PLANT_HP =  7 + Math.random() * 4; // Points to be alive
const         PLANT_RP = 10;                     // Points to reproduce
const         PLANT_GP = 15;                     // Points to grow

const    PLANTEATER_HP =  20;
const    PLANTEATER_RP = 190;
const  PLANTEATER_FOOD = "*";
//const  PLANTEATER_FOOD = PLANT_SYMBOL;

const      PREDATOR_HP =  20;
const      PREDATOR_RP = 240;
const    PREDATOR_FOOD = "O";
//const    PREDATOR_FOOD = PLANTEATER_SYMBOL;

class Wall {}

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

// function tryToReproduce(view, space) {
//   //var space = this.chooseDirection(view);

//   if (this.energy > this.reproduceEnergy && space) {
//     return {
//       type: "reproduce",
//       direction: space,
//     };
//   }
// }

// function tryToEat(view) {
//   var food = view.find(this.food);
  
//   if (food) {
//     return {
//       type: "eat",
//       direction: food,
//     };
//   }
// }

// function tryToMove(view, space) {
//   if (space) {
//     return {
//       type: "move",
//       direction: space,
//     };
//   }
// }

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

class SmartPlantEater extends Eater {
  constructor() {
    super(PLANTEATER_HP, PLANTEATER_RP, PLANTEATER_FOOD);
  }
}
new SmartPlantEater();

class Predator extends Eater {
  constructor() {
    super(PREDATOR_HP, PREDATOR_RP, PREDATOR_FOOD);
  }
}
new Predator();