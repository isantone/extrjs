/// UNFINISHED

function deepEqualTask () {
  "use strict";

  const obj = {here: {is: "an" }, object: 2 };

  const user = {
    name: "Vasya",
    age: 25,
    gender: "M",
  };

  function deepEqual (first, second) {
    if (first && second) {
      if (typeof(first) == "object" && typeof(second) == "object") {
        // first[propOfFirst]
        for (var propOfFirst in first) {
          for (var propOfSecond in second) {
            if (deepEqual(propOfFirst, propOfSecond)) {
              continue;
            }
            else {
              return false;
            }
          }
        }
        return true;
      }
      else {
        if (first == second) {
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

  console.log(deepEqual("abcabc", "abcabc"));
  console.log(deepEqual(user, user));
}

deepEqualTask ();



