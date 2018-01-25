'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const paths = require('./paths');

const router = express.Router();

class Json {
  constructor(filePath) {
    this.file = filePath;
    this.obj = require(filePath);
  }

  writeInFile(uglify) {
    if (uglify) {
      fs.writeFile(this.file, JSON.stringify(this.obj));
    }
    else {
      fs.writeFile(this.file, JSON.stringify(this.obj, null, 2));
    }
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
    const result = this.obj.find(element => {
      return element[property] === value;
    });

    return result;
  }
}

class UsersJson extends Json {
  constructor(...rest) {
    super(...rest);
    this.getUserByLogin = super.getElementByPropertyValue.bind(this, "login");
  }

  // getUserByLogin(userLogin) {
  //   //this.getElementByPropertyValue.bind(null, "login");
  //   return this.getElementByPropertyValue("login", userLogin);
  // }

  getUserByToken(userToken) {
    const tokenArray = userToken.split(' '); //OR store "BEARER *TOKEN*" in database
    const tokenType = tokenArray[0];
    const token = Number(tokenArray[1]);

    if (tokenType === "Bearer") {
      return this.getElementByPropertyValue("token", token);
    }
  }

  getUserByCredentials(userCredentialsBase64) {
    const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
    const userCredentialsArray = userCredentials.split(':');
    const userLogin = userCredentialsArray[0];
    const userPassword = userCredentialsArray[1];

    const resultUser = this.obj.find(user => {
      return user.email === userLogin && user.password === userPassword;
    });

    return resultUser;
  }
}
const users = new UsersJson(path.join(__dirname + '/../data/users.json'));

class ProductsJson extends Json {
  getProductsFromCategory(categoryUrlName) {
    return this.getElementsByPropertyUrlValue("category", categoryUrlName);
  }

  getItemById(itemId) {
    return this.getElementByPropertyValue("id", itemId);
  }
}
const products = new ProductsJson('../data/products.json');

class CatalogJson extends Json {
  constructor(...rest) {
    super(...rest);
    this.getCategoryByName = super.getElementByPropertyValue.bind(this, "name");
  }
  // getCategoryByName(name) {
  //   return this.getElementByPropertyValue("name", name);
  //   //item.title.replace(/ /g, '-').toLowerCase() === name;
  // }
}
const catalog = new CatalogJson('../data/catalog.json');

function generateRandomToken() {
  //window.crypto.getRandomValues(array);
  let randomNumber = Math.round(Math.random() * 100000000000);

  if (!randomNumber || randomNumber === 1) {
    randomNumber = Math.round(Math.random() * 100000000000);
  }

  return randomNumber;
}

router.get(paths.categories.url, (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

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
  const items = products.getProductsFromCategory(categoryUrlName);

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.send(items);
});

router.get(paths.category.products.product.url, (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = products.getItemById(itemId);

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.send(item);
});

router.get(paths.users.url, (req, res) => {
  res.send(users.obj);
});

router.get(paths.users.user.url, (req, res) => {
  const userLogin = req.params.userLogin;
  const user = users.getUserByLogin(userLogin);

  res.send(user);
});

router.get(paths.cart.url, (req, res) => {
  const userToken = req.headers.authorization || res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
  const user = users.getUserByToken(userToken); // || unauthorized cart -> session storage

  res.send(user.cart);
});

router.post(paths.cart.add.url, (req, res, next) => {
  const productId = Number(req.body.id) || res.status(404).send({ success: false, message: 'Product error: No product ID provided.'});
  //res.setHeader("WWW-Authenticate", "Bearer"); <------
  const userToken = req.headers.authorization || res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
  const item = products.getItemById(productId);

  if (item && item.availability) {
    const user = users.getUserByToken(userToken);

    const productInCart = user.cart.filter(item => {
      return item.id === productId;
    });

    if (productInCart[0]) {
      productInCart[0].quantity++;
    } else {
      user.cart.push({id: productId, quantity: 1});
    }

    //user.cart.pop(); // delete request

    users.writeInFile();

    res.send(user.cart);
  } else {
    res.status(404).send({ success: false, message: 'This product is unavailable at the moment.'});
  }
});

router.post(paths.login.url, (req, res, next) => {

  const userCredentialsBase64 = req.headers.authorization.split(' ')[1];
  const user = users.getUserByCredentials(userCredentialsBase64) || res.status(401).send({ success: false, message: 'Invalid login or password.'});

  user.token = generateRandomToken(); // and -> to session storage // = unAuthorizedToken || userToken

  users.writeInFile();

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.send(user);
});

router.post(paths.register.url, (req, res) => {
  const userCredentialsBase64 = req.headers.authorization.split(' ')[1];
  const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
  const userCredentialsArray = userCredentials.split(':');
  const userLogin = userCredentialsArray[0];
  const userPassword = userCredentialsArray[1];

  let user = users.getUserByLogin(userLogin);

  if (user) {
    res.status(403).send({ success: false, message: 'This email is already used.'});
  } else {
    //CreateUser//
    const newUser = {
      "login": userLogin,
      "email": userLogin + "@domain.com",
      "password": userPassword,
      "token": generateRandomToken(),
      "cart": []  // OR cart from session storage
    };
    users.obj.push(newUser);

    //user.token  // -> to session storage // = unAuthorizedToken || userToken
    ///

    users.writeInFile();

    res.setHeader("Cache-Control", "public, max-age=2592");
    res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

    res.send(users.obj);
  }
});

module.exports = router;
