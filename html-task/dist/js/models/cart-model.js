import forEach from 'lodash/forEach';
import find from 'lodash/find';
import forOwn from 'lodash/forOwn';

function CartModel(idOfProduct) {
	this.idOfProduct = idOfProduct;
}

CartModel.prototype.getData = function(database) {
	let currentProduct;
	let idOfCurrentProduct = this.idOfProduct; // OR USE (...) => IN forEach

	forEach(database, function(category) {
	//_.forOwn(database, function(product) {
		currentProduct = find(category, ["id", idOfCurrentProduct]);
		if (currentProduct) {
			return false;
		}
	});

	return currentProduct;
};

export default CartModel;