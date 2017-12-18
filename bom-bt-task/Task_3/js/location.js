function displayLocationValues() {
  document.getElementById("hashValue").innerHTML = location.hash;
  document.getElementById("searchValue").innerHTML = location.search;
  document.getElementById("hostnameValue").innerHTML = location.hostname;
  document.getElementById("hrefValue").innerHTML = location.href;
  document.getElementById("pathnameValue").innerHTML = location.pathname;
}

displayLocationValues();