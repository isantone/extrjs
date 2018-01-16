import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import ProductPresenter from './presenters/product-presenter';

import paths from './paths';

function Router() {}
var prevPres = [];
Router.prototype.dispatch = function(hash) { 
    if (hash === paths.pages.index || hash === '#index') { //switch
      // prevPres = [new IndexPresenter()];
      // return prevPres;
      return [new IndexPresenter()];
    }
    if (hash === '#remove') {
      return [];
    }
    if (hash === paths.pages.catalog) {
      return [new CatalogPresenter()];
    }
    if (hash.indexOf(paths.pages.product) !== -1) {
      const idOfProduct = Number(hash.split("=")[1]);
      return [new ProductPresenter(idOfProduct)];
    }
    // const idFor = getQueryVariable("id");
    // console.log(idFor);
    return []; // 404
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