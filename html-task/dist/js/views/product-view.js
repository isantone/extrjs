import paths from '../paths';

export default class ProductView {
  getTemplate(data) {
    // !!! APPLY PARTIAL TEMPLATES FOR SLIDERS
    const catalogTemplate = 
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <p class="breadcrumbs small-bottom-margin"><a href=${paths.pages.catalog}>{{this.category}}</a> / {{this.title}}</p>
        <main id="productsMain" class="page-main__products">
        <div class="slider">
          <div class="slider__view-section">
            <img id="activeImage" class="w3-animate-right slider__big-image" src="{{this.images.[1]}}" alt="Product image">
          </div>
          <div class="slider__preview-section">
            <div id="leftControl" class="slider__control">
              <img src="http://localhost:3000/images/left-arrow.png" alt="Left">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image slider__preview-image_active" src="{{this.images.[0]}}" alt="Product preview">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image" src="{{this.images.[1]}}" alt="Product preview">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image" src="{{this.images.[2]}}" alt="Product preview">
            </div>
            <div id="rightControl" class="slider__control">
              <img src="http://localhost:3000/images/right-arrow.png" alt="Right">
            </div>
          </div>
        </div>
          {{> product}}
        </main>
      </div>
    </div>`;

    const productTemplate =
    `<div class="full-product page-main__full-product">
      <h2>{{this.title}}</h2>
      <p class="full-product__price small-bottom-margin">Price: \$ {{this.price}}</p>
      <p class="full-product__description">{{this.description}}</p>
      <button class="button input-size turquoise add-to-cart small-top-margin">Add to cart</button>
    </div>`;
    Handlebars.registerPartial('product', productTemplate);

    const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

    return compiledCatalogTemplate(data);
  }
}