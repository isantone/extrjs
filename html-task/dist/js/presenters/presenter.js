function Presenter() {
  //this.body = document.getElementById('pageBody');
  this.footer = document.getElementById('pageFooter');
}

Presenter.prototype.render = function(compiledTemplate) {
  $( compiledTemplate ).insertBefore( this.footer );
};

export default Presenter;