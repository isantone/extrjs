"use strict";

const arr1 = [ NaN , NaN , NaN ];
const arr2 = [ NaN , NaN , 4, NaN ];
const arr3 = [ NaN , 3 , 4 ];
const arr4 = [ 2 , 3 , 4 ];

function every (arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (!func(arr[i])) {
      return false;
    }
  }
  return true;
}

function some (arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return true;
    }
  }
  return false;
}

console.log(every(arr1, isNaN));
console.log(every(arr2, isNaN));
console.log(some(arr3, isNaN));
console.log(some(arr4, isNaN));