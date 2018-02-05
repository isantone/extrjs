import paths from '../paths';

function CartView() {}

CartView.prototype.getTemplate = function(data) {

  const catalogTemplate =
  `<div id="pageContent" class="page-main">
    <!-- Navigation -->
    <div class="page-main__content">
      <h2>Shopping cart</h2>
      <main id="productsMain" class="page-main__products">
        {{#each cart}}
          {{> product}}
        {{/each}}
        <br>
        <button onclick="localStorage.clear();" class="button input-size turquoise add-to-cart cart-page__buy-button">CLEAN</button>
      </main>
    </div>
  </div>`;

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
      <svg class="svg-btn js-del-btn" data-id="{{product.id}}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
  </div>
  `;

  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  document.title = "EXTREME SHOP - Cart";
  return compiledCatalogTemplate(data);
};

export default CartView;