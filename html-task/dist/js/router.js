import IndexPresenter from './presenters/index-presenter';

function Router() {}
var prevPres = [];
Router.prototype.dispatch = function(hash) {
    if (hash === '') {
      prevPres = [new IndexPresenter()];
      return prevPres;
    }
    if (hash === '#remove') {
      return [];
    }
    return [];
};

export default Router;