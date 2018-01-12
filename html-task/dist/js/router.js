import MainPresenter from './presenters/main-presenter';

function Router() {}

Router.prototype.dispatch = function(hash) {
  var prevPres = [];
    if (hash === '#index') {
      prevPres = [new MainPresenter()];
      return prevPres;
    }
    return [];
};

export default Router;