const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const path = require("path")


module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        port: 3002,
        progress: true,
        contentBase: "./build",
        compress: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/template.html", // 指定以哪个模版作为基础
            title: "html-webpack-plugin", // html中的title
            filename: "test.html", // 使用html-webpack-plugin 生成的文件名
            minify: { // 默认值是 true， 就是开启代码压缩， 如果mode配置为生产环境production，这里可以配置成object 对象
                // 如果是开发环境development， minify 默认为false
                removeAttributeQuotes: true, // 移除html中属性的双引号 
                removeComments: true, // 删除注释
                removeEmptyAttributes: true, // 删除所有没有指定值的属性
                removeEmptyElements: true, // 移除没有内容的 DOM元素
                collapseWhitespace: true // 折叠代码到一行
            },
            hash: true, // 默认false, 去掉缓存，在文件后面加个 hash串
        })
    ],


}