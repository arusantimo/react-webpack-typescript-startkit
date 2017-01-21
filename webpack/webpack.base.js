const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const srcPath = path.join(__dirname, '../src');
module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(srcPath, 'app/index.tsx'),
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jsx']
  },
  plugins: [],
  module: {
    loaders: [
      { test: /\.css?$/, loader: 'style-loader!css-loader' },
      { test: /\.scss?$/, loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
        ]
      },
      { test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]' },
      { test: /\.ttf?$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.eot?$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.svg?$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=[name].[ext]' },
    ]
  }
};