'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const paths = require('./paths');

const router = express.Router();

const UsersJson = require('../js/users-json.js');
const CatalogJson = require('../js/catalog-json.js');
const ProductsJson = require('../js/products-json.js');

const users = new UsersJson(path.join(__dirname, '..', 'data', 'users.json'));
const catalog = new CatalogJson(path.join(__dirname, '..', 'data', 'catalog.json'));
const products = new ProductsJson(path.join(__dirname, '..', 'data', 'products.json'));

function generateRandomToken() {
  //window.crypto.getRandomValues(array);
  let randomNumber = Math.round(Math.random() * 100000000000);

  if (!randomNumber || randomNumber === 1) {
    randomNumber = Math.round(Math.random() * 100000000000);
  }

  return randomNumber;
}

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

router.post(paths.login.url, (req, res, next) => {
  const userCredentialsBase64 = req.headers.authorization.split(' ')[1];
  const user = users.getUserByCredentials(userCredentialsBase64) || res.status(401).send({ success: false, message: 'Invalid login or password.'});

  user.token = generateRandomToken(); // and -> to session storage // = unAuthorizedToken || userToken

  users.writeInFile();

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());

  res.send(user);
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

router.post(paths.cart.url, (req, res, next) => {
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

router.get(paths.categories.url, (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7777");

  res.send(catalog.obj);
});

router.get(paths.categories.category.url, (req, res) => {
  const name = req.params.categoryName;
  const category = catalog.getCategoryByName(name);

  res.setHeader("Cache-Control", "public, max-age=2592");
  res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7777");

  res.send(category);
});

router.get(paths.categories.category.products.url, (req, res) => {
  const categoryUrlName = req.params.categoryName;
  const items = products.getProductsFromCategory(categoryUrlName);

  res.setHeader("Cache-Control", "public, max-age=2592");
  //res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7777");

  res.send(items);
});

router.get(paths.categories.category.products.product.url, (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = products.getItemById(itemId);

  res.setHeader("Cache-Control", "public, max-age=2592");
  //res.setHeader("Expires", new Date(Date.now() + 2592000).toUTCString());
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7777");

  res.send(item);
});

module.exports = router;
