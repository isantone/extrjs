import Model from './model';

export default class HeaderModel extends Model {
  fetchData(fetchReq) {
    return fetch(fetchReq)
    .then((response) => {
      return response.json();
    })
    .then((jsonObj) => {
      if (this.getModifiedData) {
        return this.getModifiedData(jsonObj);
      }
      return jsonObj;
    })
    .catch(function(ex) {
      console.log('Parsing of the data failed: ', ex);
    });
  }
}
