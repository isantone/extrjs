export const       WALL_SYMBOL = "#";
export const      PLANT_SYMBOL = "*";
export const PLANTEATER_SYMBOL = "O";
export const   PREDATOR_SYMBOL = "@";
export const     RABBIT_SYMBOL = ">";
export const EMPTYSPACE_SYMBOL = " "; // <=> null

export const    COST_OF_ACTION = 0.2;

export const          PLANT_HP =  7 + Math.random() * 4; // Points to be alive
export const          PLANT_RP = 15;                     // Points to reproduce
export const          PLANT_GP = 20;                     // Points to grow

export const     PLANTEATER_HP =  20;
export const     PLANTEATER_RP = 190;
export const   PLANTEATER_FOOD = PLANT_SYMBOL;

export const       PREDATOR_HP =  20;
export const       PREDATOR_RP = 240;
export const     PREDATOR_FOOD = PLANTEATER_SYMBOL;
