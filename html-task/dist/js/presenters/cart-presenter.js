//import Presenter from './presenter';

import CartModel from '../models/cart-model';
import CartView from '../views/cart-view';

import Database from '../database';

//import changeView from '../view-changer';
//import {setActive, nextSlide, previousSlide} from '../slider';

import forEach from 'lodash/forEach';

function CartPresenter(idOfProduct) {
	//Presenter.apply(this, arguments);
	this.view = new CartView();
	this.model = new CartModel(idOfProduct);
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

CartPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getEventTargets();
	//this.bindEvents();
};

CartPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
	this.contentContainer = document.getElementById('pageContent');
};

CartPresenter.prototype.remove = function() {
  //this.unbindEvents();
  this.delete();
};

CartPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

CartPresenter.prototype.getEventTargets = function() {
  //this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
	this.body = document.body;
	
	this.sliderLeftControl = document.getElementById('leftControl');
	this.sliderRightControl = document.getElementById('rightControl');
	this.sliderPreviews = document.getElementsByClassName('slider__preview-image');
};

CartPresenter.prototype.bindEvents = function() {
	this.sliderLeftControl.addEventListener('click', previousSlide, false);
	this.sliderRightControl.addEventListener('click', nextSlide, false);
	// forEach(this.sliderPreviews, function(preview) {
	// 	preview.addEventListener('click', setActive(preview), false);
	// });
	//this.sliderPreviews.addEventListener('click', setActive, false);
	//$(".sliderPreviews").click(setActive);
};

CartPresenter.prototype.unbindEvents = function() {
	this.sliderLeftControl.removeEventListener('click', previousSlide, false);
	this.sliderRightControl.removeEventListener('click', nextSlide, false);
	//this.sliderPreviews.removeEventListener('click', setActive, false);
};

CartPresenter.prototype.goToIndex = function(event) {
  event.preventDefault();
  location.hash = "";
};

// TEMPORARY! FOR SIMPLE TESTING! REMOVE IN CASE OF HREF FUNCTIONALITY (FOR EXAMPLE HREF TO ANOTHER SITE)
// ProductPresenter.prototype.preventDefaultForURLs = function(event) {
//   if ((event.target.tagName === "A") || (event.target.tagName === "IMG")) {
//     event.preventDefault();
//   }
// };

export default CartPresenter;