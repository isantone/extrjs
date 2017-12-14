httpGet('db.json')
.then(
  response => {
    for (let i = 0; i < response.length; i++) {
      if (response[i]) {
        console.log(i + " century average lifetime: " + average(response[i]).toFixed(1));
      }
    }
  },
  error => console.log(`Task 12 > Rejected: ${error}`)
);

function httpGet(url) {
  "use strict";

  return new Promise(function(resolve, reject) {
    let ancestry = [];
    let centuries = [];

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
        let centuryOfPerson = calculateCenturyOfPerson(person);
        let lifetimeOfPerson = calculateLifetimeOfPerson(person);

        if (centuries[centuryOfPerson]) {
          centuries[centuryOfPerson].push(lifetimeOfPerson);
        } else {
          centuries[centuryOfPerson] = [];
          centuries[centuryOfPerson].push(lifetimeOfPerson);
        }
      });

      resolve(centuries);
    };

    xhr.onerror = function() {
      reject(new Error("Task 12 > Network Error"));
    };

    xhr.send();
  });
}

function average(array) {
  function plus(a, b) {
    return a + b; }
  return array.reduce(plus) / array.length;
}

function calculateCenturyOfPerson(person) {
  return Math.ceil(person.died / 100);
}

function calculateLifetimeOfPerson(person) {
  return person.died - person.born;
}



