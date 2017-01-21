var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack/webpack.dev');

new WebpackDevServer(webpack(config), {
  proxy: {
    "*": "http://localhost:8000"
  },
  publicPath : config.output.publicPath,
  hot : true,
  historyApiFallback : true,
  stats : { colors : true },
  inline : true
}).listen(8001, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at 0.0.0.0:8001');
});
