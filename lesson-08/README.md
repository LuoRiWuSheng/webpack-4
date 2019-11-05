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

2. 使用 expose-loader 来加载， 下面的内联loader 详细从配置到使用

> 上面2种方式，都需要手动去引入第三方模块，没有自动注入到全局，依旧繁琐，每一个业务的js逻辑，第一行都要将我们的依赖包手动 require或者import引入。

3. 使用webpack插件解决包的全局暴露问题 -- 一次注入到每个模块中，可直接使用。

- 使用 new webpack.ProvidePlugin() 注入
> 这种方式的注入，并不会将第三方包例如 jquery挂载到window上，是可以直接使用$，但是window.$会是undefined
- 如果我们在所有模块都注入了第三方包，但是又引入了 在线CDN，但是为了模块化考虑，又使用require的方式引入，webpack就会再打包一次，重复打包，那么我们的bundle提及就会变大，具体使用详情，看下面的 externals


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

---
## provide-plugin

[provide-plugin- webpack官网](https://webpack.js.org/plugins/provide-plugin/#root)

- provide-plugin查找包的路径从当前目录下和node_modules中查询
- 可以指定包的完整路径，不指定路径，就会去node_modules下找

webpack.config.js
```
const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: {...},
  plugins: [
    // 传入一个对象
    new webpack.ProvidePlugin({
      // 从指定的src路径去加载jquery包
      $: path.resolve(__dirname, "src/plugin/jquery.min.js"),
      // 从node_modules中加载，前提是 npm install jquery --save
      jQuery: "jquery",
      // 上面2种方式只是暴露了占位符$和jQuery到全局，并没有挂载到window上面, 下面就挂载到全局
      "window.$": "jquery"
    })
  ]
}
```

**Question**
1. 使用了暴露全局的ProvidePlugin， 但是某一个业务中并未使用它，也没有使用上面的占位符，一个业务中，从始至终都没有用jquery，那么，这个bundle会不会变小

>  没有使用，就不会动态注入，bundle的提及自然变小

webpack.config.js配置
![provide-plugin.png](./screenshot/provide-plugin.png)
下面是network对比图
在src/index.js中使用了$符号(占位符)  bundle大小是 650k

![use-$.png](./screenshot/use-$.png)

没有使用的 -- 大小375k
![no-use-jquery.png](./screenshot/no-use-jquery.png)

通过对比图，发现，ProvidePlugin是动态注入的，没有在业务中使用，就不会打包进去


2. 使用了在线CDN库，但是又使用require的方式引入，导致打包的js体积变大，如何避免？ 
> 在使用了线上CDN库以后，比如jquery,Vue 这些都会挂载到window下面，单纯的使用CDN是不会被webpack打包处理的， 但是，又希望模块化的方式使用，使用require引入了， 就会被打包进bundle，导致体积增大

[externals-webpack官网](https://www.webpackjs.com/configuration/externals/)

src/index.html
```
...其他code
// 引入线上CDN
<script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.js"></script>
```

src/index.js

```
// 然后又希望模块化，使用require导入
const $ = require("jquery")
```
webpack.config.js中的ProvidePlugin继续保留

像上面这种形式， 就会再次打包，导致包体积变大

使用externals 配置，告知webpack不要重复打包

webpack.config.js

```
module.exports = {
  entry: {...},
  output: {...},
  plugins: [

  ],
  externals: {
    jquery: "jquery"
  },
}
```
注意externals配置项是和output等平级配置的, 配置完 externals，再对比bundle的大小，发现少了一半体积

---

## 小结

上面详细介绍了几种引入第三方模块的方式

1. expose-loader 挂载到window上
2. new webpack.ProvidePlugin() 给每一个打包的文件提供占位符
3. 引入CND 不打包



