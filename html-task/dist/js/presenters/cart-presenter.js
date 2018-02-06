import paths from '../paths';
import ls from '../local-storage';

import Presenter from './presenter';

import CartModel from '../models/cart-model';
import CartView from '../views/cart-view';
import EmptyCartView from '../views/empty-cart-view';

export default class CartPresenter extends Presenter {
	constructor() {
		const userToken = ls.getToken();
		super();

		if (userToken) {
			const requestUrl = paths.ajax.cart.url;
			const requestParameters = paths.ajax.cart.params;

			requestParameters.headers = new Headers({
				Authorization: 'Bearer ' + userToken,
			});

			this.getFetchReq = new Request(requestUrl, requestParameters);
		}

		this.view = new CartView();
		this.emptyCartView = new EmptyCartView();
		this.model = new CartModel();
	}

	init() {
		if (this.getFetchReq) {
			document.title = this.title;

			this.model.fetchData(this.getFetchReq)
			.then((jsonData) => {
				
				if (jsonData.hasOwnProperty("cart") && Array.isArray(jsonData.cart) && jsonData.cart.length > 0) {
					this.refreshLocalCart(jsonData);
				// 	let lsData = ls.getKeyValue();

				// 	///// ---> function Name() {}
				// 	let responseCart = [];
				// 	let index = 0;
				// 	jsonData.cart.forEach((productInCart) => {
				// 		responseCart[index] = {};
				// 		responseCart[index].id = productInCart.id;
				// 		responseCart[index].quantity = productInCart.quantity;
				// 		index++;
				// 	});
				// 	/////

				// 	lsData.cart = responseCart;
				// 	ls.setKeyValue(lsData);
				return this.view.getTemplate(jsonData);
				}
				return this.emptyCartView.getTemplate();
			})
			.then((compiledTemplate) => {
				return this.insertTemplate(compiledTemplate);
			})
			.then(() => {
				if (this.getEventTargets) {
					this.getEventTargets();
				}
			})
			.then(() => {
				if (this.bindEvents) {
					this.bindEvents();
				}
			})
			.catch((ex) => {
				console.log('Displaying of the data failed: ', ex);

				if (this.fetchErrorHandler) {
					this.fetchErrorHandler(ex);
				}
			});
		} else {
			this.insertTemplate(this.emptyCartView.getTemplate());
		}
	}

	fetchErrorHandler(ex) {
		if (ex.status == 401) {
			return this.insertTemplate(this.emptyCartView.getTemplate());
		}
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		this.delBtns = document.getElementsByClassName('js-del-btn');
	}

	bindEvents() {
		[].forEach.call(this.delBtns, (product) => {
			product.addEventListener('click', this.removeFromCart.bind(this), false);
		});
	}

	unbindEvents() {
	}

	removeFromCart(event) {
    event.preventDefault();

    const requestUrl = paths.ajax.cart.delete.url;
    const requestParameters = paths.ajax.cart.delete.params;

    const userToken = ls.getToken();

    requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    });

    let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

    let reqBody = [
      {
        "id": idOfProduct
      }
    ];

    requestParameters.body = JSON.stringify(reqBody);

		const delFetchReq = new Request(requestUrl, requestParameters);

    this.model.fetchData(delFetchReq)
      .then((response) => {
        if (response.cart) {
					this.refreshInfo(response);
					/*
					this.refreshLocalCart(response);
					setTimeout(() => { /// promise
						this.refreshHeaderInfo();
					});
					*/
        }
        console.log(response);
			});
		
			const productDiv = event.currentTarget.parentNode.parentNode; // apply data-id attribute to this div?
			productDiv.remove();

			
			if (!document.getElementsByClassName("product").length) {
				this.removeTemplate();
				return this.insertTemplate(this.emptyCartView.getTemplate());
			}
	}
}