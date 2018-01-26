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
    category: "#category?name=",
    product: "#product?id=",
    cart: "#cart"
  }
};

export default paths;