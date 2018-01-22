function toggleNav() {
  navButton.classList.toggle('header__animation');
    //navigationMenu.style.maxHeight = "500px"; //280px
  navigationMenu.classList.toggle('navigation_visible');
}

//var searchClicked = false;
function toggleSearch() {
  searchButton.classList.toggle('header__animation');

  // if (searchClicked) {
    searchForm.classList.toggle('header__search-form_visible');
  //   searchClicked = false;
  // }
  // else {
  //   searchForm.classList.toggle('header__search-form_visible');
  //   searchClicked = true;
  // }
}