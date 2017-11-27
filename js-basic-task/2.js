"use strict";

const start = 1;
const end = 100;

function fizzBuzz (start, end) {
  let output = "";
  //let test = 0; // Test how many if-else checkings the function passed through
  end += 1; //to avoid <=

  for (let i = 1; i < end; i++) {
    if (i % 3) { // i % 3 != 0
      //test++;
      if (i % 5) {
        //test++;
        output += i +=" ";
        continue;
      }
      //test++;
      output += "Buzz ";
    }
    else {
      //test++;
      if (i % 5) {
        //test++;
        output += "Fizz ";
        continue;
      }
      //test++;
      output += "FizzBuzz ";
    }
  }
  //return [output, test];
  return output;
}

let result = fizzBuzz(start, end);
console.log(result);

//console.log(result[0]);
//console.log("If-else used " + result[1] + " times"); // 200

// for (let i = 1; i < end; i++) {
//   if (i % 3 === 0)
//   {
//     test++;
//     if (i % 5 === 0)
//     {
//       test++;
//       console.log("FizzBuzz");
//       continue;
//     }
//     test++;
//     console.log("Fizz");
//   }
//   else
//   {
//     test++;
//     if (i % 5 === 0)
//     {
//       test++;
//       console.log("Buzz");
//       continue;
//     }
//     test++;
//     console.log(i);
//   }
// }

//output += " " + (i%15 ? i%5 ? i%3 ? i : 'Fizz' : 'Buzz' : 'FizzBuzz');
// for (let i = 1; i < end; i++) {
//   if (i % 15)
//   {
//     test++;
//     if (i % 5)
//     {
//       test++;
//       if (i % 3)
//       {
//         test++;
//         output += i + " ";
//       }
//       else
//       {
//         test++;
//         output+="Fizz ";
//       }
//     }
//     else
//     {
//       test++;
//       output+="Buzz ";
//     }
//   }
//   else {
//     test++;
//     output+="FizzBuzz ";
//   }
// } // test = 274