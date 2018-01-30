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
        {{#each cart}}
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
    <img class="product__image" src="{{product.images.[0]}}">
    <div class="product__wrapper product__wrapper">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#products/{{product.id}}">{{product.title}}</a>
        </p>
        <p class="product__description product__description">{{product.description}}</p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{product.price}}</p>
        <p >Quantity: {{quantity}}</p>
      </div>
    </div>
  </div>
  <button class="button">DELETE</button>
  <button class="button button_color add-to-cart">BUY</button>
  `;


  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  document.title = "EXTREME SHOP - Cart";
  return compiledCatalogTemplate(data);
};

export default CartView;