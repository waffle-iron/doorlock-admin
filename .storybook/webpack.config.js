const path = require('path');

var nodeRoot = path.join( __dirname, '../', 'node_modules' );

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
        'socket.io-client': path.join( nodeRoot, 'socket.io-client', 'socket.io.js' )
    }
  },
  module: {
    noParse: [ /socket.io-client/ ],
    loaders: [
      {
    	  test: /\.css$/,
    	  loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      { test: /\.woff(2)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)?$/, loader: 'file-loader' }
    ]
  }
}


  // { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
