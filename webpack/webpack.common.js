const path = require('path');
const config = require('config');
const webpack = require('webpack');

const { hostname, port } = config.get('host');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.jsx'],
  output: {
    path: path.join(__dirname, '../public/static/build/'),
    filename: 'main.js',
    publicPath: `http://${hostname}:${port}/static/build/`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /public/]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true
      }
    })
  ],
  resolve: { extensions: ['.js', '.jsx'] }
};
