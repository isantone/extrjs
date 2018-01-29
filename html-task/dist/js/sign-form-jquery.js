$( document ).ready( readyFn );

function readyFn( jQuery ) {
  getJqueryElements();

  $("#signButton").click(showLogForm);

  // $("input[type=email]").blur(inputBlurHandler);
  // $("input[type=password]").blur(inputBlurHandler);

  $("#showReg").click(showRegFormAndHideLogForm);
  $("#showLog").click(showLogFormAndHideRegForm);

  $("#logCancelButton").click(closeFormEventHandler);
  $("#regCancelButton").click(closeFormEventHandler);

  $signFormWrappers.click(closeFormEventHandler);

  logButton.addEventListener("click", logUser, false);
  regButton.addEventListener("click", regUser, false);
}

function logUser(event) {
  event.preventDefault();

}

function regUser(event) {
  event.preventDefault();

}

function getJqueryElements() {
  $signFormHeaders   = $(".sign-form__header");
  $signFormForms     = $(".sign-form__form");
  $signFormWrappers  = $(".sign-form-wrapper");

  $logEmail = $("#logEmail");
  $regEmail = $("#regEmail");

  $logForm = $("#logForm");
  $regForm = $("#regForm");

  const logButton = document.getElementById('logButton');
  const regButton = document.getElementById('regButton');
}

function hideForms() {
  $signFormWrappers.hide();
}

function closeForm() {
  $signFormHeaders.animate({ left: "+=1500px" }, 200);
  $signFormForms.animate({ left: "-=1500px" }, 200);
  $signFormWrappers.fadeOut(200);
}

function closeFormEventHandler(event) {
  if (event.target === event.currentTarget) {
    event.preventDefault();
    closeForm();
  }
}

// function inputBlurHandler(event) {
//   //showAlertMessage(event);
// }

// function showAlertMessage(event) {
//   if (event.target.value) {
//     //$("#" + event.target.type + "ValidationMessage").hide();
//     ($(event.target).next()).hide();
//   }
//   else {
//     //$("#" + event.target.type + "ValidationMessage").show();
//     ($(event.target).next()).show();
//   }
// }

function showLogForm(event) {
  $signFormHeaders.animate({ left: "-=1500px" }, 200);
  $signFormForms.animate({ left: "+=1500px" }, 200);
  $logForm.fadeIn(200);

  $logEmail.focus();

  event.preventDefault();
}

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