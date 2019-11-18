
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/js/index.js")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pages/index.ejs"),
      filename: "index.html",
      title: "首页",
      inject: true,
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // url-loader 可以做一个限制，图片在限制范围内，就变成base64
        use: {
          loader: "file-loader",
          // options: {
          //   limit: 1024 * 500
          // }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ['img:src', 'img:data-src', 'audio:src'],
              minimize: true
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    hot: true
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/")
    }
  },
  externals: {
    'jquery': 'window.jQuery'
  }
}