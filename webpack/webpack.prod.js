const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _ = require('lodash');
const baseConfig = require('./base');
const srcPath = path.join(__dirname, '../src');
const distPath = path.join(__dirname, '../dist');
module.exports = _.assign({}, baseConfig, {
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: _.assign({}, baseConfig.module, {
    loaders: _.concat(baseConfig.module.loaders, [
      {
        test: /\.ts(x)?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel', 'ts'],
      },
    ]),
  }),
  plugins: _.concat(baseConfig.plugins, [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, 'app/img/icons/favicon.ico'),
        to: 'favicon.ico',
      },
    ]),
  ]),

});
