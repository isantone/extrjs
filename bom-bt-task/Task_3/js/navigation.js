function displayNavigation() {
  'use strict';

  document.getElementById("navLength").innerHTML = window.history.length;
}

function goBack() {
  window.history.back();
}

function goForward() {
  window.history.forward();
}

displayNavigation();