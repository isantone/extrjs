function Database() {
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

  let product1 = new Snowboard("Burton Custom X Flying V", "Burton", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 150, 2017, 599, "All Mountain");
  let product2 = new Snowboard("Burton Custom X Flying V", "Burton", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 154, 2017, 599, "All Mountain");

  let product3 = new Snowboard("Burton Ripcord"          , "Burton", "Snowboard", "images/products/snowboard/k2_enjoyer_1_s.png", "Snowboard", descr, "M", 158, 2017, 379, "All Mountain");

  let product4 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 150, 2017, 399, "All Mountain");
  let product5 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 153, 2017, 399, "All Mountain");
  let product6 = new Snowboard("K2 Raygun"               , "K2"      , "Snowboard", "images/products/snowboard/k2_raygun_1_s.jpg", "Snowboard", descr, "M", 156, 2017, 399, "All Mountain");

  let product7 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Alpine Ski", descr, "M", 177, 2017, 799, "All-Mountain Back");
  let product8 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Alpine Ski", descr, "M", 185, 2017, 799, "All-Mountain Back");
  let product9 = new Ski      ("Nordica ENFORCER 100"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_2_S.jpg", "Alpine Ski", descr, "M", 193, 2017, 799, "All-Mountain Back");

  let product10 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Alpine Ski", descr, "M", 177, 2018, 849, "Big Mountain");
  let product11 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Alpine Ski", descr, "M", 185, 2018, 849, "Big Mountain");
  let product12 = new Ski     ("Nordica ENFORCER 110"    , "Nordica" , "Alpine Ski"      , "images/products/ski/enforcer_100_3_S.jpg", "Alpine Ski", descr, "M", 191, 2018, 849, "Big Mountain");

  const database = {
    "snowboard":  [ product1,/* product2,*/ product3, product4/*, product5, product6 */],
    "alpine ski": [ product7, product8, product9, product10, product11, product12 ]
  };

  return database;
}

export default Database;