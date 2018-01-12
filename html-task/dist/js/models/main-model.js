function MainModel() {}

MainModel.prototype.getData = function(data) {
    console.log(data);
    data.name = data.name.toUpperCase();
    data.surname = data.surname.toUpperCase();
    return data;
};

export default MainModel;