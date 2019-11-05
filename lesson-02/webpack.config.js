const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	output: {
		filename: '[name].bundle.[hash:8].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{}
		]
	},
	plugins: [
        new CleanWebpackPlugin({
            verbose: true, // 日志在控制台显示
            cleanStaleWebpackAssets: true // 重建时自动删除所有未使用的webpack资源
        }),
		new HtmlWebpackPlugin({
			title: '管理输出'
		})
	],
	devtool: 'inline-source-map', // 调试
	devServer: {
		contentBase: './dist'
	}
}