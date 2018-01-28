export default class RegView {
  getTemplate() {
    const regTemplate = `
    <div id="signOverlay" class="overlay hide">
    </div>

    <div id="signWrapper" class="sign-form__wrapper sign-page__sign-form hide">
      <h2 id="signHeader" class="sign-form__header bold-text">PLEASE LOG IN</h2>
      <form id="signForm" class="sign-form__form" novalidate>
        <label>
          <i class="fas fa-envelope"></i>
          <input id="emailInput" class="input-size sign-form__input email-input" type="email" placeholder="E-mail@example.com" required>
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter an e-mail</p> -->
        </label>
        <label>
          <i class="fas fa-unlock"></i>
          <input  id="passwordInput" class="input-size mid-top-margin password-input" type="password" placeholder="Password" required>
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter a password</p> -->
        </label>
        <label class="sign-form__remember small-top-margin">
          <input type="checkbox"> Remember me
        </label>
        <div class="two-cols-line small-top-margin">
          <a class="two-cols-line__left" href="#">Forgot password?</a>
          <a id="showReg" class="two-cols-line__right" href="#">Sign Up</a>
        </div>
        <button id="signButton" class="button button_color mid-top-margin">LOG IN</button>
        <button id="cancelButton" class="button mid-top-margin">CANCEL</button>
      </form>
    </div>
    `;

    const compiledRegTemplate = Handlebars.compile(regTemplate);
    return compiledRegTemplate();
  }
}