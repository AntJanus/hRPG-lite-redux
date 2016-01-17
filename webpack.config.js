var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app/app.js'
  ],
  output: {
    path: [__dirname, 'src'].join(path.sep),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  }
};
