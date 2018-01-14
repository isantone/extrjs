import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import ProductPresenter from './presenters/product-presenter';

function Router() {}
var prevPres = [];
Router.prototype.dispatch = function(hash) {
    if (hash === '' || hash === '#index') {
      // prevPres = [new IndexPresenter()];
      // return prevPres;
      return [new IndexPresenter()];
    }
    if (hash === '#remove') {
      return [];
    }
    if (hash === '#catalog') {
      return [new CatalogPresenter()];
    }
    if (hash.indexOf("#product?id=") !== -1) {
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