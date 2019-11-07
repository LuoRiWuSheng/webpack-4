const webpack = require("webpack")
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    //minimize: false, // 打包以后，不要压缩代码
    splitChunks: {
      cacheGroups: {
        common: { // 公共的模块--自定义模块的优先级默认为0
          test: /\.js$/,
          name: "common",
          chunks: "all",
          //minSize: 0, // chunk的大小大于0 就被单独抽离成chunk
          minChunks: 2, // 某个模块被引用2次以上才抽离成单独的chunk
          priority: 2,
        },
        vendors: {
          priority: 1000, // 设置权重，在代码抽离的时候，先抽离 node_modules下面引用的包，抽成一个chunks
          test: /[\\/]node_modules[\\/]/, // 如果是从node_modules中找的模块，就抽离出来
          chunks: "all",
          name: "vendors",
          //minChunks: 2
        }
      }
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'initial',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  entry: {
    index: "./src/index.js",
    about: "./src/about/about.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    noParse: /jquery|axios/,
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, "src"),
        use: [
          // 多线程打包
        //  {
        //   loader: "thread-loader",
        //   options: {
        //     name: "thread-js"
        //   }
        //  },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 代码混淆
    // new UglifyJsPlugin({
    //   test: /\.js($|\?)/i
    // }),
    // 忽略某些包
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      title: "性能优化",
      chunks: ["vendors","common","index"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/about/about.html"),
      filename: "about.html",
      title: "dll动态库链",
      chunks: ["vendors","common","about"]
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, "dist", "manifest json")
    // })
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/"
  }
}
