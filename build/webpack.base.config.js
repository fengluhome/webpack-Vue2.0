/**
 * 支持离线打包方式
 *
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
//set debug
if (global.debug == undefined) {
    global.debug == true;
}
var chunkhash = global.debug ? "" : "[chunkhash:8]";
var dist= path.join(__dirname, '../output/dist');
module.exports = {
    // 入口
    entry: {
        main: './src/main',
        'vendors': ['vue', 'vue-router'],
    },
    // 输出
    output: {
        path: dist,
        filename: '[name]' + chunkhash + '.js',
        chunkFilename: '[name]' + chunkhash + '.chunk.js',
        publicPath: './'
    },
    // 加载器
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css!autoprefixer'},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
            {test: /\.(html|tpl)$/, loader: 'html-loader'}
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap",
                {
                    publicPath: "./"
                }
            )
        }
    },
    // 转es5
    babel: {
        presets: ['es2015'],
        plugins: [ ["transform-runtime", { "polyfill": false }]]
    },
    resolve: {
        root:'',//绝对路径
        extensions: ['', '.js', '.css', '.scss','.vue'],
        alias: {

            'vue$': 'vue/dist/vue.js',
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }

    },
    plugins: [
        new ExtractTextPlugin("[name]" + chunkhash + ".css", {allChunks: true, resolve: ['modules']}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors' + chunkhash + '.js'),
        new HtmlWebpackPlugin({
            minify: {    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            },//根据模板插入css/js等生成最终HTML
            templateContent: function (templateParams, compilation) {
                var data = fs.readFileSync('./src/index.html', 'utf-8');
                return data.replace('<link rel="stylesheet" href="../dist/main.css">', "")
                    .replace('<script src="../dist/vendors.js"></script>', "")
                    .replace('<script src="../dist/main.js"></script>', "")
                    .replace(/[\r\n]/g, "")
                    .replace(/\s+([^<>]+)(?=<)/g, function (m) {
                        return m.replace(/\s+/g, '');
                    });
            },
            filename: dist + '/index.html',    //生成的html存放路径，相对于 path
            inject: true,    //允许插件修改哪些内容，包括head与body

        })
    ]
};