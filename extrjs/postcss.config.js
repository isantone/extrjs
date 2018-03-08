const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require("css-mqpacker");

module.exports = {
  parser: 'postcss-scss',
  map: true,
  plugins: [
    autoprefixer,
    mqpacker,
    cssnano
  ]
};