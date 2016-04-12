var path = require('path');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'babel-polyfill',
    ['.', '/src', '/app', '/index.js'].join(path.sep)
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
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
