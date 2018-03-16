const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require("css-mqpacker");

module.exports = {
  parser: 'postcss-scss',
  map: true,
  plugins: process.env.NODE_ENV === 'production' ? productionPlugins() : defaultPlugins(),
};

function productionPlugins() {
  return [
    autoprefixer,
    mqpacker({
      sort: true,
    }),
    cssnano,
  ]
}

function defaultPlugins() {
  return [
    autoprefixer,
    mqpacker({
      sort: true,
    }),
  ]
}