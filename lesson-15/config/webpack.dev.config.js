const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const baseConfig = require("./webpack.base.config")

const devConfig = {
  mode: "development",
  output: {
    // 这是一个相对路径
    publicPath: "/"
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "/"),
    publicPath: "/"
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // 启动HRM 哪一个模块有更新，会打印更新文件的相对路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.js$/,
        use: []
      }
    ]
  }
}

module.exports = merge(baseConfig, devConfig)