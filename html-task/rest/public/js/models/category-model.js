import find from 'lodash/find';

function CategoryModel(nameOfCategory) {
	this.nameOfCategory = nameOfCategory;
}

CategoryModel.prototype.getData = function(database) {
	var usersJSON = localStorage.getItem("users");
	var users;

	if (usersJSON) {
		users = JSON.parse(usersJSON);
	} else {
		users = [];
	}

	users.push({
		login: "vasya",
		password: "vasya"
	});

	//localStorage.setItem("users", JSON.stringify(users));

	return database[this.nameOfCategory];
};

export default CategoryModel;