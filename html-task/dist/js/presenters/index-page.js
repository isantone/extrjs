function IndexPresenter() {
  this.element = document.getElementById('indexMain');
}

IndexPresenter.prototype.render = function(compiledTemplate) {
  this.element.innerHTML = compiledTemplate;
};

export default IndexPresenter;