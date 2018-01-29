import paths from '../paths';

import Presenter from './presenter';
import RegModel from '../models/reg-model';
import RegView from '../views/reg-view';

export default class RegPresenter extends Presenter {
	constructor() {
    super();

		// const requestUrl = paths.ajax.register.url;
    // //const requestParameters = paths.ajax.register.params;
    // const requestParameters = {
    //   method: 'POST',
    //   body: new FormData(this.signFormForm)
    // };

    // this.fetchReq = new Request(requestUrl, requestParameters);
    this.title = "EXTREME SHOP";

		this.view = new RegView();
    this.model = new RegModel();
  }

  init() {
    this.insertTemplate(this.view.getTemplate());
    this.getEventTargets()
      .then(() => {
        this.bindEvents();
      });
  }

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('signForm');
	}

	removeTemplate() {
    //this.contentContainer.remove();
    this.closeForm();
  }

  getEventTargets() {
    return new Promise((resolve, reject) => {
      document.addEventListener("DOMContentLoaded", (event) => {
        this.signFormOverlay = document.getElementById("signOverlay");
        this.signFormWrapper = document.getElementById("signWrapper");
        this.signFormHeader = document.getElementById("signHeader");
        this.signFormForm = document.getElementById("signForm");

        this.changeFormLink = document.getElementById("changeForm");
        this.signBtn = document.getElementById("signButton");

        this.sendFormBtn = document.getElementById("sendFormButton");

        this.emailInput = document.getElementById("emailInput");
        this.passwordInput = document.getElementById("passwordInput");

        this.formData = new FormData(this.signFormForm);

        this.rememberLabel = document.getElementById("rememberMe");
        this.forgotPassLink = document.getElementById("forgotPassword");
        this.tipsLineDiv = document.getElementById("tipsLine");

        this.logFormActive = true; 

        resolve();
      });
    });
  }

  bindEvents() {
    //document.getElementById("signButton").addEventListener("click", showLogForm, false);
    document.getElementById("signButton").addEventListener("click", this.showRegForm.bind(this), false);

    // $("input[type=email]").blur(inputBlurHandler);
    // $("input[type=password]").blur(inputBlurHandler);

    document.getElementById("cancelButton").addEventListener("click", this.closeFormEventHandler.bind(this), false);

    this.sendFormBtn.addEventListener("click", this.sendForm.bind(this), false);

    this.signFormOverlay.addEventListener("click", this.closeFormEventHandler.bind(this));

    this.changeFormLink.addEventListener("click", this.changeForm.bind(this), false);

    //logButton.addEventListener("click", logUser, false);
    //this.signButton.addEventListener("click", regUser, false);
  }

  showRegForm(event) {
    event.preventDefault();

    const animationPromise = new Promise((resolve, reject) => {
      this.signFormWrapper.classList.remove("hide");
      this.signFormOverlay.classList.remove("hide");
      resolve();
    }) // PROMISE DOESNT WORK
      .then(() => {
        setTimeout(() => { /// WAIT 20 ms FOR "DISPLAY:NONE" FINISHING. <---- ????
          this.signFormOverlay.classList.add("overlay_visible");
          this.signFormHeader.classList.add("sign-form__header_visible");
          this.signFormForm.classList.add("sign-form__form_visible");

          this.emailInput.focus();
        }, 20);
      });
  }

  closeForm() {
    this.signFormOverlay.classList.remove("overlay_visible");
    this.signFormHeader.classList.remove("sign-form__header_visible");
    this.signFormForm.classList.remove("sign-form__form_visible");

    setTimeout(() => {
      this.signFormWrapper.classList.add("hide");
      this.signFormOverlay.classList.add("hide");
    }, 250);
  }

  closeFormEventHandler(event) {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      this.closeForm();
    }
  }

  changeForm(event) {
    if (this.logFormActive) {
      this.logFormActive = false;

      this.signFormHeader.innerText = "PLEASE SIGN UP";
      this.changeFormLink.innerText = "Log In";
      this.sendFormBtn.innerText = "SIGN UP";

      this.rememberLabel.remove();
      this.forgotPassLink.remove();

      this.emailInput.focus();
    }
    else {
      this.logFormActive = true;

      this.signFormHeader.innerText = "PLEASE LOG IN";
      this.changeFormLink.innerText = "Sign Up";
      this.sendFormBtn.innerText = "LOG IN";

      this.tipsLineDiv.insertAdjacentElement("beforeBegin", this.rememberLabel);
      this.tipsLineDiv.insertAdjacentElement("afterBegin", this.forgotPassLink);

      this.emailInput.focus();
    }
  }

  sendForm() {
    this.formData.set("login", this.emailInput.value);
    this.formData.set("password", this.passwordInput.value);

    let requestUrl;
    let requestParameters;

    if (this.logFormActive) {
      requestUrl = paths.ajax.login.url;
      requestParameters = paths.ajax.login.params;
      requestParameters.body = this.formData;
    } else {
      requestUrl = paths.ajax.register.url;
      requestParameters = paths.ajax.register.params;
      requestParameters.body = this.formData;  
    }

    this.fetchReq = new Request(requestUrl, requestParameters);
    fetch(this.fetchReq);
  }
}

function showRegForm(event) {

  const $signFormHeaders   = $(".sign-form__header");
  const $signFormForms     = $(".sign-form__form");

  // $signFormHeaders.animate({ left: "-=1500px" }, 200);
  // $signFormForms.animate({ left: "+=1500px" }, 200);

  [].forEach.call(this.signFormHeaders, (element) => {
    element.style.left = 0;
  });
  [].forEach.call(this.signFormForms, (element) => {
    element.style.left = 0;
  });

  $("#regForm").fadeIn(200);

  //$logEmail.focus();

  event.preventDefault();
}

// function showLogForm(event) {
//   $signFormHeaders.animate({ left: "-=1500px" }, 200);
//   $signFormForms.animate({ left: "+=1500px" }, 200);
//   $logForm.fadeIn(200);

//   $logEmail.focus();

//   event.preventDefault();
// }

function showLogFormAndHideRegForm() {
  $regForm.hide();
  $logForm.show();

  $logEmail.focus();

  event.preventDefault();
}

function showRegFormAndHideLogForm() {
  $logForm.hide();
  $regForm.show();

  $regEmail.focus();

  event.preventDefault();
}

function hideForms() {
  $signFormWrappers.hide();
}

function closeForm() {
  //$signFormHeaders   = $(".sign-form__header");
  //$signFormForms     = $(".sign-form__form");

  [].forEach.call(this.signFormHeaders, (element) => {
    element.classList.remove("sign-form__header_animated");
  });

  [].forEach.call(this.signFormForms, (element) => {
    element.classList.remove("sign-form__form_animated");
  });

  setTimeout(() => {
    this.regForm.classList.remove("hide");
  }, 20);
}

function closeFormEventHandler(event) {
  if (event.target === event.currentTarget) {
    event.preventDefault();
    this.closeForm();
  }
}

function logUser(event) {
  event.preventDefault();

}

function regUser(event) {
  event.preventDefault();
}