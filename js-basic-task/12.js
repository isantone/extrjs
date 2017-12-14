httpGet('db.json')
.then(
  response => console.log("Task 12 > Average age in the moment of birth of a child: " + response.toFixed(1)),
  error => console.log(`Task 12 > Rejected: ${error}`)
);

function httpGet(url) {
  "use strict";

  return new Promise(function(resolve, reject) {
    let ancestry = [];
    let ageDifferences = [];
    let byName = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }
  
      if (xhr.status != 200) {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }

      ancestry = JSON.parse(xhr.responseText);

      ancestry.forEach(function(person) {
        byName[person.name] = person;
      });

      ancestry.forEach(function(child) {
        let mother = byName[child.mother];
        if (mother) {
          ageDifferences.push(child.born - mother.born);
        }
      });

      resolve(average(ageDifferences));
    };

    xhr.onerror = function() {
      reject(new Error("Task 12 > Network Error"));
    };

    xhr.send();
  });
}

function average (array) {
  function plus (a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
