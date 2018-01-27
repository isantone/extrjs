export default class Presenter {
  constructor(fetchReq) {
    this.pageFooter = document.getElementById('pageFooter');
    this.fetchReq = fetchReq;
  }
  init() {
    document.title = this.title;

    this.model.fetchData(this.fetchReq)
    .then((jsonData) => {
      return this.view.getTemplate(jsonData);
    })
    .then((compiledTemplate) => {
      return this.insertTemplate(compiledTemplate);
    }) //PUT CATCH HERE?
    .then(() => {
      if (this.getEventTargets) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.getEventTargets();
        //});
      }
    })
    .then(() => {
      if (this.bindEvents) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.bindEvents();
        //});
      }
    })
    .catch(function(ex) {
      console.log('Displaying of the data failed: ', ex);
    });
  }

  delete() {
		this.removeTemplate();

		if (this.unbindEvents) {
			this.unbindEvents();
		}
	}
}