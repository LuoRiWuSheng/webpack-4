### html-webpack-plugin

```
 new HtmlWebpackPlugin({
    template: "./src/template.html", // 指定以哪个模版作为基础
    title: "html-webpack-plugin", // html中的title
    filename: "test.html", // 使用html-webpack-plugin 生成的文件名
    minify: { // 默认值是 true， 就是开启代码压缩， 如果mode配置为生产环境production，这里可以配置成object 对象
        // 如果是开发环境development， minify 默认为false
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true

      
        removeAttributeQuotes: true, // 移除html中属性的双引号 
        removeComments: true, // 删除注释
        removeEmptyAttributes: true, // 删除所有没有指定值的属性
        removeEmptyElements: true, // 移除没有内容的 DOM元素
        collapseWhitespace: true // 折叠代码到一行
    },
    hash: true, // 默认false, 去掉缓存，在文件后面加个 hash串
})
```

new HtmlWebpackPlugin.hash 这里的hash设置为true, 会在html的 script的src后面插入一段hash，清除js缓存, 和加一个 时间戳一样的

```
<script type=text/javascript src=index.bundle.js?85432a31a978d7aa7e8b></script>
```

```
module.exports = {
    output: {
        filename: "index.bundle.[hash:8].js",
        path: path.resolve(__dirname, "build")
    }
}
```
output中的filename的hash，这个hash串是加在 index.bundle.xxxhashxxx.js  加在这里的

这2个hash生成的地方不一样，作用一样，清除缓存

html-webpack-plugin 可以通过 filename 这个配置，将输出的路径也配置进去，而不仅仅是文件名

```js
...其他配置
 new HtmlWebpackPlugin({
   filename: "page/about.html"
 })

 // 主要看出口文件路径，这个page会在out.path这个目录下建立，并将about.html生成
```


文档参考链接

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [new HtmlWebpackPlugin中的minify配置说明](https://github.com/kangax/html-minifier)