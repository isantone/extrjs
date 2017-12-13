"use strict";

let str = "Lorem ipsum dolor sit amet";

function countChar(str, ch) {
  let amount = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() === ch.toLowerCase()) {
      amount++;
    }
  }
  return amount;
}

console.log(countChar(str,'o'));
console.log(countChar(str,'L'));
console.log(countChar(str,'b'));
console.log(countChar(str,'y'));