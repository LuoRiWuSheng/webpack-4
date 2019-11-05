const path = require("path")
const webpackHtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpackHtmlPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      title: "js处理",
      hash: 8
    })
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "build")
  },
  devtool: "source-map",
  module: {
    // loader  默认是从右往左执行，从下往上执行，eslint-loader 应该是在其他loader之前运行
    // 保证代码质量是没问题的，才交由其他loader进行处理
    rules: [
      {
        test: /\.js$/,use:[
          {
            loader: 'eslint-loader',
            options: {
           
            }
          }
        ],
        exclude: /node_modules/,
        //强制 pre 之前执行  post 之后  未设置为普通的loader
        enforce: 'pre',
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        // 不要去转化node_modules下面的包
        exclude: /(node_modules|brower_components)/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "entry"
                }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      }
    ]
  }
}