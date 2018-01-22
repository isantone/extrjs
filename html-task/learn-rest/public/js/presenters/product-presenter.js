//import Presenter from './presenter';

import ProductModel from '../models/product-model';
import ProductView from '../views/product-view';

import Database from '../database';

//import changeView from '../view-changer';
import {setActive, nextSlide, previousSlide} from '../slider';

import forEach from 'lodash/forEach';

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
	this.bindEvents();
};

ProductPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
	this.contentContainer = document.getElementById('pageContent');
};

ProductPresenter.prototype.remove = function() {
  this.unbindEvents();
  this.delete();
};

ProductPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

ProductPresenter.prototype.getEventTargets = function() {
  //this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
	this.body = document.body;
	
	this.sliderLeftControl = document.getElementById('leftControl');
	this.sliderRightControl = document.getElementById('rightControl');
	this.sliderPreviews = document.getElementsByClassName('slider__preview-image');
};

ProductPresenter.prototype.bindEvents = function() {
	this.sliderLeftControl.addEventListener('click', previousSlide, false);
	this.sliderRightControl.addEventListener('click', nextSlide, false);
	// forEach(this.sliderPreviews, function(preview) {
	// 	preview.addEventListener('click', setActive(preview), false);
	// });
	//this.sliderPreviews.addEventListener('click', setActive, false);
	//$(".sliderPreviews").click(setActive);
};

ProductPresenter.prototype.unbindEvents = function() {
	this.sliderLeftControl.removeEventListener('click', previousSlide, false);
	this.sliderRightControl.removeEventListener('click', nextSlide, false);
	//this.sliderPreviews.removeEventListener('click', setActive, false);
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