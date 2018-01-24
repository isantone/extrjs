module.exports = {
  host: {
    url: "http://localhost:3000/",
    api: {
      url: "http://localhost:3000/api/",
    }
  },
  cart: {
    url: "/cart",
    add: {
      url: "/cart/add"
    }
  },
  category: {
    url: "/categories/:categoryName"
  },
  categories: {
    url: "/categories",
    products: {
      url: "/categories/:categoryName/products",
      product: {
        url: "/categories/:categoryName/products/:itemId"
      }
    }
  },
  users: {
    url: "/users",
    user: {
      url: "/users/:userLogin",
    }
  },
  login: {
    url: "/login"
  },
  register: {
    url: "/register"
  }
};