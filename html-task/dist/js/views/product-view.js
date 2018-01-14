function ProductView() {}

ProductView.prototype.getTemplate = function(data) {

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
      <div class="slider">
        <div class="slider__view-section">
          <img id="activeImage" class="w3-animate-right slider__big-image" src="images/products/{{unreadabler this.category}}/{{this.id}}_1.jpg" alt="Product image">
        </div>
        <div class="slider__preview-section">
          <div id="left-control" class="slider__control" onclick="previousSlide();"><img src="images/left-arrow.png" alt="Left"></div>
          <img class="slider__preview-image slider__preview-image_active" onclick="setActive(this);" src="images/products/{{unreadabler this.category}}/{{this.id}}_1_s.jpg" alt="Product preview">
          <img class="slider__preview-image" onclick="setActive(this);" src="images/products/{{unreadabler this.category}}/{{this.id}}_2_s.jpg" alt="Product preview">
          <img class="slider__preview-image" onclick="setActive(this);" src="images/products/{{unreadabler this.category}}/{{this.id}}_3_s.jpg" alt="Product preview">
          <div id="right-control" class="slider__control" onclick="nextSlide();"><img src="images/right-arrow.png" alt="Right"></div>
        </div>
      </div>

        {{> product}}
      </main>
    </div>
  </div>`;

const productTemplate =
  `<div class="product">
    <div class="product__wrapper">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#product?id={{this.id}}">{{this.title}}</a>
        </p>
        <p class="product__description">{{this.description}}
        </p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{this.price}}</p>
        <button class="button input-size turquoise add-to-card">Add to card</button>
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

  Handlebars.registerHelper('spacer', function(str) {
    return str.replace("_", " ");
  });

  Handlebars.registerHelper('trim', function(str) {
    if (str.length > 20) {
      return str.substr(0, 20) + "...";
    }
    return str;
  });

  document.title = "EXTREME SHOP - Catalog - " + data.title;
  return compiledCatalogTemplate(data);
};

export default ProductView;