export default class CategoryView {
  getTemplate(data) {
    const CategoryTemplate = 
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <button id="viewChanger" class="button input-size tiny-bottom-margin">GRID / LIST</button>
        <main id="productsMain" class="page-main__products">
          {{#each this}}
            {{> product}}
          {{/each}}
        </main>
      </div>
    </div>`;

  const productTemplate =
    `<div class="product product_grid">
      <a href="#/products/{{this.id}}">
        <img class="product__image" src="{{this.images.[0]}}">
      </a>
      <div class="product__wrapper product__wrapper_grid">
        <div class="product__left-part">
          <a href="#products/{{this.id}}">
            <p class="product__name">
              {{this.title}}
            </p>
          </a>
          <p class="product__description product__description_grid">{{this.description}}</p>
        </div>
        <div class="product__right-part">
          <p class="product__price">Price: \$ {{this.price}}</p>
          <button data-id="{{this.id}}" class="button button_color input-size add-to-cart">Add to cart</button>
        </div>
      </div>
    </div>`;
    Handlebars.registerPartial('product', productTemplate);

    const compiledCategoryTemplate = Handlebars.compile(CategoryTemplate);

    return compiledCategoryTemplate(data);
  }
}