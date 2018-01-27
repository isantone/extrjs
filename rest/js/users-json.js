const Json = require('./json');

module.exports = class UsersJson extends Json {
  // constructor(...rest) {
  //   super(...rest);
  //   this.getUserByLogin = super.getElementByPropertyValue.bind(this, "login");
  // }

  getUserByLogin(userLogin) {
    return this.getElementByPropertyValue("login", userLogin);
  }

  getUserByToken(userToken) {
    const tokenArray = userToken.split(' '); //OR store "BEARER *TOKEN*" in database
    const tokenType = tokenArray[0];
    const token = Number(tokenArray[1]);

    if (tokenType === "Bearer") {
      return this.getElementByPropertyValue("token", token);
    }
  }

  getUserByCredentials(userCredentialsBase64) {
    const userCredentials = new Buffer(userCredentialsBase64, 'base64').toString();
    const userCredentialsArray = userCredentials.split(':');
    const userLogin = userCredentialsArray[0];
    const userPassword = userCredentialsArray[1];

    const resultUser = this.obj.find(user => {
      return user.email === userLogin && user.password === userPassword;
    });

    return resultUser;
  }
};