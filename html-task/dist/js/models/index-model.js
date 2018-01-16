function IndexModel() {}

IndexModel.prototype.getData = function(database) {
  let arrayOfCategories = [];
  for (let key in database) {
    arrayOfCategories.push(key);
  }
  return arrayOfCategories;
};

export default IndexModel;