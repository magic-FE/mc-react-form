const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve:{
    extentions:['','.js','.jsx'],
    modulesDirectories:['./node_modules']
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.join(__dirname,'node_modules')
    },{
      test: /(\.css)$/,
      loaders: ['style', 'css?modules'],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash:true
    })
  ],
  devtool:'inline-source-map'
};
