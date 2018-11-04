// 配置通用配置
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理打包的目录--使运行 npm run dev 生成的dist永远是最新的
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
			title: '代码分离'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commen'
		})
	]
}