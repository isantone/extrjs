function IndexModel() {}

IndexModel.prototype.getData = function(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
        //resolve(this.responseText);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

export default IndexModel;