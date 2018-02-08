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
          // let userData = JSON.parse(localStorage.getItem("user"));
          // userData.cart = response.cart;
          // localStorage.setItem("user", JSON.stringify(userData));
        }
        console.log(response);
      });
  }
}