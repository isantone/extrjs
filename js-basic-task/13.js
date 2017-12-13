function loadUsers() {
  "use strict";

  let centuries = [];
  let ancestry = [];

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
          let centuryOfPerson = calculateCenturyOfPerson(person);
          let lifetimeOfPerson = calculateLifetimeOfPerson(person);

          if (centuries[centuryOfPerson]) {
            centuries[centuryOfPerson].push(lifetimeOfPerson);
          }
          else {
            centuries[centuryOfPerson] = [];
            centuries[centuryOfPerson].push(lifetimeOfPerson);
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
  };

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
}

loadUsers();



