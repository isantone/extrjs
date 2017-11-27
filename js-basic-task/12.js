/// UNFINISHED

"use strict";
var ancestry = [];
var mothers = [];

function average (array) {
  function plus (a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function loadUsers() {
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
        console.log(ancestry);

        //mothers = ancestry.forEach(function(person) { person.mother.byName; });
        //var byName = {};

        ancdestry.foreach( function(person) {
          //person.mother = ;
        } );


        // ancestry.forEach(function(child) {
        //   //byName[person.mother] = child.name;
        // });

        console.log(mothers);
      } 
      catch (e) {
        alert("Некорректный ответ: " + e.message);
      }
    }
  }


}
loadUsers();
