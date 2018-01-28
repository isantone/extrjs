const host = "http://localhost:3000/api";

const paths = {
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
    }
  }
};

export default paths;