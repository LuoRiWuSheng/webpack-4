// 异步串行

// 注册使用 tapAsync
// 分发消息使用 callAsync
// 异步，通过 callback传递
// 只要有一个 callback没执行，end回调就不会触发

let {AsyncSeriesHook} = require("tapable")
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(["初始值"])
    }
  }

  tapAsync() {
    this.hooks.arch.tapAsync("react", (data, cb)=> {
      setTimeout(()=> {
        console.log("react", data)
        cb()
      }, 1000)
    })

    this.hooks.arch.tapAsync("node", (data, cb)=> {
      setTimeout(()=> {
        console.log("node", data)
        cb()
      }, 1000)
    })

    this.hooks.arch.tapAsync("webpack", (data, cb)=> {
      setTimeout(()=> {
        console.log("webpack", data)
        cb()
      }, 1000)
    })
  }

  start() {
    this.hooks.arch.callAsync("start", ()=> {
      console.log("end")
    })
  }
}

let l = new Lesson()

l.tapAsync()

l.start()