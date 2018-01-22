$(document).ready(function() {
  const categories = [
    {
      title: "snowboard",
      image: "images/products/snowboard/snowboard.png",
      products: []
    },
    {
      title: "alpine ski",
      image: "images/products/ski/ski.png",
      products: []
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