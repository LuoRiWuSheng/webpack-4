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

### html-webpack-plugin 与ejs配合，抽离公共组件
> ejs是一个模版引擎，html-webpack-plugin 能快速帮我们生成页面，也做了模版的一部分，实际的多页应用中，有很多部分是公共的，可以抽离出来，达到复用的目录

需要修改的点

webpack.config.js

```
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {....},
  plugins: [
    new HtmlWebpackPlugin({
      // 输出的文件名，你需要输出放在哪个目录中 就可以改成 dir/about.html
      filename: "about.html",
      // 重要的就是这里，我们使用的是 ejs结尾的文件
      template: path.resolve(__dirname, "src/pages/about.ejs")
    })
  ]
}
```
about在创建的时候，不再是.html 而是 .ejs后缀

需要安装的loader

```
npm install html-loader ejs-html-loader ejs glob --save-dev
```

使用loader
webpack.config.js
```
// 这里的webpack.config.js与下面的Question 
// 可以认为是2个片段，最终你的实际项目，怎么组织配置文件，剪切关键片段即可
module.exports = {
  module: {
    rules: [
        {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src', ':data-background']
            }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader', // 使用 html-loader 处理图片资源的引用
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          },
          {
            loader: 'ejs-html-loader', // 使用 ejs-html-loader 处理 .ejs 文件的 includes 语法
            options: {
              production: process.env.ENV === 'production'
            }
          }
        ]
      },
    ]
  }
}
```

业务代码
src/pages/about.ejs
```
<html lang="en">
<head>
  <title>关于我们</title>
</head>

<body style="overflow:hidden;-moz-user-select: none" onselectstart="return false" ondragstart="return false">
  <div>我是about文件</div>
  <% include ../layout/header.ejs %>
  <div>上面的出入的模版</div>
</body>

</html>
```
src/layout/header.ejs
```
<header>
  <div class="logo"></div>
  <button >
    <i></i>首页
  </button>
  <button class="btn-operator btn-go-back">
    <i></i>返回
  </button>
</header>
```

上面就是关键需要修改的几个地方，特别注意 include 引入模版的时候，不要使用引号， 还有include 和路径之间要加空格



**Question**
1. 我们在多页应用中，有的不用模版，有的又需要使用ejs模版，怎么办？

> 只要创建适当的文件类型即可，不需要使用ejs的，依旧使用.html文件类型，需要的，就创建.ejs文件类型

2. 我的多页应用是通过 glob 包统一读取到的，然后循环遍历出来的，怎么区分 ejs与 html？
> 在循环体里面，其实已经知道,再通过 path.parse(文件).ext 通过后缀，就可以区分你的 plugins中的 new HtmlWebpackPlugin 中的template指定的文件后缀
> 最后将filename的后缀改为 .html输出即可

这里是部分片段代码，你可以嵌入在 entry中
比如 
config/entry.js
```
let entry = {}

const glob = require("glob")
let globInstance  = new glob.Glob('!(_)*/!(_)*',{
  cwd: path.resolve(__dirname, "../src/pages"),
  sync: true // 同步查找
})

// 匹配到的文件输出 ['main/main.html', ...]
let pageArr = globInstance.found

pageArr.forEach(page=> {
  let entryName = path.parse(page).name
  entry[entryName] = path.resolve(__dirname, "../src/pages", page)
})

module.exports = {
  entry,
  // 这个数组，可以给 html-webpack-plugin 循环遍历输出
  pageArr
}
```

就这样使用入口文件
config/webpack.config
```
module.exports = {
  entry: require("./entry.js").entry
}
```

config/template.js
```
const path = require("path")

const { pageArr } = require("./entry")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const env = process.env.NODE_ENV

let htmlPlugins = []
pageArr.forEach(page => {

  // 过滤 只要html文件
  if (path.parse(page).ext !== ".html" && path.parse(page).ext !== ".ejs") {
    return
  }

  // page是 'main/main.html'
  let chunksName = path.parse(page).name

  let filename = page.slice(0, page.lastIndexOf(".")) + ".html"

  let singlePage = new HtmlWebpackPlugin({
    filename: filename,
    template: path.resolve(__dirname, "../src/pages/", page),
    inject: true,
    'meta': {
      'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      "Pragma": "no-cache",
      "X-UA-Compatible": "IE=edge,chrome=1"
    },
    minify: {
      // 压缩空白符号
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
      // 使用短的Doctyepe声明
      useShortDoctype: true
    }
  })

  htmlPlugins.push(singlePage)
})

module.exports = htmlPlugins
```
在 webpack.config.js中通过扩展运算符，将 htmlPlugins变成一个一个的数组元素，因为这里导出的 htmlPlugins是一个数组

```
let htmlPlugins = require("./htmlPlugins.js")

module.exports = {
  plugins: [
    ...htmlPlugins,
    其他插件
  ]
}
```













文档参考链接

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [new HtmlWebpackPlugin中的minify配置说明](https://github.com/kangax/html-minifier)