const path = require("path")
const fs = require("fs")

const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const HtmlTemplateList = require("./template.js")

let webpackconfig = {
  entry: {
    app: "./src/app.js",
    userNotice: "./src/one/userNotice.js",
    ctd: "./src/static/js/ctd.js"
    //layer: "./src/vender/layer/layer.js"
  },
  output: {
    publicPath: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    path: path.join(__dirname, "dist"),
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:5].[ext]"
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
     // 清除 dist目录
     new CleanWebpackPlugin(),
    // 热加载
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    // 文件拷贝
    new CopyWebpackPlugin([
      //{from: "src/doc/1.txt", to: "doc/1.txt"}
      //"src/doc/1.txt"
      //{from: "test"}
      //{from: "test", to: "test"}
    ]),
    // 为每一个chunk提供一个版权说明
    new webpack.BannerPlugin("2019年10月25"),
    new webpack.ProvidePlugin({
      $: 'jquery', // 本地js文件
      jquery: "jquery",
      axios: "axios",
      layer: "layer",
      laydate: "laydate"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
   
    // 配置多页模版
    ...HtmlTemplateList
  ],
  devtool: "source-map",
  //devtool: "eval-source-map",
  resolve: {
    alias: {
      ctd: path.resolve(__dirname, "/src/static/js/ctd.js"),
      jQuery$: path.resolve(__dirname, "/src/vender/jquery/jquery.min.js"),
      layer: path.resolve(__dirname, "src/vender/layer/layer.js"),
      laydate: path.resolve(__dirname, "src/vender/layDate-v5.0.9/laydate.js"),
      axios: path.resolve(__dirname, "src/vender/axios/axios.min.js")
    }
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    overlay: true, // 如果代码出错，就弹出提示层
    proxy: {
      // 开发模式跨域代理
      '/api': {
        target: "http://10.146.25.12",
        changeOringin: true
      }
    }
  },
  //watch: true,
  //watchOptions: {
    //ignored: "/node_modules/",
    //poll: 1000 // 检查文件变动--轮询
  //}
}


module.exports = webpackconfig
