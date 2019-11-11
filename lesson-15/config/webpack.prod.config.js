const webpack = require("webpack")
const merge = require("webpack-merge")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const baseConfig = require("./webpack.base.config")

const devConfig = {
  mode: "development",
  output: {
    //publicPath: "/"
  },
  optimization: {
    minimize: true,
    splitChunks: {

    }
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)