function IndexView() {}

IndexView.prototype.getTemplate = function(data) {
  const categoryTemplate = `
    <main id="pageContent" class="index-page">
      {{#each this}}
        <div class="grid index-page__grid">
          <a href="#category?name={{this.title}}">
            <img class="grid__image index-page__image" src="{{this.image}}">
            <p class="grid__caption index-page__caption tiny-top-margin">{{this.title}}</p>
          </a>
        </div>
      {{/each}}
    </main>
  `;

  const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
  return compiledCategoryTemplate(data);
};

export default IndexView;