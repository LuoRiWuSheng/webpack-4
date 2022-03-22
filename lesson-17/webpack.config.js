const webpack = require("webpack")
const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "zipLib.js",
    sourceMapFilename: "zipLib.map",
    library: "zipLib",
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin()
  ]
}