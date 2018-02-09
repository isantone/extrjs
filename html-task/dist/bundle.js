/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const host = "http://localhost:3000/api";

const paths = {
  host: {
    url: "http://localhost:3000/",
    api: {
      url: "http://localhost:3000/api/"
    }
  },

  client: {
    url: "http://localhost:7777"
  },

  cart: {
    url: "/cart"
  },

  categories: {
    url: "http://localhost:3000/api/categories",
    category: {
      url: "/categories/:categoryName",
      products: {
        url: "/categories/:categoryName/products",
        product: {
          url: "/categories/:categoryName/products/:itemId"
        }
      }
    }
  },

  users: {
    url: "/users",
    user: {
      url: "/users/:userLogin"
    }
  },

  login: {
    url: "/login"
  },

  register: {
    url: "/register"
  },

  pages: {
    index:   "",
    catalog: "#catalog",
    category: "#categories/",
    product: "#products/",
    cart: "#cart"
  },

  ajax: {
    index: {
      url: host + "/categories",
      params: { method: 'GET' }
    },
    category: {
      url: host + "/categories/",
      params: { method: 'GET' }
    },
    product: {
      url: host + "/products/",
      params: { method: 'GET' }
    },
    register: {
      //url: host + "/register",
      url: host + "/register",
      params: {
        method: 'POST'
      }
    },
    login: {
      url: host + "/login",
      params: {
        method: 'POST'
      }
    },
    cart: {
      url: host + "/cart",
      params: {
        method: 'GET'
      },
      add: {
        url: host + "/cart",
        params: {
          method: 'POST'
        }
      },
      delete: {
        url: host + "/cart",
        params: {
          method: 'DELETE'
        }
      }
    },
    search: {
      url: host + "/search?q=",
      params: {
        method: 'GET'
      }
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (paths);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage__ = __webpack_require__(3);



class Presenter {
  constructor() {
    this.pageFooter = document.getElementById('pageFooter');
    this.body = document.body;
  }

  init() {
    document.title = this.title;

    this.model.fetchData(this.fetchReq)
    .then((jsonData) => {
      console.log(jsonData);
      return this.view.getTemplate(jsonData);
    })
    .then((compiledTemplate) => {
      return this.insertTemplate(compiledTemplate);
    }) //PUT CATCH HERE?
    .then(() => {
      if (this.getEventTargets) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.getEventTargets();
        //});
      }
    })
    .then(() => {
      if (this.bindEvents) {
        //document.addEventListener('DOMContentLoaded', () => {
          this.bindEvents();
        //});
      }
    })
    .catch((ex) => {
      console.log('Displaying of the data failed: ', ex);

      if (this.fetchErrorHandler) {
        this.fetchErrorHandler(ex);
      }
    });
  }

  delete() {
		this.removeTemplate();

		if (this.unbindEvents) {
			this.unbindEvents();
		}
  }

  addToCart(event) {
    event.preventDefault();

    //let userLocalData = JSON.parse(localStorage.getItem("user"));
    //let cart = userLocalData.cart || [];
    const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.add.url;
    const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.add.params;

    const userToken = __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getToken();

    requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    });

    let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));
    let quantityOfProduct = 1; /////////// ?

    let reqBody = [
      {
        "id": idOfProduct,
        "quantity": quantityOfProduct
      }
    ];

    requestParameters.body = JSON.stringify(reqBody);

		const fetchReq = new Request(requestUrl, requestParameters);

    this.model.fetchData(fetchReq)
      .then((response) => {
        if (response.cart) {
          this.refreshInfo(response);
        }
        console.log(response);
      });
  }

  refreshInfo(json) {
    this.refreshLocalCart(json)
      .then(this.refreshHeaderInfo);
  }

  refreshLocalCart(jsonData) {
    return new Promise((resolve, reject) => {
      let lsData = __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getKeyValue();

			///// ---> function Name() {}
			let responseCart = [];
			let index = 0;
			jsonData.cart.forEach((productInCart) => {
				responseCart[index] = {};
				responseCart[index].id = productInCart.id;
				responseCart[index].quantity = productInCart.quantity;
				index++;
			});
			/////

			lsData.cart = responseCart;
      resolve(__WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].setKeyValue(lsData));
    });
    /*
		//if (jsonData.hasOwnProperty("cart") && Array.isArray(jsonData.cart) && jsonData.cart.length > 0) {
			let lsData = ls.getKeyValue();

			///// ---> function Name() {}
			let responseCart = [];
			let index = 0;
			jsonData.cart.forEach((productInCart) => {
				responseCart[index] = {};
				responseCart[index].id = productInCart.id;
				responseCart[index].quantity = productInCart.quantity;
				index++;
			});
			/////

			lsData.cart = responseCart;
			ls.setKeyValue(lsData);
    //}
    */
  }
  
  refreshHeaderInfo() {
    const lsData = __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getKeyValue();
    const accountBtn = document.getElementById("accountBtn");
    const cartValue = document.getElementById("cartValue");

		if (lsData) {
			accountBtn.innerText = "LOG OUT";

			if (lsData.cart.length > 0) {
				cartValue.innerText = lsData.cart.length;
				cartValue.classList.remove('hide');
			} else {
				cartValue.classList.add('hide');
			}
		} else {
			cartValue.classList.add('hide');
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Presenter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Model {
  // constructor() {
  //   this.fetchUrl = fetchUrl;
  //   this.fetchParameters = fetchParameters;
  // }
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.status = response.status;
      error.response = response;
      throw error;
    }
  }

  fetchData(fetchReq) {
    return fetch(fetchReq)
    .then(this.checkStatus)
    .then((response) => {
      return response.json();
    })
    .then((jsonObj) => {
      if (this.getModifiedData) {
        return this.getModifiedData(jsonObj);
      }
      return jsonObj;
    })
    .catch((ex) => {
      console.log('Parsing of the data failed: ', ex);

      return Promise.reject(ex);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Model);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LocalStorage {
  constructor() {
    this.keyName = "user";
  }

  getKeyJson() {
    return localStorage.getItem(this.keyName);
  }

  getKeyValue() {
    let keyValueJson = this.getKeyJson();
    return JSON.parse(keyValueJson);
  }

  removeKeyValue() {
    localStorage.removeItem(this.keyName);
  }

  setKeyValue(newValue) {
    let keyValue = this.getKeyValue();
    localStorage.setItem(this.keyName, JSON.stringify(newValue));
  }

  setPropertyOfKeyValue(property, value) {
    let keyValue = this.getKeyValue();
    keyValue[property] = value;
    this.setKeyValue();
  }

  getToken() {
    let keyValue = this.getKeyValue();
    if (keyValue && "token" in keyValue) {
      return keyValue.token;
    }
  }

  getCart() {
    let keyValue = this.getKeyValue();
    return keyValue.cart;
  }

  setCart(newCart) {
    // let keyValue = getKeyValue();
    // keyValue.cart = newCart;
    let cart = this.getCart();
    cart = newCart;
    this.setKeyValue();
    //setPropertyOfKeyValue("cart", keyValue);
  }

  setToken(newToken) {
    let token = this.getToken();
    token = newToken;
    this.setKeyValue();
    //setPropertyOfKeyValue("token", keyValue);
  }
}

const ls = new LocalStorage();
/* harmony default export */ __webpack_exports__["a"] = (ls);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(27),
    baseEach = __webpack_require__(28),
    castFunction = __webpack_require__(54),
    isArray = __webpack_require__(12);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(9),
    getRawTag = __webpack_require__(38),
    objectToString = __webpack_require__(39);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return signPresenter; });
/* unused harmony export headerPresenter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__presenters_index_presenter__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presenters_catalog_presenter__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__presenters_category_presenter__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presenters_product_presenter__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__presenters_cart_presenter__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__presenters_reg_presenter__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__presenters_header_presenter__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__paths__ = __webpack_require__(0);










let prevPres = [];

var signPresenter = signPresenter || new __WEBPACK_IMPORTED_MODULE_5__presenters_reg_presenter__["a" /* default */]();
var headerPresenter = headerPresenter || new __WEBPACK_IMPORTED_MODULE_6__presenters_header_presenter__["a" /* default */]();

class Router {
  dispatch(hash) {
    switch (hash) {
      case __WEBPACK_IMPORTED_MODULE_7__paths__["a" /* default */].pages.index:
        return [headerPresenter, new __WEBPACK_IMPORTED_MODULE_0__presenters_index_presenter__["a" /* default */](), signPresenter];
      case __WEBPACK_IMPORTED_MODULE_7__paths__["a" /* default */].pages.catalog:
        return [headerPresenter, new __WEBPACK_IMPORTED_MODULE_1__presenters_catalog_presenter__["a" /* default */](), signPresenter];
      case __WEBPACK_IMPORTED_MODULE_7__paths__["a" /* default */].pages.cart:
        return [headerPresenter, new __WEBPACK_IMPORTED_MODULE_4__presenters_cart_presenter__["a" /* default */](), signPresenter];
      default:
        if (hash.includes(__WEBPACK_IMPORTED_MODULE_7__paths__["a" /* default */].pages.product)) {
          const idOfProduct = Number(hash.split("/")[1]);
          return [headerPresenter, new __WEBPACK_IMPORTED_MODULE_3__presenters_product_presenter__["a" /* default */](idOfProduct), signPresenter];
        }

        if (hash.includes(__WEBPACK_IMPORTED_MODULE_7__paths__["a" /* default */].pages.category)) {
          const nameOfCategory = hash.split("/")[1];
          return [headerPresenter, new __WEBPACK_IMPORTED_MODULE_2__presenters_category_presenter__["a" /* default */](nameOfCategory), signPresenter];
        }

        return []; // 404
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_forEach__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_forEach__);


function changeView() {
  //let allDomElementsArray;
  let allDomElements;
  allDomElements = document.getElementsByClassName("product");

  // [].forEach.call(allDomElements, function(domElement){
  //   domElement.classList.toggle("product_grid");
  // });

  /*_.*/__WEBPACK_IMPORTED_MODULE_0_lodash_forEach___default()(allDomElements, function(domElement) {
    domElement.classList.toggle("product_grid");
  });

  allDomElements = document.getElementsByClassName("product__wrapper");

  /*_.*/__WEBPACK_IMPORTED_MODULE_0_lodash_forEach___default()(allDomElements, function(domElement) {
    domElement.classList.toggle("product__wrapper_grid");
  });

  allDomElements = document.getElementsByClassName("product__description");

  /*_.*/__WEBPACK_IMPORTED_MODULE_0_lodash_forEach___default()(allDomElements, function(domElement) {
    domElement.classList.toggle("product__description_grid");
  });
}

/* harmony default export */ __webpack_exports__["a"] = (changeView);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(10);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(11);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(51),
    isLength = __webpack_require__(14);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);


function CartView() {}

CartView.prototype.getTemplate = function(data) {

  const catalogTemplate =
  `<div id="pageContent" class="page-main">
    <!-- Navigation -->
    <div class="page-main__content">
      <h2>Shopping cart</h2>
      <main id="productsMain" class="page-main__products">
        {{#each cart}}
          {{> product}}
        {{/each}}
      </main>
    </div>
  </div>`;

  const productTemplate =
  `<div class="product">
    <img class="product__image" src="{{product.images.[0]}}">
    <div class="product__wrapper product__wrapper">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#products/{{product.id}}">{{product.title}}</a>
        </p>
        <p class="product__description product__description">{{product.description}}</p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{product.price}}</p>
        <p >Quantity: {{quantity}}</p>
      </div>
      <svg class="svg-btn js-del-btn" data-id="{{product.id}}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
  </div>
  `;

  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  document.title = "EXTREME SHOP - Cart";
  return compiledCatalogTemplate(data);
};

/* harmony default export */ __webpack_exports__["a"] = (CartView);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);


class EmptyCartView {
  getTemplate() {
    const emptyCartTemplate =
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <main>
          <h2>Shopping cart</h2>
          <p>Your shopping cart is empty</p>
          <a href="#">
            <button class="button button_color big-top-margin">
              CONTINUE SHOPPING
            </button>
          </a>
        </main>
      </div>
    </div>`;

    const compiledEmptyCartTemplate = Handlebars.compile(emptyCartTemplate);

    document.title = "EXTREME SHOP - Cart";
    return compiledEmptyCartTemplate();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyCartView;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(19);


window.app = new __WEBPACK_IMPORTED_MODULE_0__app__["a" /* default */]();

app.renderPage(location.hash);

window.addEventListener('hashchange', function() {
	app.renderPage(location.hash);
}, false);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(7);




class App {
	constructor() {
		this.router = new __WEBPACK_IMPORTED_MODULE_1__router__["a" /* Router */]();
		this.blocks = [];
	}

	renderPage(hash) {
		this.oldBlocks = this.blocks || null;
		this.blocks = this.router.dispatch(hash);

		if (this.oldBlocks) {
			[].forEach.call(this.oldBlocks, function(block) {
				block.delete();
			});
		}

		if (this.blocks) {
			[].forEach.call(this.blocks, function(block) {
				block.init();
			});
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;



/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_index_model__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_index_view__ = __webpack_require__(23);







class IndexPresenter extends __WEBPACK_IMPORTED_MODULE_1__presenter__["a" /* default */] {
	constructor() {
		super();

		const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.index.url;
		const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.index.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new __WEBPACK_IMPORTED_MODULE_3__views_index_view__["a" /* default */]();
		this.model = new __WEBPACK_IMPORTED_MODULE_2__models_index_model__["a" /* default */]();
		this.title = "EXTREME SHOP";
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexPresenter;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);


class IndexModel extends __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */] {}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexModel;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class IndexView {
  getTemplate(data) {
    const categoryTemplate = `
      <main id="pageContent" class="index-page">
      <!--<img src="http://localhost:3000/images/promo/1.jpg">-->
        {{#each this}}
          <div class="catalog__container">
            <div class="catalog__header-container">
              <a href="#categories/{{this.name}}/products">
                <h2>{{this.title}}</h2>
                <!--<img class="" src="{{this.image}}">-->
              </a>
            </div>
            {{#each catalog}}
              <div class="catalog__item-wrapper">
                <img class="catalog__image" src="{{this.image}}">
                <a class="catalog__caption" href="#categories/{{this.name}}/products">{{this.title}}</a>
              </div>
            {{/each}}
          </div>
        {{/each}}
      </main>
    `;

    const compiledCategoryTemplate = Handlebars.compile(categoryTemplate);
    return compiledCategoryTemplate(data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexView;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_catalog_model__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_catalog_view__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_changer__ = __webpack_require__(8);
//import Presenter from './presenter';






function CatalogPresenter() {
	//Presenter.apply(this, arguments);
	this.view = new __WEBPACK_IMPORTED_MODULE_1__views_catalog_view__["a" /* default */]();
	this.model = new __WEBPACK_IMPORTED_MODULE_0__models_catalog_model__["a" /* default */]();
}

//IndexPresenter.prototype = Object.create(Presenter.prototype);
//IndexPresenter.prototype.constructor = IndexPresenter;

CatalogPresenter.prototype.init = function() {
	this.render(this.view.getTemplate(this.model.getData(Database())));
	this.getEventTargets();
	this.bindEvents();
};

CatalogPresenter.prototype.render = function(compiledTemplate) {
	$( compiledTemplate ).insertBefore( document.getElementById('pageFooter') );
  this.contentContainer = document.getElementById('pageContent');
  document.title = "EXTREME SHOP - Catalog";
};

CatalogPresenter.prototype.remove = function() {
  this.unbindEvents();
  this.delete();
};

CatalogPresenter.prototype.delete = function() {
	this.contentContainer.remove();
};

CatalogPresenter.prototype.getEventTargets = function() {
  this.viewChangeButton = document.getElementById('viewChanger');
  this.logo = document.getElementById('logo');
  this.body = document.body;
};

CatalogPresenter.prototype.bindEvents = function() {
  this.viewChangeButton.addEventListener('click', __WEBPACK_IMPORTED_MODULE_2__view_changer__["a" /* default */], false);
  //this.logo.addEventListener('click', this.goToIndex, false);
  //this.body.addEventListener('click', this.preventDefaultForURLs);
};

CatalogPresenter.prototype.unbindEvents = function() {
	this.viewChangeButton.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_2__view_changer__["a" /* default */], false);
	//this.button2.addEventListener('click', this.handleButtonClick, false);
};

CatalogPresenter.prototype.goToIndex = function(event) {
  event.preventDefault();
  location.hash = "";
};

// TEMPORARY! FOR SIMPLE TESTING! REMOVE IN CASE OF HREF FUNCTIONALITY (FOR EXAMPLE HREF TO ANOTHER SITE)
CatalogPresenter.prototype.preventDefaultForURLs = function(event) {
  if ((event.target.tagName === "A") || (event.target.tagName === "IMG")) {
    event.preventDefault();
  }
};

// CatalogPresenter.prototype.changeView = function(event) {
//     //let allDomElementsArray;
//     let allDomElements;
//     allDomElements = document.getElementsByClassName("product");

//     // [].forEach.call(allDomElements, function(domElement){
//     //   domElement.classList.toggle("product_grid");
//     // });

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product_grid");
//     });

//     allDomElements = document.getElementsByClassName("product__wrapper");

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product__wrapper_grid");
//     });

//     allDomElements = document.getElementsByClassName("product__description");

//     /*_.*/forEach(allDomElements, function(domElement) {
//         domElement.classList.toggle("product__description_grid");
//     });
// };

/* harmony default export */ __webpack_exports__["a"] = (CatalogPresenter);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function CatalogModel() {}

CatalogModel.prototype.getData = function(database) {
	// console.log(data);
	// data.name = data.name.toUpperCase();
	// data.surname = data.surname.toUpperCase();
	// let arrayOfCategories = [];
	// for (let key in database) {
	//   arrayOfCategories.push(key);
	// }
	//console.log(arrayOfCategories);
	return database;
};

/* harmony default export */ __webpack_exports__["a"] = (CatalogModel);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function CatalogView() {}

CatalogView.prototype.getTemplate = function(data) {

  // const catalogTemplate = `
  //   <main id="indexMain" class="index-page">
  //     {{#each this}}
  //       <div class="grid index-page__grid">
  //         <a href="products.html">
  //           <img class="grid__image index-page__image" src="/images/products/{{underscorer this}}/category.png">
  //           <p class="grid__caption index-page__caption tiny-top-margin">{{capitalizer this}}</p>
  //         </a>
  //       </div>
  //     {{/each}}
  //   </main>
  // `;

  const catalogTemplate = 
  `<div id="pageContent" class="page-main">
    <!-- Navigation -->
    <div class="page-main__content">
      <button id="viewChanger" class="button button_color tiny-bottom-margin">GRID / LIST</button>
      <main id="productsMain" class="page-main__products">
        {{#each this}}
          {{#each this}}
            {{> product}}
          {{/each}}
        {{/each}}
      </main>
    </div>
  </div>`;

const productTemplate =
  `<div class="product product_grid">
    <img class="product__image" src="images/products/{{unreadabler this.category}}/{{this.id}}_1_s.jpg">
    <div class="product__wrapper product__wrapper_grid">
      <div class="product__left-part">
        <p class="product__name">
          <a href="#product?id={{this.id}}">{{trim this.title}}</a>
        </p>
        <p class="product__description product__description_grid">{{this.description}}
        </p>
      </div>
      <div class="product__right-part">
        <p class="product__price">Price: \$ {{this.price}}</p>
        <button class="button input-size turquoise add-to-cart">Add to cart</button>
      </div>
    </div>
  </div>`;

  const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

  Handlebars.registerPartial('product', productTemplate);

  Handlebars.registerHelper('capitalizer', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  Handlebars.registerHelper('unreadabler', function(str) {
    if (str) {
      str = str.toLowerCase();
      return str.replace(/ /g, '_');
    }
    return "";
  });

  Handlebars.registerHelper('underscorer', function(str) {
    return str.replace(" ", "_");
  });

  Handlebars.registerHelper('trim', function(str) {
    if (str.length > 20) {
      return str.substr(0, 20) + "...";
    }
    return str;
  });

  return compiledCatalogTemplate(data);


};

/* harmony default export */ __webpack_exports__["a"] = (CatalogView);

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(29),
    createBaseEach = __webpack_require__(53);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(30),
    keys = __webpack_require__(32);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(31);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(33),
    baseKeys = __webpack_require__(47),
    isArrayLike = __webpack_require__(15);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(34),
    isArguments = __webpack_require__(35),
    isArray = __webpack_require__(12),
    isBuffer = __webpack_require__(40),
    isIndex = __webpack_require__(42),
    isTypedArray = __webpack_require__(43);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(36),
    isObjectLike = __webpack_require__(6);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(9);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(10),
    stubFalse = __webpack_require__(41);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(44),
    baseUnary = __webpack_require__(45),
    nodeUtil = __webpack_require__(46);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(14),
    isObjectLike = __webpack_require__(6);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(11);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(48),
    nativeKeys = __webpack_require__(49);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(50);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(52);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(15);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(55);

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_category_model__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_category_view__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_changer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_forEach__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_forEach__);










//import find from 'lodash/find';

class CategoryPresenter extends __WEBPACK_IMPORTED_MODULE_1__presenter__["a" /* default */] {
	constructor(nameOfCategory) {
		super();

		const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.category.url + nameOfCategory + "/products";
		const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.category.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new __WEBPACK_IMPORTED_MODULE_3__views_category_view__["a" /* default */]();
		this.model = new __WEBPACK_IMPORTED_MODULE_2__models_category_model__["a" /* default */]();
		this.title = "EXTREME SHOP - " + nameOfCategory;
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		this.viewChangeButton = document.getElementById('viewChanger');
		this.logo = document.getElementById('logo');
		this.body = document.body;
		this.products = document.getElementsByClassName('add-to-cart');
	}

	bindEvents() {
		this.viewChangeButton.addEventListener('click', __WEBPACK_IMPORTED_MODULE_4__view_changer__["a" /* default */], false);

		__WEBPACK_IMPORTED_MODULE_5_lodash_forEach___default()(this.products, (product) => {
			product.addEventListener('click', this.addToCart.bind(this), false);
		});
	}

	unbindEvents() {
		this.viewChangeButton.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_4__view_changer__["a" /* default */], false);

		__WEBPACK_IMPORTED_MODULE_5_lodash_forEach___default()(this.products, (product) => {
			product.removeEventListener('click', this.addToCart.bind(this), false);
		});
	}

	// addToCart(event) {
	// 	//ajax
	// 	event.preventDefault();

	// 	let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

	// 	var cartJSON = localStorage.getItem("cart");
	// 	var cart;

	// 	if (cartJSON) {
	// 		cart = JSON.parse(cartJSON);
	// 	} else {
	// 		cart = [];
	// 	}

	// 	let thisProduct = find(cart, ["id", idOfProduct]);
	// 	if (thisProduct) {
	// 		thisProduct.quantity++;
	// 	}

	// 	else {
	// 		cart.push({
	// 			id: idOfProduct,
	// 			quantity: 1
	// 		});
	// 	}

	// 	localStorage.setItem("cart", JSON.stringify(cart));
	// }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoryPresenter;


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);


class CategoryModel extends __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */] {}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoryModel;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CategoryView {
  getTemplate(data) {
    const CategoryTemplate = 
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <h2>Shop {{this.[0].category}} Gear</h2>
        <button id="viewChanger" class="button button_color button_auto-width tiny-bottom-margin">GRID / LIST</button>
        <main id="productsMain" class="page-main__products">
          {{#each this}}
            {{> product}}
          {{/each}}
        </main>
      </div>
    </div>`;

  const productTemplate =
    `<div class="product product_grid">
      <a href="#products/{{this.id}}">
        <img class="product__image" src="{{this.images.[0]}}">
      </a>
      <div class="product__wrapper product__wrapper_grid">
        <div class="product__left-part">
          <a href="#products/{{this.id}}">
            <p class="product__name">
              {{this.title}}
            </p>
          </a>
          <p class="product__description product__description_grid">{{this.description}}</p>
        </div>
        <div class="product__right-part">
          <p class="product__price">Price: \$ {{this.price}}</p>
          <button data-id="{{this.id}}" class="button {{#if this.availability}}button_color add-to-cart">Add to cart{{else}}button_disabled add-to-cart" disabled>Out of stock{{/if}}</button>
        </div>
      </div>
    </div>`;
    Handlebars.registerPartial('product', productTemplate);

    const compiledCategoryTemplate = Handlebars.compile(CategoryTemplate);

    return compiledCategoryTemplate(data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoryView;


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_product_model__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_product_view__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slider__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_forEach__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_forEach__);











class ProductPresenter extends __WEBPACK_IMPORTED_MODULE_1__presenter__["a" /* default */] {
	constructor(idOfProduct) {
		super();

		const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.product.url + idOfProduct;
		const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.product.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new __WEBPACK_IMPORTED_MODULE_3__views_product_view__["a" /* default */]();
		this.model = new __WEBPACK_IMPORTED_MODULE_2__models_product_model__["a" /* default */]();

		this.title = "EXTREME SHOP";
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		//this.viewChangeButton = document.getElementById('viewChanger');
		this.logo = document.getElementById('logo');
		this.body = document.body;

		this.sliderLeftControl = document.getElementById('leftControl');
		this.sliderRightControl = document.getElementById('rightControl');
		this.sliderPreviews = document.getElementsByClassName('slider__preview-image');
	}

	bindEvents() {
		this.sliderLeftControl.addEventListener('click', __WEBPACK_IMPORTED_MODULE_4__slider__["b" /* previousSlide */], false);
		this.sliderRightControl.addEventListener('click', __WEBPACK_IMPORTED_MODULE_4__slider__["a" /* nextSlide */], false);
		// forEach(this.sliderPreviews, function(preview) {
		// 	preview.addEventListener('click', setActive(preview), false);
		// });
		//this.sliderPreviews.addEventListener('click', setActive, false);
		//$(".sliderPreviews").click(setActive);
	}

	unbindEvents() {
		this.sliderLeftControl.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_4__slider__["b" /* previousSlide */], false);
		this.sliderRightControl.removeEventListener('click', __WEBPACK_IMPORTED_MODULE_4__slider__["a" /* nextSlide */], false);
		//this.sliderPreviews.removeEventListener('click', setActive, false);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProductPresenter;


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);


class ProductModel extends __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */] {}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProductModel;


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);


class ProductView {
  getTemplate(data) {
    // !!! APPLY PARTIAL TEMPLATES FOR SLIDERS
    const catalogTemplate = 
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <p class="breadcrumbs small-bottom-margin"><a href=${__WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].pages.catalog}>{{this.category}}</a> / {{this.title}}</p>
        <main id="productsMain" class="page-main__products">
        <div class="slider">
          <div class="slider__view-section">
            <img id="activeImage" class="w3-animate-right slider__big-image" src="{{this.images.[1]}}" alt="Product image">
          </div>
          <div class="slider__preview-section">
            <div id="leftControl" class="slider__control">
              <img src="http://localhost:3000/images/left-arrow.png" alt="Left">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image slider__preview-image_active" src="{{this.images.[0]}}" alt="Product preview">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image" src="{{this.images.[1]}}" alt="Product preview">
            </div>
            <div class="slider__image-wrapper">
              <img class="slider__preview-image" src="{{this.images.[2]}}" alt="Product preview">
            </div>
            <div id="rightControl" class="slider__control">
              <img src="http://localhost:3000/images/right-arrow.png" alt="Right">
            </div>
          </div>
        </div>
          {{> product}}
        </main>
      </div>
    </div>`;

    const productTemplate =
    `<div class="full-product page-main__full-product">
      <h2>{{this.title}}</h2>
      <p class="full-product__price small-bottom-margin">Price: \$ {{this.price}}</p>
      <p class="full-product__description">{{this.description}}</p>
      <button class="button input-size turquoise add-to-cart small-top-margin">Add to cart</button>
    </div>`;
    Handlebars.registerPartial('product', productTemplate);

    const compiledCatalogTemplate = Handlebars.compile(catalogTemplate);

    return compiledCatalogTemplate(data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProductView;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setActive */
/* harmony export (immutable) */ __webpack_exports__["a"] = nextSlide;
/* harmony export (immutable) */ __webpack_exports__["b"] = previousSlide;
function setActive(slide) {
  document.getElementsByClassName("slider__big-image")[0].classList.add("disp");
  document.getElementsByClassName("slider__preview-image_active")[0].classList.remove("slider__preview-image_active");

  slide.classList.add("slider__preview-image_active");

  document.getElementsByClassName("slider__big-image")[0].src = slide.src.slice(0, -6) + ".jpg";
  document.getElementById("activeImage").classList.remove("disp");

}

function nextSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlides = document.getElementsByClassName("slider__preview-image");

  let indexOfActiveSlide = [].indexOf.call(allSlides, activeSlide);

  if (++indexOfActiveSlide < allSlides.length) {
    setActive(allSlides[indexOfActiveSlide]);
  }
  else {
    setActive(allSlides[0]);
  }
}

function previousSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlides = document.getElementsByClassName("slider__preview-image");

  let indexOfActiveSlide = [].indexOf.call(allSlides, activeSlide);

  if (indexOfActiveSlide > 0) {
    setActive(allSlides[indexOfActiveSlide - 1]);
  }
  else {
    setActive(allSlides[allSlides.length - 1]);
  }
}

//setInterval(nextSlide, 4000);
//document.getElementById("activeImage").addEventListener("load", () => {document.getElementById("activeImage").classList.remove("disp");});

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_cart_model__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_cart_view__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_empty_cart_view__ = __webpack_require__(17);









class CartPresenter extends __WEBPACK_IMPORTED_MODULE_2__presenter__["a" /* default */] {
	constructor() {
		const userToken = __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getToken();
		super();

		if (userToken) {
			const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.url;
			const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.params;

			requestParameters.headers = new Headers({
				Authorization: 'Bearer ' + userToken,
			});

			this.getFetchReq = new Request(requestUrl, requestParameters);
		}

		this.view = new __WEBPACK_IMPORTED_MODULE_4__views_cart_view__["a" /* default */]();
		this.emptyCartView = new __WEBPACK_IMPORTED_MODULE_5__views_empty_cart_view__["a" /* default */]();
		this.model = new __WEBPACK_IMPORTED_MODULE_3__models_cart_model__["a" /* default */]();
	}

	init() {
		if (this.getFetchReq) {
			document.title = this.title;

			this.model.fetchData(this.getFetchReq)
			.then((jsonData) => {
				
				if (jsonData.hasOwnProperty("cart") && Array.isArray(jsonData.cart) && jsonData.cart.length > 0) {
					this.refreshLocalCart(jsonData);
				// 	let lsData = ls.getKeyValue();

				// 	///// ---> function Name() {}
				// 	let responseCart = [];
				// 	let index = 0;
				// 	jsonData.cart.forEach((productInCart) => {
				// 		responseCart[index] = {};
				// 		responseCart[index].id = productInCart.id;
				// 		responseCart[index].quantity = productInCart.quantity;
				// 		index++;
				// 	});
				// 	/////

				// 	lsData.cart = responseCart;
				// 	ls.setKeyValue(lsData);
				return this.view.getTemplate(jsonData);
				}
				return this.emptyCartView.getTemplate();
			})
			.then((compiledTemplate) => {
				return this.insertTemplate(compiledTemplate);
			})
			.then(() => {
				if (this.getEventTargets) {
					this.getEventTargets();
				}
			})
			.then(() => {
				if (this.bindEvents) {
					this.bindEvents();
				}
			})
			.catch((ex) => {
				console.log('Displaying of the data failed: ', ex);

				if (this.fetchErrorHandler) {
					this.fetchErrorHandler(ex);
				}
			});
		} else {
			this.insertTemplate(this.emptyCartView.getTemplate());
		}
	}

	fetchErrorHandler(ex) {
		if (ex.status == 401) {
			return this.insertTemplate(this.emptyCartView.getTemplate());
		}
	}

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('pageContent');
	}

	removeTemplate() {
		this.contentContainer.remove();
	}

	getEventTargets() {
		this.delBtns = document.getElementsByClassName('js-del-btn');
	}

	bindEvents() {
		[].forEach.call(this.delBtns, (product) => {
			product.addEventListener('click', this.removeFromCart.bind(this), false);
		});
	}

	unbindEvents() {
	}

	removeFromCart(event) {
    event.preventDefault();

    const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.delete.url;
    const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.cart.delete.params;

    const userToken = __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getToken();

    requestParameters.headers = new Headers({
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    });

    let idOfProduct = Number(event.currentTarget.getAttribute('data-id'));

    let reqBody = [
      {
        "id": idOfProduct
      }
    ];

    requestParameters.body = JSON.stringify(reqBody);

		const delFetchReq = new Request(requestUrl, requestParameters);

    this.model.fetchData(delFetchReq)
      .then((response) => {
        if (response.cart) {
					this.refreshInfo(response);
					/*
					this.refreshLocalCart(response);
					setTimeout(() => { /// promise
						this.refreshHeaderInfo();
					});
					*/
        }
        console.log(response);
			});
		
			const productDiv = event.currentTarget.parentNode.parentNode; // apply data-id attribute to this div?
			productDiv.remove();

			
			if (!document.getElementsByClassName("product").length) {
				this.removeTemplate();
				return this.insertTemplate(this.emptyCartView.getTemplate());
			}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartPresenter;


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_cart_view__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_empty_cart_view__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(2);
// import forEach from 'lodash/forEach';
// import find from 'lodash/find';
// import intersectionBy from 'lodash/intersectionBy';
// import flattenDeep from 'lodash/flattenDeep';

//import forOwn from 'lodash/forOwn';






class CartModel extends __WEBPACK_IMPORTED_MODULE_2__model__["a" /* default */] {
  // getModifiedData(jsonObj) {
  //   if (!("cart" in jsonObj) || !jsonObj.cart.isArray || jsonObj.cart.length < 1) {
  //     //this.view = this.emptyCartView;
  //     this.view = new EmptyCartView();
  //   } else {
  //     this.view = new CartView();
  //   }
  //   return jsonObj;
  // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartModel;


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_reg_model__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_reg_view__ = __webpack_require__(67);


//





class RegPresenter extends __WEBPACK_IMPORTED_MODULE_2__presenter__["a" /* default */] {
	constructor() {
    super();

    this.title = "EXTREME SHOP";

		this.view = new __WEBPACK_IMPORTED_MODULE_4__views_reg_view__["a" /* default */]();
    this.model = new __WEBPACK_IMPORTED_MODULE_3__models_reg_model__["a" /* default */]();
  }

  init() {
		if (!this.contentContainer) { // <-- SINGLETON
      this.insertTemplate(this.view.getTemplate());
			this.getEventTargets()
				.then(() => {
					this.bindEvents();
				});
		}
  }

	insertTemplate(compiledTemplate) {
		this.pageFooter.insertAdjacentHTML("beforeBegin", compiledTemplate);
		this.contentContainer = document.getElementById('signForm');
	}

	removeTemplate() {
    //this.contentContainer.remove();
    //this.closeForm();
  }

  getEventTargets() {
    return new Promise((resolve, reject) => {
      //document.addEventListener("DOMContentLoaded", (event) => {
        this.signFormOverlay = document.getElementById("signOverlay");
        this.signFormWrapper = document.getElementById("signWrapper");
        this.signFormHeader = document.getElementById("signHeader");
        this.signFormForm = document.getElementById("signForm");

        this.changeFormLink = document.getElementById("changeForm");
        //this.accountBtn = document.getElementById("accountBtn"); <--- Undefined in this moment

        this.sendFormBtn = document.getElementById("sendFormButton");

        this.emailInput = document.getElementById("emailInput");
        this.passwordInput = document.getElementById("passwordInput");

        this.formData = new FormData(this.signFormForm);

        this.rememberLabel = document.getElementById("rememberMe");
        this.forgotPassLink = document.getElementById("forgotPassword");
        this.tipsLineDiv = document.getElementById("tipsLine");

        this.logFormActive = true;

        resolve();
      //});
    });
  }

  bindEvents() {
    // $("input[type=email]").blur(inputBlurHandler);
    // $("input[type=password]").blur(inputBlurHandler);

    document.getElementById("cancelButton").addEventListener("click", this.closeFormEventHandler.bind(this), false);

    this.sendFormBtn.addEventListener("click", this.sendForm.bind(this), false);

    this.signFormOverlay.addEventListener("click", this.closeFormEventHandler.bind(this));

    this.changeFormLink.addEventListener("click", this.changeForm.bind(this), false);

    //logButton.addEventListener("click", logUser, false);
    //this.signButton.addEventListener("click", regUser, false);
  }

  showRegForm(event) {
    event.preventDefault();

    if (__WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].getKeyJson()) {
      __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].removeKeyValue();
      document.getElementById("accountBtn").innerText = "ACCOUNT";
      this.refreshHeaderInfo();
      return;
    }

    const animationPromise = new Promise((resolve, reject) => {
      this.signFormWrapper.classList.remove("hide");
      this.signFormOverlay.classList.remove("hide");
      resolve();
    }) // PROMISE DOESNT WORK
      .then(() => {
        setTimeout(() => { /// WAIT 20 ms FOR "DISPLAY:NONE" FINISHING. <---- ????
          this.signFormOverlay.classList.add("overlay_visible");
          this.signFormHeader.classList.add("sign-form__header_visible");
          this.signFormForm.classList.add("sign-form__form_visible");

          this.emailInput.focus();
        }, 20);
      });
  }

  closeForm() {
    this.signFormOverlay.classList.remove("overlay_visible");
    this.signFormHeader.classList.remove("sign-form__header_visible");
    this.signFormForm.classList.remove("sign-form__form_visible");

    setTimeout(() => {
      this.signFormWrapper.classList.add("hide");
      this.signFormOverlay.classList.add("hide");
    }, 250);
  }

  closeFormEventHandler(event) {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      this.closeForm();
    }
  }

  changeForm(event) {
    if (this.logFormActive) {
      this.logFormActive = false;

      this.signFormHeader.innerText = "PLEASE SIGN UP";
      this.changeFormLink.innerText = "Log In";
      this.sendFormBtn.innerText = "SIGN UP";

      this.rememberLabel.remove();
      this.forgotPassLink.remove();

      this.emailInput.focus();
    }
    else {
      this.logFormActive = true;

      this.signFormHeader.innerText = "PLEASE LOG IN";
      this.changeFormLink.innerText = "Sign Up";
      this.sendFormBtn.innerText = "LOG IN";

      this.tipsLineDiv.insertAdjacentElement("beforeBegin", this.rememberLabel);
      this.tipsLineDiv.insertAdjacentElement("afterBegin", this.forgotPassLink);

      this.emailInput.focus();
    }
  }

  sendForm() {
    event.preventDefault();

    this.formData.set("email", this.emailInput.value);
    this.formData.set("password", this.passwordInput.value);

    let requestUrl;
    let requestParameters;

    if (this.logFormActive) {
      requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.login.url;
      requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.login.params;

    } else {
      requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.register.url;
      requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.register.params;
    }

    requestParameters.body = this.formData;

    this.fetchReq = new Request(requestUrl, requestParameters);

    fetch(this.fetchReq)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.token) {
          //debugger
          __WEBPACK_IMPORTED_MODULE_1__local_storage__["a" /* default */].setKeyValue(responseJson);
          document.getElementById("accountBtn").innerText = "LOG OUT";
          this.refreshHeaderInfo();
          //localStorage.setItem("user", JSON.stringify(responseJson));
        }
      })
      .catch(function(ex) {
        console.log('Parsing of the data failed: ', ex);
      });

    //const hashChangeEvent = new Event('hashchange');
    //window.dispatchEvent(hashChangeEvent);
    this.closeForm();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegPresenter;


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);


class RegModel extends __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */] {}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegModel;


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RegView {
  getTemplate() {
    const regTemplate = `
    <div id="signOverlay" class="overlay hide">
    </div>

    <div id="signWrapper" class="sign-form__wrapper sign-page__sign-form hide">
      <h2 id="signHeader" class="sign-form__header bold-text">PLEASE LOG IN</h2>
      <form id="signForm" class="sign-form__form" novalidate>
        <label>
          <!--<i class="fas fa-envelope"></i>--><svg height="32" class="sign-form__icon" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill-rule="evenodd" d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path></svg>
          <input id="emailInput" class="input-size sign-form__input email-input" type="email" placeholder="E-mail@example.com">
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter an e-mail</p> -->
        </label>
        <label>
          <!--<i class="fas fa-unlock"></i>--><svg height="28" class="sign-form__icon sign-form__pass" viewBox="0 0 14 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M12.83 2.17C12.08 1.42 11.14 1.03 10 1c-1.13.03-2.08.42-2.83 1.17S6.04 3.86 6.01 5c0 .3.03.59.09.89L0 12v1l1 1h2l1-1v-1h1v-1h1v-1h2l1.09-1.11c.3.08.59.11.91.11 1.14-.03 2.08-.42 2.83-1.17S13.97 6.14 14 5c-.03-1.14-.42-2.08-1.17-2.83zM11 5.38c-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38.77 0 1.38.61 1.38 1.38 0 .77-.61 1.38-1.38 1.38z"></path></svg>
          <input  id="passwordInput" class="input-size mid-top-margin password-input" type="password" placeholder="Password">
          <!-- <p class="sign-form__validation-message tiny-top-margin hide">Enter a password</p> -->
        </label>
        <label id="rememberMe" class="sign-form__remember small-top-margin">
          <input type="checkbox"> Remember me
        </label>
        <div id="tipsLine" class="two-cols-line small-top-margin">
          <a id="forgotPassword" class="two-cols-line__left" href="#">Forgot password?</a>
          <a id="changeForm" class="two-cols-line__right" href="#">Sign Up</a>
        </div>
        <button id="sendFormButton" class="button button_color mid-top-margin">LOG IN</button>
        <button id="cancelButton" class="button button_gray mid-top-margin">CANCEL</button>
      </form>
    </div>
    `;

    const compiledRegTemplate = Handlebars.compile(regTemplate);
    return compiledRegTemplate();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegView;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__presenter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_header_model__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_header_view__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_search_results_view__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router__ = __webpack_require__(7);











class HeaderPresenter extends __WEBPACK_IMPORTED_MODULE_2__presenter__["a" /* default */] {
	constructor() {
		super();

		const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.index.url;
		const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.index.params;

		this.fetchReq = new Request(requestUrl, requestParameters);

		this.view = new __WEBPACK_IMPORTED_MODULE_4__views_header_view__["a" /* default */]();
		this.model = new __WEBPACK_IMPORTED_MODULE_3__models_header_model__["a" /* default */]();

		this.searchResultsView = new __WEBPACK_IMPORTED_MODULE_5__views_search_results_view__["a" /* default */]();
	}

	init() { // <-- SINGLETON
		if (!this.template) {
			super.init();
		}
  }

	insertTemplate(compiledTemplate) {
		this.body.insertAdjacentHTML("afterBegin", compiledTemplate);
		this.template = document.getElementById('pageHeader');
	}

	removeTemplate() {
		//this.template.remove();
	}

	getEventTargets() {
    return new Promise((resolve, reject) => {
			this.accountBtn = document.getElementById("accountBtn");
			this.catalogBtn = document.getElementById("catalogBtn");
			this.navContainer = document.getElementById("navContainer");
			this.submenuContainer = document.getElementById("submenuContainer");

			this.cartValue = document.getElementById("cartValue");

			this.searchForm = document.getElementById("searchForm");
			this.searchInput = document.getElementById("searchInput");
			this.searchResultsContainer = document.getElementById("searchResults");
			this.searchBtn = document.getElementById("searchIcon");

			resolve();
    });
  }

  bindEvents() {
		document.getElementById("accountBtn").addEventListener("click", this.showRegForm.bind(this), false);
		//this.accountBtn.addEventListener("click", signPresenter.showRegForm()/*.bind(this)*/, false);
		this.catalogBtn.addEventListener("mouseover", this.showMenu.bind(this), false);
		this.catalogBtn.addEventListener("mouseleave", this.closeMenu.bind(this));
		//this.navContainer.addEventListener("mouseover", this.closeMenu.bind(this));
		this.submenuContainer.addEventListener("mouseleave", this.closeMenu.bind(this));

		this.searchInput.addEventListener("focus", this.animateSearchForm.bind(this), false);
		this.searchInput.addEventListener("blur", this.animateSearchForm.bind(this), false);
		this.searchInput.addEventListener("input", this.showSearchResults.bind(this), false);

		this.refreshHeaderInfo();

		///// ---- WATCHER ------ /////////

		// Select the node that will be observed for mutations
		setTimeout(() => {
			//var targetNode = document.querySelector("#pageContent");
			var targetNode = document.body;

			// Options for the observer (which mutations to observe)
			var config = { attributes: true, childList: true };

			// Callback function to execute when mutations are observed
			var callback = (mutationsList) => {
				this.refreshHeaderInfo();
			};

			// Create an observer instance linked to the callback function
			var observer = new MutationObserver(callback);

			// Start observing the target node for configured mutations
			observer.observe(targetNode, config);

			// Later, you can stop observing
			//observer.disconnect();
		}, 1000);
		///// ----- WATCHER ----- //////
	}



	showRegForm(event) {
		__WEBPACK_IMPORTED_MODULE_6__router__["b" /* signPresenter */].showRegForm(event);
	}

	showMenu(event) {
		event.preventDefault();

		this.submenuContainer.classList.remove("hide");
		//this.submenuContainer.classList.toggle("hide");
	}

	closeMenu(event) {
		event.preventDefault();

		if (event.currentTarget === this.catalogBtn) {
			if (event.movementY > 0) {

			} else {
				this.submenuContainer.classList.add("hide");
			}
		} else {
			this.submenuContainer.classList.add("hide");
		}

		//if (event.clientY > 250 || event.currentTarget === this.navContainer) {
			//this.submenuContainer.classList.add("hide");
		//}
	}

	animateSearchForm(event) {
		event.preventDefault();

		this.searchForm.classList.toggle("search-form_focused");
		this.searchBtn.classList.toggle("search-form__fa-search_focused");
		setTimeout(()=> { 
			this.searchResultsContainer.classList.toggle("hide"); 
		}, 200);
		
		if (this.searchForm.classList.contains("search-form_focused")) {
			event.currentTarget.select();
		}
	}

	showSearchResults(event) {
		event.preventDefault();

		const requestUrl = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.search.url + event.currentTarget.value;
		console.log(requestUrl);
		const requestParameters = __WEBPACK_IMPORTED_MODULE_0__paths__["a" /* default */].ajax.search.params;

		const searchFetchReq = new Request(requestUrl, requestParameters);

		this.model.fetchData(searchFetchReq)
    .then((jsonData) => {
			console.log(jsonData);
      return this.searchResultsView.getTemplate(jsonData);
    })
    .then((compiledTemplate) => {
			this.searchResultsContainer.innerHTML = compiledTemplate;
      return true;
    }) //PUT CATCH HERE?
    .catch((ex) => {
      console.log('Displaying of the search results failed: ', ex);

      if (this.fetchErrorHandler) {
        this.fetchErrorHandler(ex);
      }
    });
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeaderPresenter;


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(2);


class HeaderModel extends __WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */] {
  fetchData(fetchReq) {
    return fetch(fetchReq)
    .then((response) => {
      return response.json();
    })
    .then((jsonObj) => {
      if (this.getModifiedData) {
        return this.getModifiedData(jsonObj);
      }
      return jsonObj;
    })
    .catch(function(ex) {
      console.log('Parsing of the data failed: ', ex);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeaderModel;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HeaderView {
  getTemplate(data) {
    const headerTemplate = `
		<header id="pageHeader" class="header">
			<div id="headerContainer" class="header__container">
				<button id="navBtn" class="nav-btn mobile-btn header__nav-btn" onclick="toggleNav();">
					<span class="nav-btn__top"></span>
					<span class="nav-btn__mid"></span>
					<span class="nav-btn__bot"></span>
				</button>
				<div class="header__logo-wrapper">
					<a class="non-text-link header__logo" href="#">
						<!-- <img class="header__logo-img" src="http://localhost:3000/images/ex_shop_logo_m.png"> -->
					</a>
				</div>

				<nav id="navContainer" class="desktop-menu__container">
					<a id="catalogBtn" class="desktop-menu__btn" href="#">CATALOG</a>
					<a class="desktop-menu__btn" href="#">STORES</a>
					<a id="accountBtn" class="desktop-menu__btn" href="#">ACCOUNT</a>
				</nav>

				<svg class="svg-btn header__search-btn" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>

				<div class="header__cart mobile-btn">
					<a href="#cart">
						<svg class="svg-btn" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
						<span id="cartValue" class="header__cart-value"></span>
					</a>
				</div>
				<div id="searchForm" class="search-form">
					<svg id="searchIcon" class="svg-btn search-form__fa-search" class="search-form__fa-search" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
					<input id="searchInput" class="search-form__input" type="text" placeholder="Search here..." required>
					<div id="searchResults" class="search-form__results hide">
					</div>
				</div>
			</div>


			<div id="submenuContainer" class="desktop-menu__sub-menu hide">
				{{#each this}}
					<ul class="desktop-menu__sub-ul">
						<li>
							<a class="desktop-menu__sub-header" href="#categories/{{this.name}}/products">{{this.title}}</a>
						</li>
						{{#each catalog}}
							<li class="desktop-menu__sub-btn">
								<a href="#categories/{{this.name}}/products" class="desktop-menu__sub-link">{{this.title}}</a>
							</li>
						{{/each}}
					</ul>
				{{/each}}
			</div>
		</header>
    `;

    const compiledCategoryTemplate = Handlebars.compile(headerTemplate);
    return compiledCategoryTemplate(data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeaderView;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SearchResultsView {
  getTemplate(data) {
    const searchResultsTemplate = `
    {{#each this}}
      <a href="#products/{{this.id}}">
        <p class="search-form__result">{{this.title}}</p>
      </a>
    {{/each}}
    `;

    const compiledSearchResultsTemplate = Handlebars.compile(searchResultsTemplate);
    return compiledSearchResultsTemplate(data);
    //return Handlebars.compile(searchResultsTemplate(data));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchResultsView;


/***/ })
/******/ ]);