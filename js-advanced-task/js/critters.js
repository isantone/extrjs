function Wall() {}

function Plant() {
  this.energy = 7 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

// function PlantEater() {
//   this.energy = 15;
// }
// PlantEater.prototype.act = function(view) {
//   var space = view.find(" ");
//   if (this.energy > 60 && space)
//     return {type: "reproduce", direction: space};
//   var plant = view.find("*");
//   if (plant)
//     return {type: "eat", direction: plant};
//   if (space)
//     return {type: "move", direction: space};
// };

function SmartPlantEater() {
  this.energy = 20;
  this.reproduceEnergy = 190;
  this.direction = randomElement(directionNames);
  this.food = "*";
  this.legs = 4;
}
SmartPlantEater.prototype.act = function(view) {
  //var space = view.find(" ");
  var space = this.chooseDirection(view);
  if (this.energy > this.reproduceEnergy && space)
    return {type: "reproduce", direction: space};
  var food = view.find(this.food);
  if (food)
    return {type: "eat", direction: food};
  if (space)
    return {type: "move", direction: space};
};
SmartPlantEater.prototype.chooseDirection = function(view) {
  if (view.look(this.direction) != " " ) {
    var newSpace = view.find(" ");
    this.direction = newSpace || this.direction;
  }
  return this.direction;
};

function Predator() {
  this.energy = 20;
  this.reproduceEnergy = 240;
  this.direction = randomElement(directionNames);
  this.food = "O";
}
Predator.prototype = Object.create(SmartPlantEater.prototype);
Predator.prototype.constructor = Predator;

// Predator.prototype.act = function(view) {
//   var space = view.find(" ");
//   if (this.energy > 100 && space)
//     return {type: "reproduce", direction: space};
//   var victim = view.find("O");
//   if (victim)
//     return {type: "eat", direction: victim};
//   if (space)
//     return {type: "move", direction: space};
// };

function Rabbit() {
  this.energy = 240;
}
Rabbit.prototype.act = function(view) {
  var space = view.find(" ");
  //if (this.energy > 60 && space)
    //return {type: "reproduce", direction: space};
  var hunter = view.find("@");
  if (hunter)
    return {type: "move", direction: space};
  //if (space)
    //return {type: "move", direction: space};
};