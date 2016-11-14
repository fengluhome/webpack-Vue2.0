/**
 * Created by aresn on 16/7/5.
 */
// global.debug = false;
global.htmluseRandom = (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1).toLowerCase();
var webpack = require('webpack');
var config = require('./webpack.base.config');
var path = require('path');
var cleanPlugin = require('clean-webpack-plugin');
config.plugins = (config.plugins || []).concat([
    new cleanPlugin('./dist/', {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })

]);
module.exports = config;