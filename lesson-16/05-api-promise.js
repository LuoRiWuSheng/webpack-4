// 使用 Promise改写
const { AsyncParallelHook } = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(["初始值"])
    }
  }

  tap () {
    let initTime = Date.now();

    this.hooks.arch.tapPromise("node", (param) => {
      // 一秒以后才会调用回调函数，这里有一个等待的过程
      return new Promise((resolve, reject)=> {
        setTimeout(() => {
          console.log("node----", param, Date.now() - initTime)
  
          resolve()
        }, 1000)
      })
    })

    this.hooks.arch.tapPromise("react", (param) => {
      return new Promise((resolve, reject)=> {
        setTimeout(() => {
          console.log("react", "----", param,Date.now() - initTime)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise("webpack", (param) => {
      return new Promise((resolve, reject)=> {
        setTimeout(() => {
          console.log("webpack----", param,Date.now() - initTime)
          resolve()
        }, 1000)
      })
    })
  }

  start (...args) {
    console.log("44行",...args)
    
    // 分发消息
    this.hooks.arch.promise(["异步钩子"]).then(()=> {
      console.log("end")
    })
  }
}

let l = new Lesson()

l.tap()
l.start(["张三"])

// 其中任何一个 cb回调没有执行，那么 end这个回调就不会触发