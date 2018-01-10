$(document).ready(function() {
  const categories = [
    {
      title: "snowboard",
      image: "images/no-image.png"
    },
    {
      title: "ski",
      image: "images/no-image.png"
    }
  ];

  const categoryTemplate = $("#categoryTemplate").html();
  const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);

  $("#indexMain").html(compiledCategoryTemplate(categories)); 
});

(function () {
  Handlebars.registerHelper('capFirst', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
})();