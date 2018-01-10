(function() {
  const headerTemplate = 
    `<header class="header">
    <div class="header__container">
      <div class="header__logo">
        <a class="non-text-link" href="index.html">
          <img src="images/ex_shop_white.png">
        </a>
      </div>

      <div class="header__buttons">
        <div id="navButton" class="header__menu" onclick="toggleNav();">
          <a href="#">
            <img src="images/menu.png">
          </a>
        </div>
        <div id="searchButton" class="header__search" onclick="toggleSearch();">
          <a href="#">
            <img src="images/search.png">
          </a>
        </div>
        <div class="header__cart">
          <a href="cart.html">
            <img src="images/sc.png">
          </a>
        </div>
        <div id="signButton" class="header__profile">
          <img src="images/pr.png">
        </div>
      </div>
      <div id="searchForm" class="search-form header__search-form">
        <input class="header__search-input" placeholder="Search">
      </div>
    </div>
  </header>`;
  const compiledHeaderTemplate = Handlebars.compile(headerTemplate);

  const navigationTemplate =
    `<nav id="navigationMenu" class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="#">Snowboards</a>
        </li>
        <li class="navigation__item navigation__item-active">
          <a href="#">Skis</a>
        </li>
        <li class="navigation__item">
          <a href="#">Apparel</a>
        </li>
        <li class="navigation__item">
          <a href="#">Boots</a>
        </li>
        <li class="navigation__item">
          <a href="#">Protection</a>
        </li>
        <li class="navigation__item">
          <a href="#">Tools</a>
        </li>
        <li class="navigation__item">
          <a href="#">Accessories</a>
        </li>
      </ul>
    </nav>`;
    const compiledNavigationTemplate = Handlebars.compile(navigationTemplate);

  const footerTemplate = 
    `<footer class="footer">
      <!--<img class="epam-logo" src="images/epam_logo.svg"></img>-->
      <div class="svg-logo">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewbox="0 0 88 32" enable-background="new 0 0 88 32" height="50" xml:space="preserve">
          <g>
            <path fill="#FFFFFF" d="M16.6,14.3l0,5.7c0,1.4,0.7,2.2,2.2,2.2h0.6c1.4,0,2.2-0.7,2.2-2.2v-2.8h3.3v2.7c0,3.6-1.8,5.5-5.5,5.5
              h-0.7c-3.6,0-5.5-1.8-5.5-5.1V6.4c0-4.1,1.8-5.9,5.5-5.9h0.7c3.6,0,5.5,1.8,5.5,5.5l0,8.3H16.6z M16.6,11h4.9V5.9
              c0-1.4-0.7-2.2-2.2-2.2h-0.5c-1.4,0-2.2,0.7-2.2,2.2V11z"/>
            <path fill="#FFFFFF" d="M27.1,0.8h3.4v1.6c0.8-0.9,2.2-1.8,4.2-1.8c2.9,0,4.4,1.9,4.4,4.8v15.2c0,2.9-1.4,4.8-4.4,4.8
              c-2,0-3.4-0.9-4.2-1.8v7.8h-3.4V0.8z M30.6,20.9c0.9,0.8,2,1.3,3.2,1.3c1.3,0,2-0.6,2-2V5.7c0-1.4-0.7-2-2-2
              c-1.1,0-2.2,0.5-3.2,1.3V20.9z"/>
            <path fill="#FFFFFF" d="M41.2,16.6c0-3,1-4.2,3.6-5.1l4.6-1.6V5.9c0-1.4-0.7-2.2-2.2-2.2h-0.6c-1.4,0-2.2,0.8-2.2,2.2v3.4h-3.3V6
              c0-3.6,1.8-5.5,5.5-5.5h0.6c3.6,0,5.5,1.8,5.5,5.5v19.1h-3.4v-1.5c-0.9,0.9-2.2,1.8-4.2,1.8c-2.7,0-4-1.6-4-4.3V16.6z M49.4,21v-8
              l-3.1,1.2c-1.3,0.5-1.7,1.1-1.7,2.5v3.7c0,1.2,0.6,1.8,1.7,1.8C47.3,22.1,48.3,21.8,49.4,21z"/>
            <path fill="#FFFFFF" d="M66.7,25.1h-3.4V5.5c0-1.2-0.6-1.8-1.6-1.8c-0.9,0-1.9,0.4-3.2,1.2v20.1H55V0.8h3.4v1.6
              c1-0.9,2.3-1.8,4.2-1.8c1.8,0,2.9,0.7,3.6,2c1.2-1,2.7-2,4.6-2c2.7,0,4,1.6,4,4.3v20.3h-3.4V5.5c0-1.2-0.6-1.8-1.6-1.8
              c-0.9,0-1.9,0.4-3.2,1.2V25.1z"/>
            <path fill="#3AC2D7" class="svg-l" d="M8.8,3v4.5L3,13l5.8,5.4V23L0,14.7v-3.3L8.8,3z"/>
            <path fill="#3AC2D7" class="svg-r" d="M88,11.4v3.3L79.2,23v-4.6L85,13l-5.8-5.5V3L88,11.4z"/>
          </g>
        </svg>
      </div>
      <!-- <span> &copy; </span> -->
    </footer>`;
  const compiledFooterTemplate = Handlebars.compile(footerTemplate);

  const signFormTemplate =
    `<div id="signForm" class="sign-form-wrapper hide">
      <div class="sign-form sign-page__sign-form">
        <p class="sign-form__header bold-text">PLEASE LOG IN</p>
        <form class="sign-form__form">
          <label>
            <input id="emailInput" class="input-size sign-form__input" type="email" placeholder="E-mail@example.com" required autofocus>
            <p class="sign-form__validation-message tiny-top-margin hide">Enter an e-mail</p>
          </label>
          <label>
            <input  id="passwordInput" class="input-size small-top-margin" type="password" placeholder="Password" required>
            <p class="sign-form__validation-message tiny-top-margin hide">Enter a password</p>
          </label>
          <label class="sign-form__remember big-top-margin small-bottom-margin">
            <input type="checkbox"> Remember me
          </label>
          <div class="two-cols-line big-bottom-margin">
            <a class="two-cols-line__left" href="#">Forgot password?</a>
            <a id="regButton" class="two-cols-line__right" href="#">Sign up</a>
          </div>
          <input class="button input-size turquoise small-bottom-margin" type="submit" value="LOG IN">
          <button id="logCancelButton" class="button input-size gray">CANCEL</button>
        </form>
      </div>
    </div>`;
  const compiledSignFormTemplate = Handlebars.compile(signFormTemplate);

  const regFormTemplate =
    `<div id="regForm" class="sign-form-wrapper">
      <div class="sign-form sign-page__sign-form">
        <p class="sign-form__header bold-text">REGISTER NEW ACCOUNT</p>
        <form class="sign-form__form">
          <input class="input-size sign-form__input" type="email" placeholder="E-mail@example.com" required autofocus>
          <p class="sign-form__validation-message tiny-top-margin hide">Enter an e-mail</p>
          <input class="input-size small-top-margin" type="password" placeholder="Password" required>
          <p class="sign-form__validation-message tiny-top-margin hide">Enter a password</p>
          <div class="two-cols-line big-top-margin big-bottom-margin">
            <span class="two-cols-line__left" href="#">Have an account?</span>
            <a id="logButton" class="two-cols-line__right" href="#">Log In</a>
          </div>
          <input class="button input-size turquoise small-bottom-margin" type="submit" value="SIGN UP">
          <button id="regCancelButton" class="button input-size gray">CANCEL</button>
        </form>
      </div>
    </div>`;
  const compiledRegFormTemplate = Handlebars.compile(regFormTemplate);

  $(document).ready(function() {
    const pageMain = $(".page-main");
    if (pageMain.length) {
      pageMain.prepend(compiledNavigationTemplate); 
    }
    
    $("body").prepend(compiledHeaderTemplate); 
    $("body").append(compiledFooterTemplate);

    $("body").append(signFormTemplate);
    $("body").append(regFormTemplate);

  });
})(); 