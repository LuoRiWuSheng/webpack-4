// 线上环境
const merge = require('webpack-merge')
const commen = require('./webpack.commen.js')
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = merge(commen, {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
})