function displayScreenValues() {
  document.getElementById("availHeightValue").innerHTML = screen.availHeight;
  document.getElementById("availWidthValue").innerHTML = screen.availWidth;
  document.getElementById("colorDepthValue").innerHTML = screen.colorDepth;
  document.getElementById("heightValue").innerHTML = screen.height;
  document.getElementById("pixelDepthValue").innerHTML = screen.pixelDepth;
  document.getElementById("widthValue").innerHTML = screen.width;
}

displayScreenValues();