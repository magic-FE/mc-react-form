const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './demo/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extentions: ['', '.js', '.jsx'],
    modulesDirectories: ['./node_modules']
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      loaders: ['babel'],
      exclude: path.join(__dirname, 'node_modules'),
      include: path.join(__dirname)
    }, {
      test: /(\.css)$/,
      loaders: ['style', 'css?modules']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map'
};
