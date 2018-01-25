'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const cart = require('../data/cart');
//const catalog = require('../data/catalog');
const products = require('../data/products');
const users = require('../data/users.json');

const paths = require('./paths');
const path = require('path');

const fs = require('fs');
//const usersDir = path.join(__dirname + '/../data/users.json');
const usersDir = './data/users.json';

//const usersJsonObject = require(usersJsonFile);

class Json {
  constructor(filePath) {
    this.file = filePath;
    this.obj = require(filePath);
  }

  writeInFile(uglify) {
    if (uglify) {
      fs.writeFile(this.file, JSON.stringify(this.obj));
    }

    fs.writeFile(this.file, JSON.stringify(this.obj, null, 2));
  }

  getElementsByPropertyValue(property, value) {
    const resultArray = this.obj.filter(element => {
      return element[property] === value;
    });

    return resultArray;
  }

  getElementsByPropertyUrlValue(property, urlValue) {
    const resultArray = this.obj.filter(element => {
      return element[property].replace(/ /g, '-').toLowerCase() === urlValue;
    });

    return resultArray;
  }

  getElementByPropertyValue(property, value) {
    //return this.getElementsByPropertyValue(property, value)[0];
    const result = this.obj.find(element => {
      return element[property] === value;
    });

    return result;
  }
} 

class UsersJson extends Json {
  constructor() {
    this.getUserByLogin = this.getElementByPropertyValue(this, "login");
  }

  // getUserByLogin(userLogin) {
  //   //this.getElementByPropertyValue.bind(null, "login");
  //   return this.getElementByPropertyValue("login", userLogin);
  // }

  getUserByToken(userToken) {
    const tokenArray = userToken.split(' '); //OR store "BEARER *TOKEN*" in database
    const tokenType = tokenArray[0];
    const token = tokenArray[1];
    if (tokenType === "Bearer") {
      return this.getElementByPropertyValue("token", userToken);
    }
  }

  getUserByCredentials(userCredentialsBase64) {
    const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
    const userCredentialsArray = userCredentials.split(':');
    const userLogin = userCredentialsArray[0];
    const userPassword = userCredentialsArray[1];
  
    const resultUser = users.find(user => {
      return user.email === userLogin && user.password === userPassword;
    });
  
    return resultUser;
  }
}

class ProductsJson extends Json {
  getProductsFromCategory(categoryUrlName) {
    return this.getElementsByPropertyUrlValue("category", categoryUrlName);
  }

  getItemById(itemId) {
    return this.getElementByPropertyValue("id", itemId);
  }
}
const productss = new ProductsJson('../data/products.json');

class CatalogJson extends Json {
  constructor(filePath) {
    super(filePath);
    this.getCategoryByName = this.getElementByPropertyValue.bind(this, "name");
  }
  // getCategoryByName(name) {
  //   return this.getElementByPropertyValue("name", name);
  //   //item.title.replace(/ /g, '-').toLowerCase() === name;
  // }
}
const catalog = new CatalogJson('../data/catalog.json');

function getCategoryByName(name) {
  const result = catalog.categories.filter(item => {
    return item.title.replace(/ /g, '-').toLowerCase() === name;
  });

  return result[0];
}

function getProductsFromSpecificCategory(categoryName) {
  const result = products.filter(item => {
    return item.category.replace(/ /g, '-').toLowerCase() === categoryName;
  });

  return result;
}

function getItemById(itemId) {
  const result = products.filter(item => {
    return item.id === itemId;
  });
  return result[0];
}

function getUserByLogin(userLogin) {
  const result = users.filter(user => {
    return user.login === userLogin;
  });

  return result[0];
}

function getUserByCredentials(userCredentialsBase64) {
  const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
  const userCredentialsArray = userCredentials.split(':');
  const userLogin = userCredentialsArray[0];
  const userPassword = userCredentialsArray[1];

  const resultUser = users.filter(user => {
    return user.login === userLogin && user.password === userPassword;
  });

  return resultUser[0];
}

function getUserByToken(userToken) {
  const result = users.find(user => {
    return "Bearer " + user.token === userToken;
  });

  return result;
}

function generateRandomToken() {
  //window.crypto.getRandomValues(array);
  let randomNumber = Math.round(Math.random() * 100000000000);

  if (!randomNumber || randomNumber === 1) {
    randomNumber = Math.round(Math.random() * 100000000000);
  }

  return randomNumber;
}

// router.get(paths.cart.url, (req, res) => {
//   res.send(cart);
// });

router.get(paths.categories.url, (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  // res.send(catalog);
  res.send(catalog.obj);
});

router.get(paths.category.url, (req, res) => {
  const name = req.params.categoryName;
  const category = catalog.getCategoryByName(name);

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.send(category);
});

router.get(paths.category.products.url, (req, res) => {
  const categoryUrlName = req.params.categoryName;
  const products = productss.getProductsFromCategory(categoryUrlName);

  res.send(products);
});

router.get(paths.category.products.product.url, (req, res, next) => {
  const categoryName = req.params.categoryName;
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);

  res.send(item);
});

router.get(paths.users.url, (req, res) => {
  res.send(users);
});

router.get(paths.users.user.url, (req, res) => {
  const userLogin = req.params.userLogin;
  const user = getUserByLogin(userLogin);

  res.send(user);
});

router.get(paths.cart.url, (req, res) => {
  const userToken = req.headers.authorization || res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
  const user = getUserByToken(userToken); // || unauthorized cart -> session storage 

  res.send(user.cart);
});

router.post(paths.cart.add.url, (req, res, next) => {
  const productId = Number(req.body.id) || res.status(404).send({ success: false, message: 'Product error: No product ID provided.'});
  const userToken = req.headers.authorization || res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
  const item = getItemById(productId);

  if (item && item.availability) {
    const user = getUserByToken(userToken);
    const productInCart = user.cart.filter(item => {
      return item.id === productId;
    });

    if (productInCart[0]) {
      productInCart[0].quantity++;
    } else {
      user.cart.push({id: productId, quantity: 1});
    }

    //user.cart.pop(); // delete request
    
    fs.writeFile(usersDir, JSON.stringify(users, null, 2));

    res.send(user.cart);
  } else {
    res.status(404).send({ success: false, message: 'This product is unavailable at the moment.'});
  }
});

router.post(paths.login.url, (req, res, next) => {
  const userCredentialsBase64 = req.headers.authorization.split(' ')[1];
  const user = getUserByCredentials(userCredentialsBase64); 

  if (user) {
    user.token = generateRandomToken(); // and -> to session storage // = unAuthorizedToken || userToken

    fs.writeFile(usersDir, JSON.stringify(users, null, 2));

    res.setHeader("Cache-Control", "public, max-age=2592");
    res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());
  
    res.send(user);
  } else {
    res.status(401).send({ success: false, message: 'Invalid login or password.'});
  }
});

router.post(paths.register.url, (req, res, next) => {
  const userCredentialsBase64 = req.headers.authorization.split(' ')[1];
  const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
  const userCredentialsArray = userCredentials.split(':');
  const userLogin = userCredentialsArray[0];
  const userPassword = userCredentialsArray[1];

  let user = getUserByLogin(userLogin); 

  if (user) {
    res.status(403).send({ success: false, message: 'This email is already used.'});
  } else {
    //CreateUser//
    const newUser = {
      "login": userLogin,
      "email": userLogin + "@domain.com",
      "password": userPassword,
      "token": generateRandomToken(),
      "cart": []
    };
    users.push(newUser);

    //user.token  // -> to session storage // = unAuthorizedToken || userToken
    ///

    fs.writeFile(usersDir, JSON.stringify(users, null, 2));

    res.setHeader("Cache-Control", "public, max-age=2592");
    res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

    //user = getUserByLogin(userLogin);
    res.send(newUser);
  }
});

module.exports = router;
