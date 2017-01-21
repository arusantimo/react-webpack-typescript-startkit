const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const baseConfig = require('./webpack.base');

module.exports = _.assign({}, baseConfig, {
  devtool: 'source-map',
  entry: _.concat([
    'webpack-dev-server/client?http://0.0.0.0:8001',
    'webpack/hot/only-dev-server',
  ], baseConfig.entry),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: 'http://0.0.0.0:8001/',
  },
  module: _.assign({}, baseConfig.module, {
    loaders: _.concat(
      [
        {
          test: /src\/.+.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel'],
        },
        {
          test: /src\/.+.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel', 'ts'],
        },
      ],
      baseConfig.module.loaders
    ),
    preloaders: { test: /\.js$/, loader: 'source-map-loader' }
  }),
  plugins: _.concat(baseConfig.plugins, [
    new webpack.HotModuleReplacementPlugin(),
  ]),
});
