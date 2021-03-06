// 配置通用配置
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 更新html模版-自动插入
const webpack = require('webpack')

module.exports = {
	entry: {
		app: "./src/index.js",
		anthoer: './src/anthoer-module.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
      title: '代码分离',
      template: "./src/index.html"
    })
  ]
}