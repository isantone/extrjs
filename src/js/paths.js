const host = "http://localhost:3003/api";

const paths = {
  host: {
    url: "http://localhost:3003/",
    api: {
      url: "http://localhost:3003/api/"
    }
  },

  client: {
    url: "http://localhost:7777"
  },

  cart: {
    url: "/cart"
  },

  categories: {
    url: "http://localhost:3003/api/categories",
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

export default paths;