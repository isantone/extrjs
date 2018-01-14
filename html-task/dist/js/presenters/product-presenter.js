//import Presenter from './presenter';

import ProductModel from '../models/product-model';
import ProductView from '../views/product-view';

import Database from '../database';

import changeView from '../view-changer';

function ProductPresenter(idOfProduct) {
	//Presenter.apply(this, arguments);
	this.view = new ProductView();
	this.model = new ProductModel(idOfProduct);
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

ProductPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getEventTargets();
	//this.bindEvents();
};

ProductPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
	this.contentContainer = document.getElementById('pageContent');
};

ProductPresenter.prototype.remove = function() {
  //this.unbindEvents();
  this.delete();
};

ProductPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

ProductPresenter.prototype.getEventTargets = function() {
  this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
  this.body = document.body;
};

ProductPresenter.prototype.bindEvents = function() {
  this.viewChangeButton.addEventListener('click', changeView, false);
  //this.logo.addEventListener('click', this.goToIndex, false);
  //this.body.addEventListener('click', this.preventDefaultForURLs);
};

ProductPresenter.prototype.unbindEvents = function() {
	this.viewChangeButton.removeEventListener('click', changeView, false);
	//this.button2.addEventListener('click', this.handleButtonClick, false);
};

ProductPresenter.prototype.goToIndex = function(event) {
  event.preventDefault();
  location.hash = "";
};

// TEMPORARY! FOR SIMPLE TESTING! REMOVE IN CASE OF HREF FUNCTIONALITY (FOR EXAMPLE HREF TO ANOTHER SITE)
// ProductPresenter.prototype.preventDefaultForURLs = function(event) {
//   if ((event.target.tagName === "A") || (event.target.tagName === "IMG")) {
//     event.preventDefault();
//   }
// };

export default ProductPresenter;