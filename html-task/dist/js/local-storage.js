export default class LocalStorage {
  constructor() {
    this.keyName = "user";
  }

  getKeyJson() {
    return localStorage.getItem(this.keyName);
  }

  getKeyValue() {
    let keyValueJson = this.getKeyJson();
    return JSON.parse(keyValueJson);
  }

  setKeyValue(newValue) {
    let keyValue = getKeyValue();
    localStorage.setItem(this.keyName, JSON.stringify(newValue));
  }

  getToken() {
    let keyValue = this.getKeyValue();
    return keyValue.token;
  }

  getCart() {
    let keyValue = this.getKeyValue();
    return keyValue.cart;
  }

  setCart(newCart) {
    // let keyValue = getKeyValue();
    // keyValue.cart = newCart;
    let cart = getCart();
    cart = newCart;
    setKeyValue(keyValue);
  }

  mergeCart(newCart) {
    let cart = getCart();
    if (cart.length > 0) {
      
    }
    setCart(newCart);
  }
}