import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import CategoryPresenter from './presenters/category-presenter';
import ProductPresenter from './presenters/product-presenter';
import CartPresenter from './presenters/cart-presenter';

import paths from './paths';

function Router() {}
var prevPres = [];

Router.prototype.dispatch = function(hash) {
  switch (hash) {
    case paths.pages.index:
      return [new IndexPresenter()];
    case paths.pages.catalog:
      return [new CatalogPresenter()];
    case paths.pages.cart:
      return [new CartPresenter()];
    default:
      if (hash.includes(paths.pages.product)) {
        return [new ProductPresenter()];
      }

      if (hash.includes(paths.pages.category)) {
        const nameOfCategory = hash.split("/")[1];
        return [new CategoryPresenter(nameOfCategory)];
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