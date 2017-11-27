/// UNFINISHED

function deepEqualTask () {
  "use strict";

  const obj = {here: {is: "an" }, object: 2 };

  const user = {
    name: "Vasya",
    age: 25,
    gender: "M",
  };

  const user2 = {
    gender: "M",
    name: "Vasya",
    age: 25,
  };

  const user3 = {
    gender: "M",
    name: "Vasya",
    age: 25,
    other: "Value",
  };

  function deepEqual (first, second) {
    if (first && second) {
      if (typeof(first) == "object" && typeof(second) == "object") {
        let result = [];
        let propFirstCounter = 0;
        let propSecondCounter = 0;
        for (var propOfFirst in first) {
          propFirstCounter++;
          for (var propOfSecond in second) {
            propSecondCounter++;
            if (deepEqual(propOfFirst, propOfSecond) && deepEqual(first[propOfFirst], second[propOfSecond])) {
              result.push(true);
            }
          }
        }
        if ((propFirstCounter === propSecondCounter / propFirstCounter) && propFirstCounter === result.length) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        if (first === second) {
          return true;
        }
        else {
          return false;
        }
      }
    }
    else {
      return "incorrect";
    }
  }

  console.log(deepEqual("abcabc", "abcabc")); //true
  console.log(deepEqual(user, user)); //true
  console.log(deepEqual(user, user2)); //true
  console.log(deepEqual(obj, obj)); //true
  console.log(deepEqual(obj, {here: {is: "an" }, object: 2 })); //true
  console.log(deepEqual(obj, {here: 1 , object: 2 })); //false
  console.log(deepEqual(user2, user3)); //false

}

deepEqualTask ();



