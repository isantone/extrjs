<<<<<<< HEAD
//import Presenter from './presenter';
//import IndexPresenter from './index-page';
import IndexModel from '../models/index-model';
import IndexView from '../views/index-view';

import Database from '../database';

import paths from '../paths';

function IndexPresenter() {
	//Presenter.apply(this, arguments);
	this.view = new IndexView();
	this.model = new IndexModel();
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

IndexPresenter.prototype.init = function() {
	this.model.getData(paths.categories.url)
		.then(response => {
			console.log(response);
			let categories = JSON.parse(response);
			return categories;
		})
		.then(categories => {
			return this.view.getTemplate(categories);
		})
		.then(compiledTemplate => {
			this.render(compiledTemplate);
		});
	
	this.getButtons();
	this.bindEvents();
};
=======
import paths from '../paths';

import Presenter from './presenter';
>>>>>>> c3f0bff12aa562a9f860d87223d2e25b450c07d0

import IndexModel from '../models/index-model';
import IndexView from '../views/index-view';

export default class IndexPresenter extends Presenter {
	constructor() {
		const requestUrl = paths.ajax.index.url;
		const requestParameters = paths.ajax.index.params;
		const indexFetchReq = new Request(requestUrl, requestParameters);

		super(indexFetchReq);

		this.view = new IndexView();
		this.model = new IndexModel();
		this.title = "EXTREME SHOP";
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}
}