$("#showRegFormButton").click(function() {
  $("#signForm").fadeOut();
  $("#regForm").fadeIn();
});

$("#showSignFormButton").click(function() {
    $("#regForm").fadeOut();
    $("#signForm").fadeIn();
});

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

$("#closeSignForm").click(function(event) {
  event.preventDefault();
  closeForm();
});

$("#closeRegForm").click(function(event) {
  event.preventDefault();
  closeForm();
});
