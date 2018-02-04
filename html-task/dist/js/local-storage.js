class LocalStorage {
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
    let keyValue = this.getKeyValue();
    localStorage.setItem(this.keyName, JSON.stringify(newValue));
  }

  setPropertyOfKeyValue(property, value) {
    let keyValue = this.getKeyValue();
    keyValue[property] = value;
    this.setKeyValue();
  }

  getToken() {
    let keyValue = this.getKeyValue();
    if (keyValue && "token" in keyValue) {
      return keyValue.token;
    }
  }

  getCart() {
    let keyValue = this.getKeyValue();
    return keyValue.cart;
  }

  setCart(newCart) {
    // let keyValue = getKeyValue();
    // keyValue.cart = newCart;
    let cart = this.getCart();
    cart = newCart;
    this.setKeyValue();
    //setPropertyOfKeyValue("cart", keyValue);
  }

  setToken(newToken) {
    let token = this.getToken();
    token = newToken;
    this.setKeyValue();
    //setPropertyOfKeyValue("token", keyValue);
  }
}

const ls = new LocalStorage();
export default ls;