var clicked = false;
function showNavMenu() {
  if (clicked) {
    navigationMenu.style.transform = "translateY(-300px)";
    navigationMenu.style.position = "absolute";
    navigationMenu.style.width = "100%";
    clicked = false;
  }
  else {
      // navigationMenu.style.display = "block";
  navigationMenu.style.position = "static";
  // navigationMenu.style.visibility = "visible";
  // navigationMenu.style.transition = "1s ease-in-out";
  navigationMenu.style.transform = "translateY(0)";
  clicked = true;
  }
}