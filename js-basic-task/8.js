"use strict";

//const testArray = ['A', 'B', 'C'];
let myArray = [1, 5, 10, 14];
let originArray = [1,2,5,8,10];

function reverseArrayInPlace(array) {
  for (let i = 0; i < array.length / 2; i++) {
    let temp = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = temp;
  }
  return array;

  // for (let i = 0; i < array.length - 1; i++) {
  //   array.splice(i, 0, array.pop());
  // }
  // return array;
}

function reverseArray(array) {
  //let newArray = [...array];
  let newArray = array.slice(0);
  return reverseArrayInPlace(newArray);
}

reverseArrayInPlace(myArray);
console.log(myArray);

console.log(originArray);
let reversedArray = reverseArray(originArray);
console.log(reversedArray);
console.log(originArray);