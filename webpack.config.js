const path = require('path');

module.exports = {
    entry: "./searchPageReact/app.jsx",
    output:{
        path: path.resolve(__dirname, './public/js'),
        publicPath: 'public/js/',
        filename: "search.js"
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["env", "react"]
                }
            }
        ]
    }
};