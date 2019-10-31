## ES6 转ES5

### 安装模块

主要就是下面这3个包，然后其他的pollyfii 在通过配置的方式注入
```
npm install babel-loader @babel/core @babel/preset-env --save-dev

或

yarn add babel-loader @babel/core @babel/preset-env --D
```

### 使用

webpack.cofig.js

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        // 不要去转化node_modules下面的包
        exclude: /(node_modules|brower_components)/,
        // 从 src目录下面去转换
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-decorators",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  }
}
```

安装类的装饰器

```
npm install --save-dev @babel/plugin-proposal-decorators
npm install --save-dev @babel/plugin-proposal-class-properties
```
配置类的装饰器，看上面的plugins中， 唯一需要注意的是，proposal-clsss-properties需要在proposal-decorators之后

[babel官网关于修饰器地址](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

bable的插件安装都是  @babel/插件名  这种规则的

index.js 入口文件
```
// es6定义一个类
@di
class Foo {
  constructor(x,y) {
    this.x = x
    this.y = y
  }

  say() {
    console.log(this.x, this.y)
  }
}

let p = new Foo(1,2)

function di(target) {
  console.log("装饰器函数", target)
}
p.say()

```

di是一个装饰器函数

运行前和运行后，放到ie中查看，即可知道是否转换成功


通过添加以下的插件，能够帮我们解析一些高级语法问题，比如 generator

注意下面的开发依赖和生产依赖
```
开发依赖
npm install --save-dev @babel/plugin-transform-runtime

生产依赖
npm install --save @babel/runtime
```
然后，我们在解析转换的时候，需要排除node_module目录，然后去我们的src目录去转换js， 所以需要注意上面的 webpack.config.js中的 exclude和include配置，不然控制台有 warming ，转换插件就会去转换node_module下面的js文件


### js语法校验

```
yarn add eslint-loader -D
```





