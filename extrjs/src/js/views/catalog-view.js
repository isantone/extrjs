function CatalogView() {}

CatalogView.prototype.getTemplate = function(data) {

  // const catalogTemplate = `
  //   <main id="indexMain" class="index-page">
  //     {{#each this}}
  //       <div class="grid index-page__grid">
  //         <a href="products.html">
  //           <img class="grid__image index-page__image" src="/images/products/{{underscorer this}}/category.png">
  //           <p class="grid__caption index-page__caption tiny-top-margin">{{capitalizer this}}</p>
  //         </a>
  //       </div>
  //     {{/each}}
  //   </main>
  // `;

  const catalogTemplate = 
  `<div id="pageContent" class="page-main">
    <!-- Navigation -->
    <div class="page-main__content">
      <button id="viewChanger" class="button button_color tiny-bottom-margin">GRID / LIST</button>
      <main id="productsMain" class="page-main__products">
        {{#each this}}
          {{#each this}}
            {{> product}}
          {{/each}}
        {{/each}}
      </main>
    </div>
  </div>`;

const productTemplate =
  `<div class="product product_grid">
    <img class="product__image" src="images/products/{{unreadabler this.category}}/{{this.id}}_1_s.jpg">
    <div class="product__wrapper product__wrapper_grid">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#product?id={{this.id}}">{{trim this.title}}</a>
        </p>
        <p class="product__description product__description_grid">{{this.description}}
        </p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{this.price}}</p>
        <button class="button input-size turquoise add-to-cart">Add to cart</button>
      </div>
    </div>
  </div>`;

  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  Handlebars.registerHelper('capitalizer', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  Handlebars.registerHelper('unreadabler', function(str) {
    if (str) {
      str = str.toLowerCase();
      return str.replace(/ /g, '_');
    }
    return "";
  });

  Handlebars.registerHelper('underscorer', function(str) {
    return str.replace(" ", "_");
  });

  Handlebars.registerHelper('trim', function(str) {
    if (str.length > 20) {
      return str.substr(0, 20) + "...";
    }
    return str;
  });

  return compiledCatalogTemplate(data);


};

export default CatalogView;