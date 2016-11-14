/**
 * Created by aresn on 16/7/5.
 */
global.debug = true;
var config = require('./webpack.base.config');

config.output.publicPath = '';




module.exports = config;