var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
console.log(isDevelopment);
module.exports = {
    context: path.resolve(__dirname, "app/js/src"),
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname, "docs/js"),
        filename: "./main.js"
    },
    devtool: isDevelopment ? "eval" : "source-map",
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
        }]
    }
}