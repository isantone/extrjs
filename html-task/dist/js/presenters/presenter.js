function Presenter() {
  this.element = document.getElementById('application');
}

Presenter.prototype.render = function(compiledTemplate) {
  this.element.innerHTML = compiledTemplate;
};

export default Presenter;