const fs = require('fs');

module.exports = class Json {
  constructor(filePath) {
    this.file = filePath;
    this.obj = require(filePath);
  }

  writeInFile(uglify) {
    if (uglify) {
      fs.writeFile(this.file, JSON.stringify(this.obj));
    }
    else {
      fs.writeFile(this.file, JSON.stringify(this.obj, null, 2));
    }
  }

  getElementsByPropertyValue(property, value) {
    const resultArray = this.obj.filter(element => {
      return element[property] === value;
    });

    return resultArray;
  }

  getElementsByPropertyUrlValue(property, urlValue) {
    const resultArray = this.obj.filter(element => {
      return element[property].replace(/ /g, '-').toLowerCase() === urlValue;
    });

    return resultArray;
  }

  getElementByPropertyValue(property, value) {
    const result = this.obj.find(element => {
      return element[property] === value;
    });

    return result;
  }
};