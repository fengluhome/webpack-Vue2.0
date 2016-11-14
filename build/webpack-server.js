/**
 * Created by lu on 2016/8/1.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.base.config");

new WebpackDevServer(webpack(config), {
    //contentBase: './views',
    publicPath: config.output.publicPath,

    hot: true,
    proxy: {
        '/v1/*': {
            target: {
                "host": "localhost",
                "protocol": 'http:',
                "port": 3000
            },
            secure: false,
        }
    },
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});