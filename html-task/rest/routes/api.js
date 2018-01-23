'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const cart = require('../data/cart');
const catalog = require('../data/catalog');
const products = require('../data/products');
const users = require('../data/users');

const paths = require('./paths');
const path = require('path');

function getCategoryByName(name) {
  const result = catalog.categories.filter(item => {
    return item.title.replace(/ /g, '-').toLowerCase() === name;
  });
  return result;
}

function getProductsFromSpecificCategory(categoryName) {
  const result = products.filter(item => {
    return item.category.replace(/ /g, '-').toLowerCase() === categoryName;
  });
  return result;
}

function getItemById(categoryName, itemId) {
  const result = products.filter(item => {
    return item.category.replace(/ /g, '-').toLowerCase() === categoryName && item.id === itemId;
  });
  return result;
}

function getUserByLogin(userLogin) {
  const result = users.filter(user => {
    return user.login === userLogin;
  });
  return result;
}

function getUserByLoginFromJsonObject(userLogin, JsonObj) {
  const result = JsonObj.filter(user => {
    return user.login === userLogin;
  });
  return result[0];
}

function getCartOfUserByLogin(userLogin) {
  const result = getUserByLogin(userLogin);
  return result;
}

router.get(paths.cart.url, (req, res) => {
  res.send(cart);
});

router.get(paths.categories.url, (req, res) => {
  res.send(catalog);
});

router.get(paths.category.url, (req, res) => {
  const name = req.params.categoryName;
  const category = getCategoryByName(name);
  res.send(category);
});

router.get(paths.categories.products.url, (req, res) => {
  const categoryName = req.params.categoryName;
  const products = getProductsFromSpecificCategory(categoryName);
  res.send(products);
});

router.get(paths.categories.products.product.url, (req, res, next) => {
  const categoryName = req.params.categoryName;
  const itemId = req.params.itemId;
  if (itemId === "3") {
    const err = new Error('Product is unavailable');
    err.status = 404;
    next(err);
  } else {
    const item = getItemById(categoryName, itemId);
    res.send(item);
  }
});

router.get(paths.users.url, (req, res) => {
  res.send(users);
});

router.get(paths.users.user.url, (req, res) => {
  const userLogin = req.params.userLogin;
  const user = getUserByLogin(userLogin);

  res.send(user);
});

router.get("/users/:userLogin/cart", (req, res) => {
  const userLogin = req.params.userLogin;
  const user = getCartOfUserByLogin(userLogin);

  res.send(user[0].cart);
});

router.post("/users/:userLogin/cart/add/:productId", (req, res) => {
  const fs = require('fs');
  const fileName = path.join(__dirname + '/../data/users.json');
  const file = require(fileName);

  const productId = Number(req.params.productId);
  const userLogin = req.params.userLogin;

  const user = getUserByLoginFromJsonObject(userLogin, file);

  const productInCart = user.cart.filter(item => {
    return item.id === productId;
  });

  if (productInCart[0]) {
    productInCart[0].quantity++;
  } else {
    user.cart.push({id: productId, quantity: 1});
  }

  //user.cart.pop(); // delete request
  
  fs.writeFile(fileName, JSON.stringify(file, null, 2));

  res.send(file);
});

router.get("/users/login/:userLogin", (req, res, next) => {
  const fs = require('fs');
  const fileName = path.join(__dirname + '/../data/users.json');
  const file = require(fileName);

  const userLogin = req.params.userLogin;

  const token = req.headers.authorization;


  const user = getUserByLoginFromJsonObject(userLogin, file);
  console.log(token);
  console.log("Bearer " + user.token);

  if (token) {
    if ("Bearer " + user.token === token) {
      res.send(user);
    } else {
      const err = new Error('Invalid token!');
      err.status = 403;
      next(err);
      //res.send('Invalid token');
    }
  }

  // const err = new Error('No token provided!');
  // err.status = 404;
  // next(err);
});

module.exports = router;
