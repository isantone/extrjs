//import Presenter from './presenter';
//import IndexPresenter from './index-page';
import IndexModel from '../models/index-model';
import IndexView from '../views/index-view';

import Database from '../database';

function IndexPresenter() {
	//Presenter.apply(this, arguments);
	this.view = new IndexView();
	this.model = new IndexModel();
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

IndexPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getButtons();
	this.bindEvents();
};

IndexPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
	this.contentContainer = document.getElementById('pageContent');
	document.title = "EXTREME SHOP";
};

IndexPresenter.prototype.remove = function() {
	this.delete();
	//this.getButtons();
	//this.bindEvents();
};

IndexPresenter.prototype.delete = function() {
	//this.unbindEvents();
	this.contentContainer.remove();
};

IndexPresenter.prototype.getButtons = function() {
	this.body = document.body;
};

IndexPresenter.prototype.preventDefaultForURLs = function(event) {
  if ((event.target.tagName === "A") || (event.target.tagName === "IMG")) {
    event.preventDefault();
  }
};

IndexPresenter.prototype.bindEvents = function() {
	//this.body.addEventListener('click', this.preventDefaultForURLs);
	//this.button1.addEventListener('click', this.handleButtonClick, false);
};

// IndexPresenter.prototype.handleButtonClick = function(event) {
// 	console.log(`Click to button #${event.target.dataset.id}`);
// };

export default IndexPresenter;