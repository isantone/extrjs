class Model {
  // constructor() {
  //   this.fetchUrl = fetchUrl;
  //   this.fetchParameters = fetchParameters;
  // }
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.status = response.status;
      error.response = response;
      throw error;
    }
  }

  fetchData(fetchReq) {
    return fetch(fetchReq)
    .then(this.checkStatus)
    .then((response) => {
      return response.json();
    })
    .then((jsonObj) => {
      if (this.getModifiedData) {
        return this.getModifiedData(jsonObj);
      }
      return jsonObj;
    })
    .catch((ex) => {
      console.log('Parsing of the data failed: ', ex);
      return Promise.reject(ex);
    });
  }
}

export default Model;