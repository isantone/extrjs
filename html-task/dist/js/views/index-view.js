export default class IndexView {
  getTemplate(data) {
    const categoryTemplate = `
      <main id="pageContent" class="index-page">
      <!--<img src="http://localhost:3000/images/promo/1.jpg">-->
        {{#each this}}
          <div class="catalog__container">
            <div class="catalog__header-container">
              <a href="#categories/{{this.name}}/products">
                <h2>{{this.title}}</h2>
                <!--<img class="" src="{{this.image}}">-->
              </a>
            </div>
            {{#each catalog}}
              <div class="catalog__item-wrapper">
                <img class="catalog__image" src="{{this.image}}">
                <a class="catalog__caption" href="#categories/{{this.name}}/products">{{this.title}}</a>
              </div>
            {{/each}}
          </div>
        {{/each}}
      </main>
    `;

    const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
    return compiledCategoryTemplate(data);
  }
}
