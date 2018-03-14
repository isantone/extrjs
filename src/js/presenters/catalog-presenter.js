//import Presenter from './presenter';

import CatalogModel from '../models/catalog-model';
import CatalogView from '../views/catalog-view';

import changeView from '../view-changer';

function CatalogPresenter() {
	//Presenter.apply(this, arguments);
	this.view = new CatalogView();
	this.model = new CatalogModel();
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

CatalogPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getEventTargets();
	this.bindEvents();
};

CatalogPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
  this.contentContainer = document.getElementById('pageContent');
  document.title = "EXTREME SHOP - Catalog";
};

CatalogPresenter.prototype.remove = function() {
  this.unbindEvents();
  this.delete();
};

CatalogPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

CatalogPresenter.prototype.getEventTargets = function() {
  this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
  this.body = document.body;
};

CatalogPresenter.prototype.bindEvents = function() {
  this.viewChangeButton.addEventListener('click', changeView, false);
  //this.logo.addEventListener('click', this.goToIndex, false);
  //this.body.addEventListener('click', this.preventDefaultForURLs);
};

CatalogPresenter.prototype.unbindEvents = function() {
	this.viewChangeButton.removeEventListener('click', changeView, false);
	//this.button2.addEventListener('click', this.handleButtonClick, false);
};

CatalogPresenter.prototype.goToIndex = function(event) {
  event.preventDefault();
  location.hash = "";
};

// TEMPORARY! FOR SIMPLE TESTING! REMOVE IN CASE OF HREF FUNCTIONALITY (FOR EXAMPLE HREF TO ANOTHER SITE)
CatalogPresenter.prototype.preventDefaultForURLs = function(event) {
  if ((event.target.tagName === "A") || (event.target.tagName === "IMG")) {
    event.preventDefault();
  }
};

// CatalogPresenter.prototype.changeView = function(event) {
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

export default CatalogPresenter;