"use strict";

let arrays = [[1, 2, 3], [4, 5], [6]];
// let mergedArray = new Array();
// mergedArray = mergedArray.concat(arrays[0], arrays[1], arrays[2]);
// console.log(mergedArray);

let mergedArray = arrays.reduce(function(merger, current) {
  return merger.concat(current);
});

console.log(mergedArray);