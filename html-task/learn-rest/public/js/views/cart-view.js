import paths from '../paths';

function CartView() {}

CartView.prototype.getTemplate = function(data) {

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

  // !!! APPLY PARTIAL TEMPLATES FOR SLIDERS
  const catalogTemplate =
  `<div id="pageContent" class="page-main">
    <!-- Navigation -->
    <div class="page-main__content">
      <main id="productsMain" class="page-main__products">
        {{#each this}}
          {{> product}}
        {{/each}}
        <br><br><br>
        <button onclick="localStorage.clear();" class="button input-size turquoise add-to-cart cart-page__buy-button">CLEAN</button>
      </main>
    </div>
  </div>`;

// const productTemplate =
//   `<div class="full-product page-main__full-product">
//     <h2>{{this.title}}</h2>
//     <p class="full-product__price small-bottom-margin">Price: \$ {{this.price}}</p>
//     <p class="full-product__description">{{this.description}}</p>
//     <button class="button input-size turquoise add-to-cart small-top-margin">Add to cart</button>
//   </div>`;

  const productTemplate =
  `<div class="product">
    <img class="product__image" src="images/products/{{unreadabler this.category}}/{{this.id}}_1_s.jpg">
    <div class="product__wrapper product__wrapper">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#product?id={{this.id}}">{{trim this.title}}</a>
        </p>
        <p class="product__description product__description">{{this.description}}
        </p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{this.price}}</p>
        <p >Quantity: {{this.quantity}}</p>
      </div>
    </div>
  </div>
  <button class="button input-size turquoise add-to-cart cart-page__buy-button">BUY</button>
  `;


  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  Handlebars.registerHelper('capitalizer', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  Handlebars.registerHelper('unreadabler', function(str) {
    if (str) {
      str = str.toLowerCase();
      return str.replace(/ /g, '-');
    }
    return "";
  });

  Handlebars.registerHelper('spacer', function(str) {
    return str.replace("_", " ");
  });

  Handlebars.registerHelper('trim', function(str) {
    if (str.length > 20) {
      return str.substr(0, 20) + "...";
    }
    return str;
  });

  document.title = "EXTREME SHOP - Cart";
  return compiledCatalogTemplate(data);
};

export default CartView;