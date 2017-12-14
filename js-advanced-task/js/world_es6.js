const       WALL_SYMBOL = "#";
const      PLANT_SYMBOL = "*";
const PLANTEATER_SYMBOL = "O";
const   PREDATOR_SYMBOL = "@";
const     RABBIT_SYMBOL = ">";
const EMPTYSPACE_SYMBOL = " "; // <=> null

const    COST_OF_ACTION = 0.2;

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function elementFromChar(legend, ch) {
  if (ch == EMPTYSPACE_SYMBOL) {
    return null;
  }

  let element = new legend[ch]();

  element.originChar = ch;

  return element;
}

function charFromElement(element) {
  if (element == null) {
    return EMPTYSPACE_SYMBOL;
  }

  return element.originChar;
}

class World {
  constructor(map, legend) {
    let grid = new Grid(map[0].length, map.length);

    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
      for (var x = 0; x < line.length; x++) {
        grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
      }
    });
  }

  toString() {
    let output = "";

    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        let element = this.grid.get(new Vector(x, y));

        output += charFromElement(element);
      }
      output += "\n";
    }

    return output;
  }

  turn() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
      if (critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  }

  checkDestination(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);

      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
  }

  letAct(critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action
      && action.type in actionTypes
      && actionTypes[action.type].call(this, critter, vector, action);

    if (!handled) {
      critter.energy -= COST_OF_ACTION;

      if (critter.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  }
}

let valley = new World(
  [
    "##################################",
    "#####   ***              ***######",
    "##  O****    >              ****##",
    "#  **##**           ***  O     *##",
    "#  *****             ##**       *#",
    "#                                #",
    "#      @             ##***       #",
    "#           @        ##**        #",
    "#                                #",
    "#                                #",
    "# O         #**            >     #",
    "#**    >    #***                *#",
    "#***    >      ##**  O    O    **#",
    "##****O     **###****        **###",
    "#                                #",
    "##################################",
  ],
  {
    "#": Wall,
    "*": Plant,
    "O": SmartPlantEater,
    "@": Predator,
    ">": Rabbit,
  }
);