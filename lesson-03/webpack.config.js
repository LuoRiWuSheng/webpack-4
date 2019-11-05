const path = require("path")
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
            title: 'html-webpack-plugin',
            template: "./src/index.html", // 使用我们自己指定的 template
            minify: {
                collapseWhitespace: true
            },
            hash: true
		})
	],
	module: {
		rules: [
			
		]
	},
	devtool: 'inline-source-map',
	devServer: { // 开发服务器配置
		contentBase: "./dist", // 以 webpack.config.js同级的 dist作为本地localhost的运行目录
        hot: true,
        port: 3001, // 更改 监听端口
        compress: true, // 所有来自dist目录，在内存中输出的时候
        //lazy: true, // 在 惰性模式下
        filename: "[name].bundle.js", // 文件名和 output中的filename一致
        open: true  // 启动服务，就打开运行服务
    }
}