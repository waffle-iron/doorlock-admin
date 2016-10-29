var path = require('path');
var webpack = require('webpack');

var nodeRoot = path.join( __dirname, 'node_modules' );
var nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
        'socket.io-client': path.join( nodeRoot, 'socket.io-client', 'socket.io.js' ),
        'config': path.join(__dirname, 'src', 'config', nodeEnv)
    }
  },
  module: {
    noParse: [ /socket.io-client/ ],
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
