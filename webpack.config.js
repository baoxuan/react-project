/**
 * Created by bx on 16/8/1.
 */
var path = require('path')
var webpack = require('webpack')


module.exports = {
    // or devtool: 'eval' to debug issues with compiled output:
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
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
        new webpack.NoErrorsPlugin()

    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel' ],
                exclude: /node_modules/,
                include: path.join(__dirname, '/')// path.join()将多个参数组合成一个 path
            },
            { test: /\.css$/, loader: 'style-loader!css-loader!' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=25000' }
        ]
    }
}
