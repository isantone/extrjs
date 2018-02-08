import paths from '../paths';

import Presenter from './presenter';

import CategoryModel from '../models/category-model';
import CategoryView from '../views/category-view';

import changeView from '../view-changer';

import forEach from 'lodash/forEach';
//import find from 'lodash/find';

export default class CategoryPresenter extends Presenter {
	constructor(nameOfCategory) {
		super();

		const requestUrl = paths.ajax.category.url + nameOfCategory + "/products";
		const requestParameters = paths.ajax.category.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new CategoryView();
		this.model = new CategoryModel();
		this.title = "EXTREME SHOP - " + nameOfCategory;
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		this.viewChangeButton = document.getElementById('viewChanger');
		this.logo = document.getElementById('logo');
		this.body = document.body;
		this.products = document.getElementsByClassName('add-to-cart');
	}

	bindEvents() {
		this.viewChangeButton.addEventListener('click', changeView, false);

		forEach(this.products, (product) => {
			product.addEventListener('click', this.addToCart.bind(this), false);
		});
	}

	unbindEvents() {
		this.viewChangeButton.removeEventListener('click', changeView, false);

		forEach(this.products, (product) => {
			product.removeEventListener('click', this.addToCart.bind(this), false);
		});
	}

	// addToCart(event) {
	// 	//ajax
	// 	event.preventDefault();

	// 	let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

	// 	var cartJSON = localStorage.getItem("cart");
	// 	var cart;

	// 	if (cartJSON) {
	// 		cart = JSON.parse(cartJSON);
	// 	} else {
	// 		cart = [];
	// 	}

	// 	let thisProduct = find(cart, ["id", idOfProduct]);
	// 	if (thisProduct) {
	// 		thisProduct.quantity++;
	// 	}

	// 	else {
	// 		cart.push({
	// 			id: idOfProduct,
	// 			quantity: 1
	// 		});
	// 	}

	// 	localStorage.setItem("cart", JSON.stringify(cart));
	// }
}