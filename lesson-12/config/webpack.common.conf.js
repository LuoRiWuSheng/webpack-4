const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsWebpackPlugin  = require ('friendly-errors-webpack-plugin')

const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const path = require("path")

const env = process.env.NODE_ENV

const commenConfig = {
  entry: {
    app: "./src/app.js",
    index: "./src/one/index.js"
  },
  output: {
    //publicPath: env === "development" ? "/" : "/",
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            // 将图片文件单独输出
            outputPath: "/img"
          }
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    // 友好的提示webpack错误
    new FriendlyErrorsWebpackPlugin(),
    // 为每一个chunk提供一个版权说明
    new webpack.BannerPlugin("2019年10月25"),
    new webpack.ProvidePlugin({
      $: 'jquery', // 本地js文件
      jquery: "jquery",
      "window.$": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: "./src/one/index.html",
      filename: "index.html",
      // 为所有的静态资源后面都添加一段hash
      hash: true,
      // 将js注入到哪里 head | body===true
      inject: "head",
      chunks: ["index"],
      title: "首页"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin({
      dry: true,
      cleanStaleWebpackAssets: true
    })
   
  ],
  resolve: {
    //extensions: [".js", ".json"],
    // 查找文件的目录-- 先搜索 vender目录，再搜static 再搜node_modules
    modules: [
      path.resolve(__dirname, "./src/vender"),
      path.resolve(__dirname, "./src/static"),
      "node_modules"
    ],
    alias: {
      assets: path.resolve(__dirname, "../src/static")
    }
  }
}

module.exports = commenConfig