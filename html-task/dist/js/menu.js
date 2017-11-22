var clicked = false;
function toggleNav() {
  //navButton.style.transition = "0.4s ease-in-out";
  //navButton.style.transform = "rotate(-360deg)";

  navButton.classList.toggle('header__menu-animation');
  
  if (clicked) {
    navigationMenu.style.height = "0";
    clicked = false;
  }
  else {
    navigationMenu.style.height = "280px";
    clicked = true;
  }
}