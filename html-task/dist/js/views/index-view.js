export default class IndexView {
  getTemplate(data) {
    const categoryTemplate = `
      <main id="pageContent" class="index-page">
        {{#each this}}
          <div class="grid index-page__grid">
            <a href="#categories/{{this.name}}/products">
              <img class="grid__image index-page__image" src="{{this.image}}">
              <h2 class="grid__caption index-page__caption tiny-top-margin">{{this.title}}</h2>
            </a>
          </div>
        {{/each}}
      </main>
    `;

<<<<<<< HEAD
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
=======
    const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
    return compiledCategoryTemplate(data);
  }
}
>>>>>>> c3f0bff12aa562a9f860d87223d2e25b450c07d0
