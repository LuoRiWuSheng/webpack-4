// ES6引入的方式
// import $ from "jquery";
// console.log($("body"))

// // CommonJS方式引入 --node的方式
// let $$ = require("jquery")

// console.log($$("body"))
// console.log(window.$) // undefined

// 通过这种方式将 jquery 挂载到window上
// $2就是window.$2 挂载到window上的，$3没有挂载到window上
// import $3 from "expose-loader?$2!jquery"
// console.log("内联jquery", $3 === window.$2)
// console.log($3("body"))


// 通过在webpack中配置plugin， 使用expose-loader
// require("jquery")
// console.log($("body"))

// 上面是通过 expost-loader 引入第三方包，下面是通过 new webpack.ProvidePlugin()自动注入

/*========================================*/
console.log($)
console.log(window.$) // undefined


