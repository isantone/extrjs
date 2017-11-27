"use strict";

let board = "";
const rowCount = 8;
const cellCount = 8;

for (let row = 0; row < rowCount; row++) {
  for (let cell = 0; cell < cellCount; cell++) {
    if (row % 2 == cell % 2) {
      board += "#";
    }
    else {
      board += " ";
    }
  }
  board += "\n\r";
}
console.log(board);
