const merge = require("webpack-merge");
const Uglifyjs = require("uglifyjs-webpack-plugin")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
    mode: "production",
    plugins: [
       
    ]
})
