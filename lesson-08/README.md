## webpack中打包第三方模块的问题

> 在我们想使用jquery等包的时候，又不想每次都在代码中引入，webpack可以通过一些方式，将这些公用插件自动打包到bundle中

使用方式
1. 在特意不配置webpack的情况下

```
// 安装到生产依赖
npm install jquery --save

// 直接在 src/index.js中使用， 如下图，都是可以
```
![use-jq.png](./screenshot/use-jq.png)

但是这种使用，jquery是不会挂载到window上的


## loader 分类

- 内联loader， 使用 ! 分割多个loader

安装 expose-loader

```
npm install expose-loader --save-dev
或
yarn add expose-loader -D
```
> expose-loader 暴露全局的loader， 写在具体业务的js中的

src/index.js
```
import $ from "expose-loader?!jquery"
// 上面是将jquery挂载到window上，暴露到全局

import Styles from 'style-loader!css-loader?modules!./styles.css';

// 通过这种方式将 jquery 挂载到window上
// $2就是window.$2 挂载到window上的，$3没有挂载到window上
import $3 from "expose-loader?$2!jquery"
console.log("内联jquery", $3 === window.$2)
console.log($3("body"))
```
通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。
[内联loader-webpack官网](https://www.webpackjs.com/concepts/loaders/#inline)

这种内联loader，也可以在webpack.config.js中配置
webpack.config.js

```
module.expots = {
  module: {
    rules: [
       {
        test: require.resolve("jquery"),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  }
}
```
在 src/index.js中直接使用
```
// 通过在webpack中配置plugin， 使用expose-loader
require("jquery")
console.log($("body"))

```



- pre
> 前面执行的loader
- normal loader  普通loader
- 后置loader


## 在业务中引入包的方式
- CommonJS -- node

```
const a = require("./a.js")
```
- ES6 
```
const a from "./a.js"
```
示例： 
src/index.js
```
// ES6引入的方式
import $ from "jquery";
console.log($("body"))

// CommonJS方式引入 --node的方式
let $$ = require("jquery")
console.log($$("body"))
```