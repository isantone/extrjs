function IndexView() {}

IndexView.prototype.getTemplate = function(data) {
  Handlebars.registerHelper('capitalizer', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  Handlebars.registerHelper('underscorer', function(str) {
    return str.replace(" ", "_");
  });

  Handlebars.registerHelper('unhyphenizer', function(str) {
    return str.replace("-", " ");
  });

  const categoryTemplate = `
    <main id="pageContent" class="index-page">
      {{#each this}}
        <div class="grid index-page__grid">
          <a href="#category?name={{this}}">
            <img class="grid__image index-page__image" src="/images/products/{{underscorer this}}/category.png">
            <p class="grid__caption index-page__caption tiny-top-margin">{{unhyphenizer this}}</p>
          </a>
        </div>
      {{/each}}
    </main>
  `;

  const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
  return compiledCategoryTemplate(data);
};

export default IndexView;