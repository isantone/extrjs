"use strict";

//import { PLANT_SYMBOL } from './world.js';

const         PLANT_HP =  7 + Math.random() * 4; // Points to be alive
const         PLANT_RP = 15;                     // Points to reproduce
const         PLANT_GP = 20;                     // Points to grow

const    PLANTEATER_HP =  20;
const    PLANTEATER_RP = 190;
const  PLANTEATER_FOOD = "*"/*PLANT_SYMBOL*/;

const      PREDATOR_HP =  20;
const      PREDATOR_RP = 240;
const    PREDATOR_FOOD = "O"/*PLANTEATER_SYMBOL*/;


function Wall() {}

function Plant() {
  this.energy = PLANT_HP;
}
Plant.prototype.act = function(view) {
  if (this.energy > PLANT_RP) {
    var space = view.find(EMPTYSPACE_SYMBOL);

    if (space) {
      return {
        type: "reproduce",
        direction: space,
      };
    }
  }

  if (this.energy < PLANT_GP) {
    return {
      type: "grow"
    };
  }
};

function Rabbit() {
  this.energy = 240;
}
Rabbit.prototype.act = function(view) {
  var space = view.find(EMPTYSPACE_SYMBOL);
  var hunter = view.find(PREDATOR_SYMBOL);

  if (hunter) {
    return {
      type: "move",
      direction: space,
    };
  }
};

function SmartPlantEater() {
  Eater.call(this, PLANTEATER_HP, PLANTEATER_RP, PLANTEATER_FOOD);
}
SmartPlantEater.prototype = Object.create(Eater.prototype);
SmartPlantEater.prototype.constructor = SmartPlantEater;

function Predator() {
  Eater.call(this, PREDATOR_HP, PREDATOR_RP, PREDATOR_FOOD);
}
Predator.prototype = Object.create(Eater.prototype);
Predator.prototype.constructor = Predator;

function Eater(hp, rp, food) {
  this.energy = hp;
  this.reproduceEnergy = rp;
  this.food = food;
  this.direction = randomElement(directionNames);
}
Eater.prototype.act = function(view) {
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
};
Eater.prototype.chooseDirection = function(view) {
  if (view.look(this.direction) != EMPTYSPACE_SYMBOL ) {
    var newSpace = view.find(EMPTYSPACE_SYMBOL);

    this.direction = newSpace || this.direction;
  }

  return this.direction;
};