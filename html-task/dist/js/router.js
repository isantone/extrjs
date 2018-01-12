import IndexPresenter from './presenters/index-presenter';

function Router() {}

Router.prototype.dispatch = function(hash) {
  var prevPres = [];
    if (hash === '') {
      prevPres = [new IndexPresenter()];
      return prevPres;
    }
    return [];
};

export default Router;