export default class RegView {
  getTemplate() {
    const regTemplate = `
    <div id="signOverlay" class="overlay hide">
    </div>

    <div id="signWrapper" class="sign-form__wrapper sign-page__sign-form hide">
      <h2 id="signHeader" class="sign-form__header bold-text">PLEASE LOG IN</h2>
      <form id="signForm" class="sign-form__form" novalidate>
        <label>
          <!--<i class="fas fa-envelope"></i>--><svg height="32" class="sign-form__icon" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill-rule="evenodd" d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path></svg>
          <input id="emailInput" class="input-size sign-form__input email-input" type="email" placeholder="E-mail@example.com">
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter an e-mail</p> -->
        </label>
        <label>
          <!--<i class="fas fa-unlock"></i>--><svg height="28" class="sign-form__icon sign-form__pass" viewBox="0 0 14 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M12.83 2.17C12.08 1.42 11.14 1.03 10 1c-1.13.03-2.08.42-2.83 1.17S6.04 3.86 6.01 5c0 .3.03.59.09.89L0 12v1l1 1h2l1-1v-1h1v-1h1v-1h2l1.09-1.11c.3.08.59.11.91.11 1.14-.03 2.08-.42 2.83-1.17S13.97 6.14 14 5c-.03-1.14-.42-2.08-1.17-2.83zM11 5.38c-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38.77 0 1.38.61 1.38 1.38 0 .77-.61 1.38-1.38 1.38z"></path></svg>
          <input  id="passwordInput" class="input-size mid-top-margin password-input" type="password" placeholder="Password">
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter a password</p> -->
        </label>
        <label id="rememberMe" class="sign-form__remember small-top-margin">
          <input type="checkbox"> Remember me
        </label>
        <div id="tipsLine" class="two-cols-line small-top-margin">
          <a id="forgotPassword" class="two-cols-line__left" href="#">Forgot password?</a>
          <a id="changeForm" class="two-cols-line__right" href="#">Sign Up</a>
        </div>
        <button id="sendFormButton" class="button button_color mid-top-margin">LOG IN</button>
        <button id="cancelButton" class="button button_gray mid-top-margin">CANCEL</button>
      </form>
    </div>
    `;

    const compiledRegTemplate = Handlebars.compile(regTemplate);
    return compiledRegTemplate();
  }
}