module.exports = {
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
    url: "/categories",
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
  }
};