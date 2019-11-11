console.log(1)
require("./moduleA.js")

if(module.hot) {
  module.hot.accept("./moduleA.js", ()=> {
    console.log(arguments)
    console.log("模块A更新了")
    require("./moduleA.js")
  })
}

let btn = document.querySelector("#btn")
btn.addEventListener("click", ()=> {
  // 使用then的方式接收
  // import(/*webpackChunkName: "print"*/ './moduleB').then(module=> {
  //   console.log(module)
  // })

  // 下面是使用 async..await 的方式
  f()
}, false)

async function f() {
  let {default: {name, msg}} = await import(/*webpackChunkName: "print"*/ './moduleB')
  console.log(name, msg)
}

