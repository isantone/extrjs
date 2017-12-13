function deepEqualTask() {
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

  function deepEqual(first, second) {
    if (first === second) {
      return true;
    }

    if (
      first === null || second === null
      || typeof(first) != "object" || typeof(second) != "object"
    ) {
      return false;
    }

    let propOfFirstCounter = 0;
    let propOfSecondCounter = 0;

    for (let prop in first) {
      propOfFirstCounter++;
    }

    for (let prop in second) {
      propOfSecondCounter++;
      if (!(prop in first) || !(deepEqual(first[prop], second[prop]))) {
        return false;
      }
    }

    if (propOfFirstCounter === propOfFirstCounter) {
      return true;
    }

    return "Incorrect";
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