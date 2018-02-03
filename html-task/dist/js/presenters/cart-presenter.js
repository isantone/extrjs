import paths from '../paths';

import Presenter from './presenter';

import CartModel from '../models/cart-model';
import CartView from '../views/cart-view';
import EmptyCartView from '../views/empty-cart-view';

import Database from '../database';

//import changeView from '../view-changer';
//import {setActive, nextSlide, previousSlide} from '../slider';

//import forEach from 'lodash/forEach';

export default class CartPresenter extends Presenter {
	constructor() {
		super();

		const requestUrl = paths.ajax.cart.url;
		const requestParameters = paths.ajax.cart.params;

		let userData = JSON.parse(localStorage.getItem("user"));

		requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userData.token,
    });

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new CartView();
		this.emptyCartView = new EmptyCartView();
		this.model = new CartModel();
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
	}

	bindEvents() {
	}

	unbindEvents() {
	}

	deleteFromCart() {

	}
}