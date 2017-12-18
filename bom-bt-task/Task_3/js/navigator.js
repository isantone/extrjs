function displayNavigatorValues() {

  if (navigator.userAgent.indexOf("Firefox/") > 0) {
    document.getElementById("appNameValue").innerHTML = navigator.appName;
    document.getElementById("cookieEnabledValue").innerHTML = navigator.cookieEnabled;

    return;
  }

  if (navigator.userAgent.indexOf("Edge/") > 0) {
    document.getElementById("platformValue").innerHTML = navigator.platform; 
    navigator.geolocation.getCurrentPosition(success, error);

    return;
  }

  if (navigator.userAgent.indexOf("Chrome/") > 0) {
    document.getElementById("userAgentValue").innerHTML = navigator.userAgent;
    document.getElementById("appVersionValue").innerHTML = navigator.appVersion;

    return;
  }

  document.getElementById("platformValue").innerHTML = navigator.platform; 
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    document.getElementById("geolocationValue").innerHTML = "Latitude: " + position.coords.latitude + 
    "; Longitude: " + position.coords.longitude;
  }

  function error() {
    document.getElementById("geolocationValue").innerHTML = "Geolocation is not supported by this browser.";
  }
}

displayNavigatorValues();