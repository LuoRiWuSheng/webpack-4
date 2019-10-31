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
    rules: [
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