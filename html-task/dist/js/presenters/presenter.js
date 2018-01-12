function Presenter() {
  this.element = document.getElementById('pageBody');
}

Presenter.prototype.render = function(compiledTemplate) {
  this.element.innerHTML = compiledTemplate;
};

export default Presenter;