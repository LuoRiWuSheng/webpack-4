const webpack = require("webpack")
const merge = require("webpack-merge")
const commonConfig = require('./webpack.common.conf')

const path = require("path")

const devConfiv = {
  mode: "development",
  devtool: "source-map",
  module: {
    // 开发环境 css直接插入到 style中
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist/"),
    port: 8000,
    hot: true,
    overlay: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://192.168.2.5",
        changeOrigin: true,
        logLevel: "debug",
        headers: {
          Cookie: ""
        }
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}


module.exports = merge(commonConfig, devConfiv)