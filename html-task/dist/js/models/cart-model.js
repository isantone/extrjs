// import forEach from 'lodash/forEach';
// import find from 'lodash/find';
// import intersectionBy from 'lodash/intersectionBy';
// import flattenDeep from 'lodash/flattenDeep';

//import forOwn from 'lodash/forOwn';

import CartView from '../views/cart-view';
import EmptyCartView from '../views/empty-cart-view';

import Model from './model';

export default class CartModel extends Model {
  // getModifiedData(jsonObj) {
  //   if (!("cart" in jsonObj) || !jsonObj.cart.isArray || jsonObj.cart.length < 1) {
  //     //this.view = this.emptyCartView;
  //     this.view = new EmptyCartView();
  //   } else {
  //     this.view = new CartView();
  //   }
  //   return jsonObj;
  // }
}

// function CartModel() {}

// CartModel.prototype.getData = function(database) {
//   let cartJSON = localStorage.getItem("cart");
// 	let cart;

// 	if (cartJSON) {
// 		cart = JSON.parse(cartJSON);
// 	} else {
// 		cart = [];
// 	}

// 	let cartCol = [];
// 	forEach(database, function(category) {
// 		cartCol.push(intersectionBy(category, cart, "id"));
// 	});
// 	cartCol = flattenDeep(cartCol);

// 	for (let i = 0; i < cartCol.length; i++) {
// 		cartCol[i].quantity = cart[i].quantity; //ORDER BY SOMETHING BOTH COLLECTIONS
// 	}

// 	//localStorage.setItem("cart", JSON.stringify(cart));
// 	return cartCol;
// };

// export default CartModel;