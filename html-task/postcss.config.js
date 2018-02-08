const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  parser: 'postcss-scss',
  map: true,
  plugins: [
    autoprefixer,
    cssnano
  ]
};