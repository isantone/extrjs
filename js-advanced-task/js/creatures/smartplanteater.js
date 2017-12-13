const    PLANTEATER_HP =  20;
const    PLANTEATER_RP = 190;
const  PLANTEATER_FOOD = "*";
//const  PLANTEATER_FOOD = PLANT_SYMBOL;

class SmartPlantEater extends Eater {
  constructor() {
    super(PLANTEATER_HP, PLANTEATER_RP, PLANTEATER_FOOD);
  }
}
new SmartPlantEater();