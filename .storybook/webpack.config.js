const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
    	  test: /\.css$/,
    	  loader: 'style-loader!css-loader'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
}
