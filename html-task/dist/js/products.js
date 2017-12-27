function products() {
  'use strict';

  let products;
  let id = 0;

  class product {
    constructor(title, brand, sport, image, category, terrain, gender, size, year, price) {
      this.id       = ++id;
      this.title    = title;
      this.brand    = brand;
      this.sport    = sport;
      this.image    = image;
      this.category = category;
      this.terrain  = terrain;
      this.gender   = gender;
      this.size     = size;
      this.year     = year;
      this.price    = price;
    }
  }

  let product1 = new product("Burton Custom X Flying V", "Bataleon", "Snowboard", "", "Snowboard", "All Mountain",      "M", 150, 2017, 750);
  let product2 = new product("Burton Custom X Flying V", "Bataleon", "Snowboard", "", "Snowboard", "All Mountain",      "M", 154, 2017, 750);
  let product3 = new product("Burton Custom X Flying V", "Bataleon", "Snowboard", "", "Snowboard", "All Mountain",      "M", 158, 2017, 750);

  let product4 = new product("K2 Raygun",                     "K2", "Snowboard", "", "Snowboard", "All Mountain",      "M", 150, 2017, 399);
  let product5 = new product("K2 Raygun",                     "K2", "Snowboard", "", "Snowboard", "All Mountain",      "M", 153, 2017, 399);
  let product6 = new product("K2 Raygun",                     "K2", "Snowboard", "", "Snowboard", "All Mountain",      "M", 156, 2017, 399);

  let product7 = new product("Nordica ENFORCER 100",      "Nordica", "Ski",       "",       "Ski", "All-Mountain Back", "M", 177, 2017, 799);
  let product8 = new product("Nordica ENFORCER 100",      "Nordica", "Ski",       "",       "Ski", "All-Mountain Back", "M", 185, 2017, 799);
  let product9 = new product("Nordica ENFORCER 100",      "Nordica", "Ski",       "",       "Ski", "All-Mountain Back", "M", 193, 2017, 799);

  let product10 = new product("Nordica ENFORCER 110",      "Nordica", "Ski",       "",       "Ski", "Big Mountain",      "M", 177, 2018, 849);
  let product11 = new product("Nordica ENFORCER 110",      "Nordica", "Ski",       "",       "Ski", "Big Mountain",      "M", 185, 2018, 849);
  let product12 = new product("Nordica ENFORCER 110",      "Nordica", "Ski",       "",       "Ski", "Big Mountain",      "M", 191, 2018, 849);

  products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12];

  let snowboardChipItem         = _.find(products, function(item) { return item.price < 400; });
  let SkiBigMountainAND2018Item = _.find(products, { 'terrain': "Big Mountain", 'year': 2018 });

  let allForSnowboard           = _.filter(products, ['sport', "Snowboard"]);
  let allForSnowboardK2Brand    = _.filter(products, { 'sport': "Snowboard", 'brand': "K2" });

  let cart = _.filter(products, function(item) { return item.id == 3 || item.id == 11; }); // Cart with 2 items

  let skiId7 = _.find(products, ['id', 7]);
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

}

products();