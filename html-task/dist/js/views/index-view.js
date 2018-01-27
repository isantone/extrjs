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

    const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
    return compiledCategoryTemplate(data);
  }
}