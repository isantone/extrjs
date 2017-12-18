function openNewWindow(width, height) {
  'use strict';
  let windowParams = "width=" + width + ",height=" + height;
  let newWindow = window.open("about:blank", "New Window", windowParams);
}

function enableButton(id) {
  id.removeAttribute("disabled");
}