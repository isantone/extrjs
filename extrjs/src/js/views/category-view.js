export default class CategoryView {
  getTemplate(data) {
    const CategoryTemplate = 
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <h2>Shop {{this.[0].category}} Gear</h2>
        <button id="viewChanger" class="button button_color button_auto-width tiny-bottom-margin">GRID / LIST</button>
        <main id="productsMain" class="page-main__products">
          {{#each this}}
            {{> product}}
          {{/each}}
        </main>
      </div>
    </div>`;

  const productTemplate =
    `<div class="product product_grid">
      <a href="#products/{{this.id}}">
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
          <button data-id="{{this.id}}" class="button {{#if this.availability}}button_color add-to-cart">Add to cart{{else}}button_disabled add-to-cart" disabled>Out of stock{{/if}}</button>
        </div>
      </div>
    </div>`;
    Handlebars.registerPartial('product', productTemplate);

    const compiledCategoryTemplate = Handlebars.compile(CategoryTemplate);

    return compiledCategoryTemplate(data);
  }
}