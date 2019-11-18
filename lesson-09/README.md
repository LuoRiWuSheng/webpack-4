## webpack中打包图片

**场景**
1. 在js中使用图片
2. 在css中使用图片  background: url
3. 在html中直接使用 img


### file-loader

>  会生成一张图片到dist输出目录下，并且将图片的名字返回回来

### html-withimg-plugin

>   解决html中img标签的图片地址引用问题
>   这个是不能使用别名的路径加载地址的

> 需要使用 npm 安装包， yarn 安装会提示找不到包的地址

> 使用这个插件，如果html中的img标签被注释掉了 也会被解析的，特别是当img的 src指定的本地地址不存在的情况下，会报错，所以，如果不需要，就直接删掉img

src/a.html
```
<img src="assets/img/1.jpg"/>
```
这种会报错，必须使用相对路径

```
<img src="../../img/1.jpg"/>
```

### html-loader
[html-loader](https://www.webpackjs.com/loaders/html-loader/)
>   解决img标签的图片地址引用问题

**Question**

1. 在js中直接使用图片地址没效果?

src/index.js

```
let img = new Image()
img.src = "./icon.jpg"
document.body.appendChild(img)
```
上面这种方式引入的图片地址，其实只是一个字符串，并不是真正的图片地址，而且也不会被webpack追踪资源，并没有打包

正确如下，需要require进来，才会被webpack追踪，并打包
```
const Icon = require("./icon.jpg')
let img = new Image()
img.src = Icon
console.log(Icon)
document.body.appendChild(img)
```

2. 在 css中使用图片地址，为什么不需要require？

因为在css文件中直接直接使用图片地址，会经过 css-loader 进行解析，其实是图片资源是被追踪到了，并且进行了打包，自然是不需要require

在css使用图片，结合 资源别名（resolve.alias），能够省去大部分的路径

src/assets/css/a.css
```
.box {
  background: url(~assets/img/1.jpg)
}
```
webpack.config.js中配置别名
```
module.exports = {
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/")
    }
  }
}
```

配置了别名以后，在一个css文件或者less文件中引用另一个

src/a.css
```
@import "~assets/css/common.css";
```
也是要加 ~ 符号的

<span style="color:#ff0000">注意</span>，使用别名，前面一定要用 ~ 不然会导致解析出错

[Webpack 中css 如何 import 使用 alias别名 相对路径](https://blog.csdn.net/weixin_34417200/article/details/88839563)

从上面的引用可以知道，如果在使用 vue全家桶开发时，使用别名报错，资源找不到，也是一样的解决思路

3. 在图片文件过小，直接使用url-loader加载，直接转成base64呈现，不会有多余的HTTP请求

```
module.exports = {
  module: {
    rules: [
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // url-loader 可以做一个限制，图片在限制范围内，就变成base64
        use: {
          loader: "url-loader",
          options: {
            // 500k
            limit: 1024*500
          }
        }
      },
    ]
  }
}
```
limit是字节单位

1Byte(字节) =  8bit(位)

1KB = 1024B = 1024 byte

1MB = 1024 KB

比limit小的都会变成base64， 比limit限定的大小大的，都会产生实体文件


