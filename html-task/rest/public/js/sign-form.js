function showSignForm() {
  hideForm("regForm");

  document.getElementById("signForm").classList.remove("hide");
}

function hideForm(formName) {
  document.getElementById(formName).classList.add("hide");
}

function showRegForm() {
  hideForm("signForm");

  document.getElementById("regForm").classList.remove("hide");
}