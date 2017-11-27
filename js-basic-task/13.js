function average (array) {
  function plus (a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

let centuries = [];

function loadUsers() {
  "use strict";

  let ancestry = [];
  let ageDifferences = [];

	let xhr = new XMLHttpRequest();
  xhr.open('GET', 'db.json', true);
	xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    }
    else {
      try {
        ancestry = JSON.parse(xhr.responseText);

        ancestry.forEach(function(person) {
          if (centuries[Math.ceil(person.died / 100)]) {
            centuries[Math.ceil(person.died / 100)].push(person.died-person.born);
          }
          else {
            centuries[Math.ceil(person.died / 100)] = [];
            centuries[Math.ceil(person.died / 100)].push(person.died-person.born);
          }
        });

        for (let i = 0; i < centuries.length; i++) {
          if (centuries[i]) {
            console.log(i + " century average lifetime: " + average(centuries[i]).toFixed(1));
          }
        }
      }
      catch (e) {
        alert("Некорректный ответ: " + e.message);
      }
    }
  }
}

loadUsers();



