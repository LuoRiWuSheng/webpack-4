[TOC]

### 热模块加载 HMR 

```
devServer: { // 开发服务器配置
    contentBase: path.join(__dirname, "dist"), // 以 webpack.config.js同级的 dist作为本地localhost的运行目录
    hot: true, // 启用webpack的HMR 热模块替换
    port: 3001, // 更改 监听端口
    compress: true, // 所有来自dist目录，在内存中输出的时候
    lazy: true, // 在 惰性模式下 , 惰性模式，只有在请求的时候才会去编译bundle包，意味着，不会监听我们src的源文件的任何变动
    filename: "[name].bundle.js", // 文件名和 output中的filename一致
}
```

webpack-dev-server 命令行的参数
--color  显示颜色
--progress 显示打包的细节，显示打包进度

---

### clean-webpack-plugin 在打包之前，清理指定目录

[官方API](https://www.npmjs.com/package/clean-webpack-plugin)

> 默认情况下， clean-webpack-plugin 会删除output.path 这个目录的所有文件，也会删除每次webpacK 重新打包后没有用的资源

> 在实际中，不需要任何设置，可以直接使用clean-webpack-plugin 插件

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.export = {
    plugins: [
        new CleanWebpackPlugin({
            // 要不要删除目录，默认不应该删除目录
            dry: false, // 默认
            verbose: false, //默认false 将清理日志输出到控制台
            cleanStaleWebpackAssets: true, // 默认 true  在rebuild的时候，删除所有没有使用到的webpack资源
            protectWebpackAssets: true, // 默认 true , 不允许删除webpack的资源
            // default: ['**/*']
            // 这个配置比较危险，使用改配置，dry需要设置为true
            // 在Webpack编译之前删除一次文件，不包括重建中的文件， 使用!XXX文件，可以避免文件被删除
            // 这个配置设置为空数组，表示禁用
            cleanOnceBeforeBuildPatterns: ["**/*", "!static-files"], 

            // 在每次构建（包括监视模式）之后删除与此模式匹配的文件。用于不是由Webpack直接创建的文件。
            // 使用 ! 表示某个或者某类文件或文件夹不被清理
            // 默认 []
            cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],
            // 默认 false
            dangerouslyAllowCleanPatternsOutsideProject: true,
        })
    ]
}

```

*write time 2019-08-02*

----

