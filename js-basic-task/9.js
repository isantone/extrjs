"use strict";

let testArray = [1, 2, 3];

function arrayToList(arr) {
  let rest = null;

  for (let i = arr.length - 1; i >= 0; i--) {
    rest = {
      value: arr[i],
      rest: rest
    };
  }

  return rest;
}

function listToArray(list) {
  let arr = [];

  for (let rest = list; rest; rest = rest.rest) {
    arr.push(rest.value);
  }

  return arr;
}

function prepend(value, rest) {
  let list = {
    value: value,
    rest: rest
  };

  return list;
}

function nth(list, position) {
  if (!list) {
    return undefined;
  }

  if (position == 0) {
    return list.value;
  }

  return nth(list.rest, --position);
}

console.log(arrayToList(testArray));

console.log(listToArray(arrayToList(testArray)));

console.log(prepend(10, prepend(20, null)));

console.log(nth(arrayToList([10, 20, 30]), 0));
console.log(nth(arrayToList([10, 20, 30]), 3));