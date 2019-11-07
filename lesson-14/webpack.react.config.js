// 演示打包 react和react-dom

const webpack = require("webpack")
const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    //test: path.resolve(__dirname, "src", "test.js")
    react: ["react", "react-dom"]
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名就是 _dll_react.js
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]", // 这个配置是将打包的文件暴露出一个名字，不写，默认就是闭包，外部无法访问内部代码,这里就叫 _dll_react
    libraryTarget: "var"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "_dll_[name]", // 这里的name 和 output.library 要同名,不然找不到模块
      path: path.resolve(__dirname, "dist", "manifest json"), // 打包输出的目录，名称必须叫 manifest json
    })
  ]
}