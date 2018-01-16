import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import ProductPresenter from './presenters/product-presenter';

import paths from './paths';

function Router() {}
var prevPres = [];

Router.prototype.dispatch = function(hash) { 
  switch (hash) {
    case paths.pages.index:
      return [new IndexPresenter()];
    case paths.pages.catalog:
      return [new CatalogPresenter()]; 
    default:
      if (hash.indexOf(paths.pages.product) !== -1) { // ES6 includes
        const idOfProduct = Number(hash.split("=")[1]);
        return [new ProductPresenter(idOfProduct)];
      } 
      return []; // 404
  }
};

function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

export default Router;