const merge = require("webpack-merge")
const common = require("./webpack.common.js")

const path = require("path")

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        contentBase: path.resolve(__dirname, "src"),
        filename: "[name].bundle.js"
    }
})