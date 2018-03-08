function toggleNav() {
  //navButton.classList.toggle('header__animation');
    //navigationMenu.style.maxHeight = "500px"; //280px
  //navigationMenu.classList.toggle('navigation_visible');
  let navBtn = document.getElementById('navBtn');
  let navBtnTop = document.getElementsByClassName('nav-btn__top')[0];
  let navBtnMid = document.getElementsByClassName('nav-btn__mid')[0];
  let navBtnBot = document.getElementsByClassName('nav-btn__bot')[0];

  navBtn.addEventListener('click', function(e) {
    this.classList.toggle('nav-btn_opened');
    navBtnTop.classList.toggle('nav-btn__top_opened');
    navBtnMid.classList.toggle('nav-btn__mid_opened');
    navBtnBot.classList.toggle('nav-btn__bot_opened');
  });
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