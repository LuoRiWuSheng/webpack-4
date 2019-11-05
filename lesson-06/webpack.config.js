const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 将css单独抽离成文件，link进来
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.[hash:8].js",
        path: path.resolve(__dirname, "build")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "css模块相关",
            hash: true,
            filename: "index.html",
            template: "./src/index.html",
            // minify: {
            //     collapseWhitespace: true
            // }
        }),
        // 抽离css的插件
        new MiniCssExtractPlugin({
            filename: "[name].css" // 通过这个插件，抽离出来的样式文件，叫什么名字
        })
    ],
    devServer: {
        port: 3003,
        hot: true,
        contentBase: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        open: true
    },
    devtool: 'inline-source-map', // 调试
    module: { // 模块
        // loader
        rules: [
            // loader 从右往左执行
            // css-loader  解析 @import 这种语法
            // style-loader  将上面解析出来的内容插入到html中
            {
                test: /\.css$/i,
               /* use: [{
                    loader: 'style-loader',
                    options: {
                        injectType: "singletonStyleTag"
                    }
                }, 'css-loader']
                */
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // 添加css的浏览器前缀
                    {
                        loader: "postcss-loader"
                    },
                    "less",
                    "less-loader"
                ]

            }

        ]
    }

}