## devtool

区别：

- source-map
  源码映射： 增加映射文件, 可以帮我们调试源代码，会单独生成一个sourceMpa文件，出错会标识报错的列和行
  
  在控制台，打包的日志中，可以看到 XX.js.map 文件

  优点：  大而全
- eval-source-map
  不会产生单独的文件，可以显示行和列
- inline-source-map
- cheap-source-map
  不会产生列，但是是一个单独的映射文件，产生后，可以保留起来
- cheap-module-eval-source-map
  不会产生map文件，但是会集成在打包后的文件中，不会产生列


---

### watch 实时打包

[watch-webpack官网](https://www.webpackjs.com/configuration/watch/)

webpack开启watch 选项， 如果每次修改文件，都要npm run build略显繁琐，就开始 watch 监控

webpack.config.js
```
module.exports = {
  entry: "",
  output: {},
  .... 其他配置
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000, // 1秒钟
    ignored: "/node_modules/",
    poll: 1000
  }
}
```

**watchOptions**

- aggregateTimeout (毫秒， 默认300毫秒)
> 在你重新构建的，打包的时候，增加多少的延迟再去打包构建，会有一个等待时间，这个时间就是我们指定的，然后在这段时间内做的任何文件更改，都会在这个指定时间 1000（1秒钟）以后，将更改打包到构建结果中
>
> 其实就是防抖

- ignored 忽略对哪些 【文件夹】的监控
> 我们是不希望去监控 node_modules的 

- poll 
> 多久轮询检查一次文件的变动，poll单位是毫秒。poll: 2000 意思是，2秒去轮询查看一次，文件是否有变动，有则重新构建； 这个时间越小，则更改以后构建的文件真实性就越高，但同时也比较耗CPU，因为总在轮询

## 给每个输出文件加上版权说明
>  通过 BannerPlugin 可以给每个输出的bundle加上特定的版权说明，BannerPlugin是webpack内置插件，不需要单独安装

webpack.config.js
```
const webpack = require("webpack")

module.exports = {
  plugins: [
    new webpack.BannerPlugin("2019-11-06 create")
  ]
}
```

会在打包以后输出的文件的第一行添加上版权说明

## webpack在开发环境跨域问题
> 通过webpack-dev-server 可以起一个本地服务，开发阶段难免存在跨域，怎么解决这个问题？ 通过webpack-dev-server 代理的方式解决

```
yarn add webpack-dev-server -D
```

webpack.config.js
```
module.exports = {
  entry: {...},
  output: {...},
  devServer: {
    hot: true,
    port: 3000,
    proxy: { // 代理
      "/api": {
        target: "http://192.168.2.5:8002",
        changeOrigin: true,
        pathRewrite: {"^/api" : ""},
        logLevel: "debug",
        headers: {
          Cookie: ""
        }
      }
    },
  }
}
```

我们自己的IP比如是 192.168.2.4，后台接口是 http://192.168.2.5:8002/user/list

我们在devServer 中通过统一的配置拦截，也就是都加上 api 只要是 http://192.168.2.5/api/  所有的，都会被代理，然后通过target 配置的地址，配置成和服务端一样的地址，就实现了跨域访问

最后的项目如果不要api这个东西，通过 PathRewrite重写成空，就可以

访问接口时访问

```
$.ajax({
  url: "/api/user/list",
  type: "POST"
  ....其他逻辑
})
```
这样就访问到服务端的接口, 其实这个ajax访问的完整地址是 http://192.168.2.4/api/user/list

### 在webpack的devServer中不需要跨域，单纯的Mock数据
> 如果后台没有写好，那么前端可以通过Mock数据来写业务逻辑，可以通过webpack统一拦截，使用Mock

webpack.config.js
```
module.exports = {
  entry: {...},
  output: {...},
  devServer: {
    before(app) {
      // 这里的 app是 express实例对象
      // before 拦截 http://localhost/students/list 请求
      app.get("/students/list", (req, res) {
        res.json([{name: "张三", age: 15}, {name: "李四", age: 16}])
      })
    },
    hot: true, // 启动热加载
    proxy: {
      "/api": {
        target: "http://192.168.2.5:8002",
        pathRewrite: {"^/api", ""}
      }
    }
  }
}
```

webpack-dev-server是用node 的express起的本地服务，所以，在before中是可以获取到express的实例对象，自然拥有对于接口响应的能力

express中写的接口 
```
const express = require("express")
const app = express()

app.get("/students/list", (req, res)=> {
  res.json([{name: "张三", age: 15}, {name: "李四", age: 16}])
})
```

express写的真实的后台接口和 devServer中before拦截的接口，一模一样，只是这里的Mock只关心有数据产出，不像真实的后台接口那样，有各种校验，细化到具体的业务。

有了before，那么，前端接口可以直接使用，并不需要被代理转发

```
// 这个接口，不会到后台，只到before这一层被拦截，返回Mock的数据
$.ajax({
  url: "/students/list",
  type: "GET"
})

// 这个接口进 proxy 代理，会到后台
$.ajax({
  url: "/api/user/list",
  type: "POST"
})

```
有了上面两种形式，不管接口是否存在跨域，都可以使用

### 将webpack放在express中作为中间件，启动服务，避免跨域
> 上面的所有形式是，前后端分离，前端代码是一个服务，后台接口是另一个服务，如果前后端都在一个服务，就不存在跨域问题了

> 通过 webpack-dev-middleware中间件，将整个代码装载到express中，就避免了跨域问题，前端代码也不用修改，需要修改的就是，启动开发环境的方式，我们不再去启动webpack-dev-server 而是改为启动node的 express服务

```
yarn add express webpack-dev-middleware -D
```
创建一个express服务 **server.js**

```
const express = require("express")
const app = express()
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")

const config = require("./webpack.config.js")
// webpack编译后的结果
const compiler  = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))


app.listen(3000, ()=> {
  console.log("监听 3000 端口")
})
```

在output中添加 publicPath属性，确保express能够以 publicPath 作为项目的根目录

**webpack.config.js**
```
module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  }
}
```

在**package.json**中添加启动入口

```
"scripts": {
  "dev": "node server.js"
}
```

至于server.js后台接口在开发时的频发变动，那就是需要借助其他插件去实现自动重启等等，比如 supervisor 

上面的这种，其实是将整个代码都装载进express，和单纯的代码放在express指定的静态目录不同的是，代码经历了打包处理，压缩，分离， 混淆等操作

现在前端服务和后台接口是在同一个服务，就不存在跨域了

**目录结构**
```
-/
|  — src
|  |  —— img
|  |  —— js
|  |  —— css
|  — webpack.config.js
|  — server.js
|  — package.json
```









