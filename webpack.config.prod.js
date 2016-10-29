var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeRoot = path.join( __dirname, 'node_modules' );
var nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  stats: { children: false },
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static/js/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('../css/main.css')
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
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ),
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
