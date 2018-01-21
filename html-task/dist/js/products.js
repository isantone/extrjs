function productsPage() {
  'use strict';

  let products;
  let id = 0;
  const descr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Praesent tristique, leo id dapibus finibus, lorem nibh blandit sapien...`;

  class Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price) {
      this.id       = ++id;
      this.title    = title;
      this.brand    = brand;
      this.sport    = sport;
      this.image    = image;
      this.category = category;
      this.description = description;
      this.gender   = gender;
      this.size     = size;
      this.year     = year;
      this.price    = price;
    }
  }

  class Snowboard extends Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price, terrain) {
      super(title, brand, sport, image, category, description, gender, size, year, price);
      this.terrain = terrain;
    }
  }

  class Ski extends Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price, terrain) {
      super(title, brand, sport, image, category, description, gender, size, year, price);
      this.terrain = terrain;
    }
  }

  class Apparell extends Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price) {
      super(title, brand, sport, image, category, description, gender, size, year, price);
    }
  }

  class Boots extends Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price) {
      super(title, brand, sport, image, category, description, gender, size, year, price);
    }
  }

  class Protection extends Product {
    constructor(title, brand, sport, image, category, description, gender, size, year, price) {
      super(title, brand, sport, image, category, description, gender, size, year, price);
    }
  }

  let product1 = new Snowboard("Burton Custom X Flying V", "Bataleon", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 150, 2017, 750, "All Mountain");
  let product2 = new Snowboard("Burton Custom X Flying V", "Bataleon", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 154, 2017, 750, "All Mountain");
  let product3 = new Snowboard("Burton Custom X Flying V", "Bataleon", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 158, 2017, 750, "All Mountain");

  let product4 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 150, 2017, 399, "All Mountain");
  let product5 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 153, 2017, 399, "All Mountain");
  let product6 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 156, 2017, 399, "All Mountain");

  let product7 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Ski"      , descr, "M", 177, 2017, 799, "All-Mountain Back");
  let product8 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Ski"      , descr, "M", 185, 2017, 799, "All-Mountain Back");
  let product9 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Ski"      , descr, "M", 193, 2017, 799, "All-Mountain Back");

  let product10 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Ski"      , descr, "M", 177, 2018, 849, "Big Mountain");
  let product11 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Ski"      , descr, "M", 185, 2018, 849, "Big Mountain");
  let product12 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Ski"      , descr, "M", 191, 2018, 849, "Big Mountain");

  const database = {
    "snowboard":  [ product1, product2, product3, product4, product5, product6 ],
    "alpine ski": [ product7, product8, product9, product10, product11, product12 ]
  };
  
  products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12];

  let snowboardChipItem         = _.find(products, function(item) { return item.price < 400; });
  let SkiBigMountainAND2018Item = _.find(products, { 'terrain': "Big Mountain", 'year': 2018 });

  let allForSnowboard           = _.filter(products, ['sport', "Snowboard"]);
  let allForSnowboardK2Brand    = _.filter(products, { 'sport': "Snowboard", 'brand': "K2" });

  let cart = _.filter(products, function(item) { return item.id == 3 || item.id == 11; }); // Cart with 2 items

  let skiId7 = _.find(products, ['id', 7]);
  let productId2;

  //_.forEach(database, (category) => {
    _.forEach(database, (product) => {
		//_.forOwn(database, function(product) {
      productId2 = _.find(product, ["id", 2]);
      if (productId2) {
        return false;
      }
		});
		//product = find(category, ['id', this.idOfProduct]);
  //});

  let itemIndexInCartWithSavedPriceOrder = _.sortedIndexBy(cart, skiId7, 'price');
  cart.splice(itemIndexInCartWithSavedPriceOrder, 0, skiId7); // Cart with 3 items with saved order by price

  let removeSoldItemsWithId7_8_10 = _.remove(products, function(item) { return item.id == 7 || item.id == 8 || item.id == 11; });

  let restoreProducts = _.concat(products, removeSoldItemsWithId7_8_10);

  _.forEach(removeSoldItemsWithId7_8_10, function(item) {
    let itemIndexInProductsWithSavedIdOrder = _.sortedIndexBy(products, item, 'id');
    products.splice(itemIndexInProductsWithSavedIdOrder, 0, item);
  });

  let array1 = [1,2,3,4,5];
  let array2 = [3,4,5,6,7];

  let diffArray = _.difference(array1, array2);

  let removeSoldItemsFromProducts = _.difference(products, cart);

  const productsTemplate = 
    `{{#each this}}
      {{> product}}
    {{/each}}`;
  const compiledProductsTemplate = Handlebars.compile(productsTemplate);

  const productTemplate = 
    `<div class="product product_grid">
      <img class="product__image" src="{{ this.image }}">
      <div class="product__wrapper product__wrapper_grid">
        <div class="product__left-part">
          <p class="product__name">
            <a href="#">{{trim this.title}}</a>
          </p>
          <p class="product__description product__description_grid">{{this.description}}
          </p>
        </div>
        <div class="product__right-part">
          <p class="product__price">Price: \$ {{this.price}}</p>
          <button class="button input-size turquoise add-to-cart">Add to card</button>
        </div>
      </div>
    </div>`;

  $(document).ready(function() {

    $("#productsMain").html(compiledProductsTemplate(products)); 

  });

  Handlebars.registerPartial('product', productTemplate);

  Handlebars.registerHelper('trim', function(str) {
    if (str.length > 20) {
      return str.substr(0, 20) + "...";
    }
    return str;
  });

}

productsPage();