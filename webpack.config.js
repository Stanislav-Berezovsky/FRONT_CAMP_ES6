module.export = {
        context: path.resolve(__dirname, "app/js/src"),
        entry: "./app.js",
        output: {
            path.resolve(__dirname, "docs/js"),
            filename: "main.js",
        },
        devtool: "source-map",
        watch:true,
        watchOptions:{
        	ignored:/node_modules/
        }
    }