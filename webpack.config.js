var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
console.log(isDevelopment);
module.exports = {
    entry: "./app/js/src/app.js",
    output: {
        path: path.resolve(__dirname, "docs/js"),
        filename: "./main.js"
    },
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    watch: isDevelopment,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 100
    },

    module: {
        loaders: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "app/js/src")],
            loader: 'babel-loader'
        },{
            test: /\.less$/,
            use: [{
                    loader: "less-loader"
                }]
        }]
    },

    devServer: {
       port: '9001',
       contentBase: path.resolve(__dirname, "docs")      
    }
}