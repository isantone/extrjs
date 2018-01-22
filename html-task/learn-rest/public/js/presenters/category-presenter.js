//import Presenter from './presenter';

import CategoryModel from '../models/category-model';
import CategoryView from '../views/category-view';

import Database from '../database';

import changeView from '../view-changer';

import forEach from 'lodash/forEach';
import find from 'lodash/find';

function CategoryPresenter(nameOfCategory) {
	//Presenter.apply(this, arguments);
	this.view = new CategoryView();
	this.model = new CategoryModel(nameOfCategory);
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

CategoryPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getEventTargets();
	this.bindEvents();
};

CategoryPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
  this.contentContainer = document.getElementById('pageContent');
  document.title = "EXTREME SHOP - Category";
};

CategoryPresenter.prototype.remove = function() {
  this.unbindEvents();
  this.delete();
};

CategoryPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

CategoryPresenter.prototype.getEventTargets = function() {
  this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
  this.body = document.body;
  //this.$products = $(".product");
  this.products = document.getElementsByClassName('add-to-cart');
};

CategoryPresenter.prototype.bindEvents = function() {
  this.viewChangeButton.addEventListener('click', changeView, false);
  //this.$products.click(this.addToCart);

  forEach(this.products, (product) => {
		product.addEventListener('click', this.addToCart, false);
	});

  //this.logo.addEventListener('click', this.goToIndex, false);
  //this.body.addEventListener('click', this.preventDefaultForURLs);
};

CategoryPresenter.prototype.unbindEvents = function() {
  this.viewChangeButton.removeEventListener('click', changeView, false);
  forEach(this.products, (product) => {
		product.removeEventListener('click', this.addToCart, false);
	});
	//this.button2.addEventListener('click', this.handleButtonClick, false);
};

CategoryPresenter.prototype.goToIndex = function(event) {
  event.preventDefault();
  location.hash = "";
};

CategoryPresenter.prototype.addToCart = function(event) {
  event.preventDefault();

  let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

  var cartJSON = localStorage.getItem("cart");
	var cart;

	if (cartJSON) {
		cart = JSON.parse(cartJSON);
	} else {
		cart = [];
	}

	let thisProduct = find(cart, ["id", idOfProduct]);
	if (thisProduct) {
		thisProduct.quantity++;
	}

	else {
		cart.push({
			id: idOfProduct,
			quantity: 1
		});
	}

	localStorage.setItem("cart", JSON.stringify(cart));
};

// CategoryPresenter.prototype.changeView = function(event) {
//     //let allDomElementsArray;
//     let allDomElements;
//     allDomElements = document.getElementsByClassName("product");

//     // [].forEach.call(allDomElements, function(domElement){
//     //   domElement.classList.toggle("product_grid");
//     // });

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product_grid");
//     });

//     allDomElements = document.getElementsByClassName("product__wrapper");

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product__wrapper_grid");
//     });

//     allDomElements = document.getElementsByClassName("product__description");

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product__description_grid");
//     });
// };

export default CategoryPresenter;