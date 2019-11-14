## css 静态资源处理

通过loader 处理css， 可以使用less, sass, scss, stylue 等 css预处理器

- style-loader
- less-loader
- less
- css-loader

```js
yarn add css-loader style-loader --save-dev
```
都是开发依赖

webpack.config.js
```js
module: { // 模块
    // loader
    rules: [
        // loader 从右往左执行
        // css-loader  解析 @import 这种语法
        // style-loader  将上面解析出来的内容插入到html中
        { test: /\.css$/, use: ["style-loader", "css-loader"] }
        
    ]
}
```

### 怎么将css从head 中抽离，用Link的方式嵌入

[MiniCssExtractPlugin - 官网API](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)

**安装**

```js
yarn add mini-css-extract-plugin --save-dev
```

**webpack.config.js中使用**

MiniCssExtractPlugin 这个查看的配置选项和 output的是差不多的 [output- 配置文档](https://www.webpackjs.com/configuration/output/)

```js
 new MiniCssExtractPlugin({
    filename: "[name].css", // 通过这个插件，抽离出来的样式文件，叫什么名字
    chunkFilename: "[id].css"
})
```

修改2个地方，一个是plugins配置，一个是module.rules

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    ...
    plugins: [
        ...其他配置
         // 抽离css的插件
        new MiniCssExtractPlugin({
            filename: "[name].css", // 通过这个插件，抽离出来的样式文件，叫什么名字
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
}
```

### 自动添加浏览器样式前缀
[postcss-loader-API](https://webpack.js.org/loaders/postcss-loader/#root)

使用autoprefixer插件增加浏览器前缀， 使用 postcss-loader解析

**安装**

```js
yarn add postcss-loader autoprefixer --save-dev
```

**使用**

**报错解决**

1. 配置好webpack.config.js中的 postcss-loader 运行时，报下面的错误

```js
 Error: No PostCSS Config found in: D:\github\webpack\webpack-4\lesson-6\src
    at config.search.then (D:\github\webpack\webpack-4\lesson-6\node_modules\postcss-load-config\src\index.js:91:15)
```
使用postcss-loader  需要在项目的跟目录下，创建一个 postcss.config.js 配置文件，并写入 autoprefixer 配置

postcss.config.js
```js
module.exports = {
    plugins: [require("autoprefixer")]
}
```

2. 配置完 postcss.config.js 运行还是报错，说css模块编译失败

```js
 ERROR in ./src/a.css (./node_modules/postcss-loader/src!./node_modules/css-loader/dist/cjs.js!./src/a.css)
    Module build failed (from ./node_modules/postcss-loader/src/index.js):
    SyntaxError

    (1:1) Unknown word
```
这种问题，就是 rulese中，应该先配置 postcss-loader, 因为loader 是从右往左解析

```js
{
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // 顺序问题
        "postcss-loader"
    ]
}
```

3. 配置了autoprefixer ，却不生效

需要设置浏览器导致支持到什么程度

```js
Replace Autoprefixer browsers option to Browserslist config.
Use browserslist key in package.json or .browserslistrc file.

Using browsers option cause some error. Browserslist config
can be used for Babel, Autoprefixer, postcss-normalize and other tools.

If you really need to use option, rename it to overrideBrowserslist.

Learn more at:
https://github.com/browserslist/browserslist#readme
https://twitter.com/browserslist
```

在package.json中配置 浏览器兼任列表

```js
 "scripts": {},
 "browserslist": [
    "> 1%",
    "last 7 versions",
    "not ie <= 8",
    "ios >= 8",
    "android >= 4.0"
]
```

### css压缩



