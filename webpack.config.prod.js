var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  devtool: 'source-map',
  entry: [
    './js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      //  更多配置 https://github.com/mishoo/UglifyJS2#usage
      output:{
        comments:false,
      },
      compress:{
        warnings:false
      }
    }),
    new  webpack.DefinePlugin({
      'process.env':{
        "NODE_ENV":JSON.stringify("production")
      }
    }),
    //抽取样式
    new ExtractTextPlugin("bundle.css")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=25000' }
    ]
  }
}
