function average (array) {
  function plus (a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function loadUsers() {
  "use strict";

  let ancestry = [];
  let ageDifferences = [];
  let byName = {};

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
        //console.log(ancestry);

        ancestry.forEach(function(person) {
          byName[person.name] = person;
        });

        ancestry.forEach(function(child) {
          let mother = byName[child.mother];
          if (mother) {
            ageDifferences.push(child.born - mother.born)
          }
        })

        console.log("Task 12 > Average age in a date of birth of child: " + average(ageDifferences).toFixed(1));
      }
      catch (e) {
        alert("Некорректный ответ: " + e.message);
      }
    }
  }
}

loadUsers();