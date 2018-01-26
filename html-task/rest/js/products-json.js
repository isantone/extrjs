const Json = require('./json');

module.exports = class ProductsJson extends Json {
  getProductsFromCategory(categoryUrlName) {
    return this.getElementsByPropertyUrlValue("category", categoryUrlName);
  }

  getItemById(itemId) {
    return this.getElementByPropertyValue("id", itemId);
  }
};