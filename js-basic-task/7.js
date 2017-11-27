"use strict";

const arrayStart = 5;
const arrayEnd = 12;

function sum(array) {
  return array.reduce(function(sum, current) {
    return sum + current;
  });
}

function range(arrayStart, arrayEnd, arrayStep = 1) {
  if (arrayStart < arrayEnd && arrayStep > 0) {
    var array = new Array();
    let position = 0;

    for (let i = 0; i <= (arrayEnd - arrayStart) / arrayStep; i++) {
      array[i]= arrayStart + position;
      position+=arrayStep;
    }
  }
  else {
    if (arrayStart > arrayEnd && arrayStep < 0) {
      var array = new Array();
      let position = 0;

      for (let i = 0; i <= (arrayStart - arrayEnd) / -arrayStep; i++) {
        array[i] = arrayStart - position;
        position-=arrayStep;
      }
    }
    else {
      return "No way!";
    }
  }
  return array;
}

console.log(range(10, 15));
console.log(range(1, 10, 2));

console.log(range(5, 2, -1));
console.log(range(10, 1, -2));

console.log(range(5, 2, 1));
console.log(range(2, 8, -1));

console.log(sum([2, 5, 3]));
console.log(sum([12, 2, 5]));

console.log(sum(range(1, 10)));