// 线上环境
const merge = require('webpack-merge')
const commen = require('./webpack.commen.js')
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清理打包的目录--使运行 npm run dev 生成的dist永远是最新的

module.exports = merge(commen, {
  mode: "production",
	devtool: 'source-map',
	plugins: [
    new CleanWebpackPlugin(),
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
})