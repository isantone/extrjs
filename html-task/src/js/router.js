import IndexPresenter from './presenters/index-presenter';
import CatalogPresenter from './presenters/catalog-presenter';
import CategoryPresenter from './presenters/category-presenter';
import ProductPresenter from './presenters/product-presenter';
import CartPresenter from './presenters/cart-presenter';
import RegPresenter from './presenters/reg-presenter';
import HeaderPresenter from './presenters/header-presenter';

import paths from './paths';

let prevPres = [];

export var signPresenter = signPresenter || new RegPresenter();
export var headerPresenter = headerPresenter || new HeaderPresenter();

export class Router {
  dispatch(hash) {
    switch (hash) {
      case paths.pages.index:
        return [headerPresenter, new IndexPresenter(), signPresenter];
      case paths.pages.catalog:
        return [headerPresenter, new CatalogPresenter(), signPresenter];
      case paths.pages.cart:
        return [headerPresenter, new CartPresenter(), signPresenter];
      default:
        if (hash.includes(paths.pages.product)) {
          const idOfProduct = Number(hash.split("/")[1]);
          return [headerPresenter, new ProductPresenter(idOfProduct), signPresenter];
        }

        if (hash.includes(paths.pages.category)) {
          const nameOfCategory = hash.split("/")[1];
          return [headerPresenter, new CategoryPresenter(nameOfCategory), signPresenter];
        }

        return []; // 404
    }
  }
}