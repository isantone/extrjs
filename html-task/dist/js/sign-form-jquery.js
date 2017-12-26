$( document ).ready( readyFn );

function readyFn( jQuery ) {
  $("#signButton").click(showLogFormAndHideRegForm);

  $("input[type=email]").blur(inputBlurHandler);
  $("input[type=password]").blur(inputBlurHandler);

  $("#regButton").click(showRegFormAndHideLogForm);
  $("#logButton").click(showLogFormAndHideRegForm);

  $("#logCancelButton").click(closeFormEventHandler);
  $("#regCancelButton").click(closeFormEventHandler);
}

function hideForms() {
  $(".sign-form-wrapper").hide();
}

function closeForm() {
  $(".sign-form__header").animate({ left: "+=2000px" }, 200, function() {
    $(".sign-form__form").animate({ left: "-=2000px" }, 200, function() {
      $(".sign-form-wrapper").fadeOut(200, function() {
        $(".sign-form__header").animate({ left: "0" });
        $(".sign-form__form").animate({ left: "0" });
      });
    });
  });
}

function closeFormEventHandler(event) {
  event.preventDefault();
  closeForm();
}

function inputBlurHandler(event) {
  showAlertMessage(event);
}

function showAlertMessage(event) {
  if (event.target.value) {
    //$("#" + event.target.type + "ValidationMessage").hide();
    ($(event.target).next()).hide(); 
  }
  else {
    //$("#" + event.target.type + "ValidationMessage").show();
    ($(event.target).next()).show(); 
  }
}

function getJqueryElements() {
  $signFormHeader   = $(".sign-form__header");
  $signFormForm     = $(".sign-form__form");
  $signFormWrapper  = $(".sign-form-wrapper");

  $signForm = $("#signForm");
  $regForm = $("#regForm");
}

function showLogFormAndHideRegForm() {
  $("#regForm").fadeOut();
  $("#signForm").fadeIn();
}

function showRegFormAndHideLogForm() {
  $("#signForm").fadeOut();
  $("#regForm").fadeIn();
}