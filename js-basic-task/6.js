"use strict";

let string = "Lorem ipsum dolor sit amet";

function countChar(string, char) {
  let amount = 0;
  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i).toLowerCase() == char.toLowerCase()) {
      amount++;
    }
  }
  return amount;
}

console.log(countChar(string,'o'));
console.log(countChar(string,'L'));
console.log(countChar(string,'b'));
console.log(countChar(string,'y'));