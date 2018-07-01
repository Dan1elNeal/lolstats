const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');


module.exports = merge(common, {
  entry: [
    'webpack-hot-middleware/client?reload=true'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[local]__[hash:8]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
