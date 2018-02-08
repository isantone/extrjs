import paths from '../paths';
import ls from '../local-storage';

export default class Presenter {
  constructor() {
    this.pageFooter = document.getElementById('pageFooter');
    this.body = document.body;
  }

  init() {
    document.title = this.title;

    this.model.fetchData(this.fetchReq)
    .then((jsonData) => {
      console.log(jsonData);
      return this.view.getTemplate(jsonData);
    })
    .then((compiledTemplate) => {
      return this.insertTemplate(compiledTemplate);
    }) //PUT CATCH HERE?
    .then(() => {
      if (this.getEventTargets) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.getEventTargets();
        //});
      }
    })
    .then(() => {
      if (this.bindEvents) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.bindEvents();
        //});
      }
    })
    .catch((ex) => {
      console.log('Displaying of the data failed: ', ex);

      if (this.fetchErrorHandler) {
        this.fetchErrorHandler(ex);
      }
    });
  }

  delete() {
		this.removeTemplate();

		if (this.unbindEvents) {
			this.unbindEvents();
		}
  }

  addToCart(event) {
    event.preventDefault();

    //let userLocalData = JSON.parse(localStorage.getItem("user"));
    //let cart = userLocalData.cart || [];
    const requestUrl = paths.ajax.cart.add.url;
    const requestParameters = paths.ajax.cart.add.params;

    const userToken = ls.getToken();

    requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    });

    let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));
    let quantityOfProduct = 1; /////////// ?

    let reqBody = [
      {
        "id": idOfProduct,
        "quantity": quantityOfProduct
      }
    ];

    requestParameters.body = JSON.stringify(reqBody);

		const fetchReq = new Request(requestUrl, requestParameters);

    this.model.fetchData(fetchReq)
      .then((response) => {
        if (response.cart) {
          this.refreshInfo(response);
        }
        console.log(response);
      });
  }

  refreshInfo(json) {
    this.refreshLocalCart(json)
      .then(this.refreshHeaderInfo);
  }

  refreshLocalCart(jsonData) {
    return new Promise((resolve, reject) => {
      let lsData = ls.getKeyValue();

			///// ---> function Name() {}
			let responseCart = [];
			let index = 0;
			jsonData.cart.forEach((productInCart) => {
				responseCart[index] = {};
				responseCart[index].id = productInCart.id;
				responseCart[index].quantity = productInCart.quantity;
				index++;
			});
			/////

			lsData.cart = responseCart;
      resolve(ls.setKeyValue(lsData));
    });
    /*
		//if (jsonData.hasOwnProperty("cart") && Array.isArray(jsonData.cart) && jsonData.cart.length > 0) {
			let lsData = ls.getKeyValue();

			///// ---> function Name() {}
			let responseCart = [];
			let index = 0;
			jsonData.cart.forEach((productInCart) => {
				responseCart[index] = {};
				responseCart[index].id = productInCart.id;
				responseCart[index].quantity = productInCart.quantity;
				index++;
			});
			/////

			lsData.cart = responseCart;
			ls.setKeyValue(lsData);
    //}
    */
  }
  
  refreshHeaderInfo() {
    const lsData = ls.getKeyValue();
    const accountBtn = document.getElementById("accountBtn");
    const cartValue = document.getElementById("cartValue");

		if (lsData) {
			accountBtn.innerText = "LOG OUT";

			if (lsData.cart.length > 0) {
				cartValue.innerText = lsData.cart.length;
				cartValue.classList.remove('hide');
			} else {
				cartValue.classList.add('hide');
			}
		} else {
			cartValue.classList.add('hide');
		}
	}
}