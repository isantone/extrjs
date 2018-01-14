$( document ).ready( readyFn );

function readyFn( jQuery ) {
  getJqueryElements();

  $("#signButton").click(showLogForm);

  // $("input[type=email]").blur(inputBlurHandler);
  // $("input[type=password]").blur(inputBlurHandler);

  $("#regButton").click(showRegFormAndHideLogForm);
  $("#logButton").click(showLogFormAndHideRegForm);

  $("#logCancelButton").click(closeFormEventHandler);
  $("#regCancelButton").click(closeFormEventHandler);

  $signFormWrappers.click(closeFormEventHandler);
}

function getJqueryElements() {
  $signFormHeaders   = $(".sign-form__header");
  $signFormForms     = $(".sign-form__form");
  $signFormWrappers  = $(".sign-form-wrapper");

  $logEmail = $("#logEmail");
  $regEmail = $("#regEmail");

  $logForm = $("#logForm");
  $regForm = $("#regForm");
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
  //event.stopPropagation();
  if (event.target === event.currentTarget) {
    closeForm();
  }

  event.preventDefault();
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

function showLogFormAndHideRegForm(event) {
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