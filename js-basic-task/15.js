"use strict";
function MultiplicatorUnitFailture() {
  this.name = "MultiplicatorUnitFailture";
  this.message = "Sorry. MultiplicatorUnit has failed multiplication";
}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a*b;
  }
  else {
    throw new MultiplicatorUnitFailture();
  }
}

let errorCount = 0;

function reliableMultiply(a, b) {
  let result;
  do {
    try {
      result = primitiveMultiply(a, b);
    }
    catch (e) {
      if (e.name == "MultiplicatorUnitFailture") {
        result = false;
        errorCount++;
      }
    }
  }
  while (!result);
  return result;
}

console.log(reliableMultiply(8, 8));
console.log("MultiplicatorUnit has failed this multiplication " + errorCount + " times.");