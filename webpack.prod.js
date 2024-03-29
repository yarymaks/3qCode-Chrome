const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'nosources-source-map',
});
