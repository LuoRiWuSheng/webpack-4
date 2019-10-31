const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src/js/index.js"),
        header: path.resolve(__dirname, "src/js/header.js"),
        footer: path.resolve(__dirname, "src/js/footer.js")
    },
    output: {
        filename: "[name].bundle.[hash:5].js",
        path: path.resolve(__dirname, 'dist')
    }, 
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/pages/index.html"),
            filename: "index.html",
            inject:true,
            hash:false,
            chunks:["index"]
         }),
         new HtmlWebpackPlugin({
            inject: true,
            filename: "header.html",
            template: path.resolve(__dirname, "src/pages/header.html"),
            chunks: ['header'],
            hash:false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/pages/footer.html"),
            filename: "footer.html",
            inject:true,
            hash:false,
            chunks:["footer"]
         }),
       new MiniCssExtractPlugin({
            filename: "css/[name].css" // 通过这个插件，抽离出来的样式文件，叫什么名字
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,"css-loader"]
        }]
    }
}