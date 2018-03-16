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