import paths from '../paths';

export default class Presenter {
  constructor() {
    this.pageFooter = document.getElementById('pageFooter');
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
    .catch(function(ex) {
      console.log('Displaying of the data failed: ', ex);
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
    const requestParameters = { method: 'POST' }; //paths.ajax.cart.add.params;

    let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

    let userData = JSON.parse(localStorage.getItem("user"));

    let reqData = new FormData();
    reqData.append( "id", idOfProduct );
    //reqData.append( "id", idOfProduct );

    requestParameters.body = reqData;
    //'Authorization': 'Bearer ' + token,
    requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userData.token,
    });

		const fetchReq = new Request(requestUrl, requestParameters);

    this.model.fetchData(fetchReq)
      .then((response) => {
        if (response.cart) {
          let userData = JSON.parse(localStorage.getItem("user"));
          userData.cart = response.cart;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        console.log(response);
      });
  }
}