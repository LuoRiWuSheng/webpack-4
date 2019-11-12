// 异步串行瀑布钩子函数
// 钩子是异步的， 上一步返回的值是下一个回调的入参

const {AsyncSeriesWaterfallHook} = require("tapable")

class Lesson{
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(["初始化参数"])
    }
  }

  tapAsync() {
    this.hooks.arch.tapAsync("node", (data, cb)=> {
      setTimeout(()=> {
        // 接收到 分发着的参数信息
        console.log("node", data)
        cb(undefined, 1)
      }, 1000)
    })

    this.hooks.arch.tapAsync("webpack", (data, cb)=> {
      setTimeout(()=> {
        console.log("webpack", data)
        cb(null, 2)
      }, 1000)
    })

    this.hooks.arch.tapAsync("vue", (data, cb)=> {
      setTimeout(()=> {
        console.log("vue", data)
        cb("", 3)
      }, 1000)
    })

    this.hooks.arch.tapAsync("react", (data, cb)=> {
      setTimeout(()=> {
        // 这里的 data来源于上面的 cb的第二个参数
        console.log("react", data)
        cb(4)
      }, 1000)
    })
  }

  start() {
    this.hooks.arch.callAsync("张三", (data)=> {
      console.log("end", data)
    })
  }
}

let l = new Lesson()
l.tapAsync()

l.start()

// 如果上面的 tapAsync 的callback的第一个参数传入的是 "error"
// 在执行完 "error"这个回调后，下一个，直接跳到 end 不管 error到 end中间还有多少个没有走完
// 上面的 cb 一定要传一个参数，才会将下面的一系列的task都执行