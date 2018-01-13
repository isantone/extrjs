function Presenter() {
  //this.body = document.getElementById('pageBody');
  //this.footer = document.getElementById('pageFooter');
}

Presenter.prototype.render = function(compiledTemplate) {
  $( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
  this.main = document.getElementById('indexMain');
};

Presenter.prototype.delete = function() {
  this.main.remove();
};

export default Presenter;