function IndexModel() {}

IndexModel.prototype.getData = function(database) {
  // console.log(data);
  // data.name = data.name.toUpperCase();
  // data.surname = data.surname.toUpperCase();
  let arrayOfCategories = [];
  for (let key in database) {
    arrayOfCategories.push(key);
  }
  return arrayOfCategories;
};

export default IndexModel;