import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import CategoryPresenter from './presenters/category-presenter';
import ProductPresenter from './presenters/product-presenter';
import CartPresenter from './presenters/cart-presenter';
import RegPresenter from './presenters/reg-presenter';

import paths from './paths';

function Router() {}
var prevPres = [];

var regPresenter = regPresenter || new RegPresenter();

Router.prototype.dispatch = function(hash) {
  switch (hash) {
    case paths.pages.index:
      return [new IndexPresenter(), regPresenter];
    case paths.pages.catalog:
      return [new CatalogPresenter(), regPresenter];
    case paths.pages.cart:
      return [new CartPresenter()];
    default:
      if (hash.includes(paths.pages.product)) {
        const idOfProduct = Number(hash.split("/")[1]);
        return [new ProductPresenter(idOfProduct)];
      }

      if (hash.includes(paths.pages.category)) {
        const nameOfCategory = hash.split("/")[1];
        return [new CategoryPresenter(nameOfCategory), regPresenter];
      }

      return []; // 404
  }
};

// function getQueryVariable(variable)
// {
//   var query = window.location.search.substring(1);
//   var vars = query.split("&");
//   for (var i=0;i<vars.length;i++) {
//     var pair = vars[i].split("=");
//     if(pair[0] == variable){return pair[1];}
//   }
//   return(false);
// }

export default Router;