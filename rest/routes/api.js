'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
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
  return Math.round(Math.random() * 100000000000);
}

router.post(paths.register.url, upload.array(), (req, res) => {
  //res.setHeader("Access-Control-Allow-Credentials", "true");

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (userEmail && userPassword) {
    let user = users.getUserByEmail(userEmail);
    console.log(">>>>" + user + "<<<<<");
    if (user) {
      res.status(403).send({ success: false, message: 'This email is already taken.'});
    } else {
      //CreateUser//
      console.log("Creating user");
      const newUser = {
        "email": userEmail,
        "password": userPassword,
        "token": generateRandomToken(),
        "cart": []  // OR cart from session storage
      };
      users.obj.push(newUser);
      users.writeInFile();

      //delete users.obj.password;
      res.send(users.obj);
    }
  } else {
    res.status(403).send({ success: false, message: 'Wrong email or password.'});
  }
});

router.post(paths.login.url, upload.array(), (req, res, next) => {
  const userCredentials = req.body;
  const userEmail = userCredentials.email;
  const userPassword = userCredentials.password;

  const user = users.getUserByCredentials(userEmail, userPassword);

  if (user) {
    user.token = generateRandomToken(); // and -> to session storage // = unAuthorizedToken || userToken
    users.writeInFile();
    //delete user.password;
    res.send(user);
  }
  else {
    res.status(401).send({ success: false, message: 'Invalid email or password.'});
  }
});

router.get(paths.users.url, (req, res) => {
  res.send(users.obj);
});

router.get(paths.users.user.url, (req, res) => {
  const userEmail = req.params.userEmail;
  const user = users.getUserByEmail(userEmail);

  res.send(user);
});

router.get(paths.cart.url, (req, res) => {
  const userToken = req.headers.authorization;
  if (userToken) {
    const user = users.getUserByToken(userToken); // || unauthorized cart -> session storage
    //delete user.password;

    user.cart.forEach((element) => {
      element.product = products.getItemById(element.id);
    });
    console.log(user);
    res.send(user);

  } else {
    res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
  }
});

router.post("/cart", upload.array(), (req, res, next) => {
  const productId = Number(req.body.id);

  if (productId) {
    const userToken = req.headers.authorization;
    if (userToken) {
      const item = products.getItemById(productId);

      if (item && item.availability) {
        const user = users.getUserByToken(userToken);

        const productInCart = user.cart.find(item => {
          return item.id === productId;
        });

        if (productInCart) {
          productInCart.quantity++;
        } else {
          user.cart.push({id: productId, quantity: 1});
        }

        users.writeInFile();
        //delete user.password;
        res.send(user);
      } else {
        res.status(404).send({ success: false, message: 'This product is unavailable at the moment.'});
      }
    } else {
      res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
    } 
  } else {
    res.status(404).send({ success: false, message: 'Product error: No product ID provided.'});
  }
});

router.delete("/cart", upload.array(), (req, res, next) => {
  const productId = Number(req.body.id);

  if (productId) {
    const userToken = req.headers.authorization;
    if (userToken) {
        const user = users.getUserByToken(userToken);
        const indexOfProduct = user.cart.findIndex((element) => {
          return element.id === productId;
        });
        if (indexOfProduct > 0) {
          console.log(user.cart);
          user.cart.splice(indexOfProduct, 1);
          console.log(user.cart);
  
          users.writeInFile();
          //delete user.password;
          res.send(user);
        } else {
          res.status(404).send({ success: false, message: 'Error: No such product in cart.'});
        }
    } else {
      res.status(401).send({ success: false, message: 'Authorization error: No token provided.'});
    } 
  } else {
    res.status(404).send({ success: false, message: 'Product error: No product ID provided.'});
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
