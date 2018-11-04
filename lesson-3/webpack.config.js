const path = require("path")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: '模块热加载'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	}
}