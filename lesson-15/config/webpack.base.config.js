const webpack = require("webpack")
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index/index.js"),
    about: path.resolve(__dirname, "../src/about/about.js")
  },
  output: {
    filename: "[name].bundle.js",
    // 决定了动态加载的路由的名字
    chunkFilename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    noParse: /jquery|axios|lodash/,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            },
            
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index/index.html"),
      title: "首页",
      filename: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/about/about.html"),
      title: "首页",
      filename: "about.html",
      chunks: ["about"]
    })
  ],
  devtool: "source-map"
}

