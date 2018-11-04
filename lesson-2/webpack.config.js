const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '管理输出'
		}),
		new CleanWebpackPlugin(['dist'])
	],
	devtool: 'inline-source-map', // 调试
	devServer: {
		contentBase: './dist'
	}
}