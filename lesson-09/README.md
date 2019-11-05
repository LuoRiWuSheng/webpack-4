## webpack中打包图片

**场景**
1. 在js中使用图片
2. 在css中使用图片  background: url
3. 在html中直接使用 img


### file-loader

>  会生成一张图片到dist输出目录下，并且将图片的名字返回回来

### html-withimg-plugin

>   解决img标签的图片地址引用问题

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


