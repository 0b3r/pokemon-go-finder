var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/src',
    alias: {
      _appRoot: path.join(__dirname, 'src'),
      _actions: path.join(__dirname, 'src', 'actions'),
      _assets: path.join(__dirname, 'src', 'assets'),
      _components: path.join(__dirname, 'src', 'components'),
      _constants: path.join(__dirname, 'src', 'constants'),
      _services: path.join(__dirname, 'src', 'services'),
      _store: path.join(__dirname, 'src', 'store'),
    }
  },
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
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
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    {
      test: /\.html$/, 
      loader: 'raw', exclude: /node_modules/
    },
    {
      test: /\.css?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style!css'
    },
    {
      test: /\.scss?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style!css!sass'
    },
    { 
      test: /\.(png|jpg)$/, 
      loader: 'file?name=images/[name].[ext]' 
    }]
  }
};