const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      // {
      //   test: require.resolve("jquery"),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // }
    ]
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      title: "首页",
      path
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ],
  externals: {
    jquery: "jquery"
  },
  devServer: {
    hot: true
  }
}