const      PREDATOR_HP =  20;
const      PREDATOR_RP = 240;
const    PREDATOR_FOOD = "O";
//const    PREDATOR_FOOD = PLANTEATER_SYMBOL;

class Predator extends Eater {
  constructor() {
    super(PREDATOR_HP, PREDATOR_RP, PREDATOR_FOOD);
  }
}
new Predator();