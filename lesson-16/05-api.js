// 异步钩子也是分为异步串行钩子（前一个返回值是下一个的入参），异步并行钩子AsyncParallelHook（等待所有的异步事件执行完毕后再执行回调函数）

// 同时发送多个请求
// 演示异步并行钩子

// 注册方法分为 tap注册（同步注册）  tapAsync （异步注册的是回调函数）， tapPromise( 注册的是promise)
// tap注册的是同步的，下面的tapAsync使用tap的话，输出结果会先输出回调的 end，这其实是不对的

// 调用(消息分发)的就分为3中， call(同步)、 callAsync(异步)、 promise

const { AsyncParallelHook } = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(["初始值"])
    }
  }

  tap () {
    let initTime = Date.now();
    //console.log(this.hooks.arch)
    this.hooks.arch.tapAsync("node", (param, cb) => {
      // 一秒以后才会调用回调函数，这里有一个等待的过程
      setTimeout(() => {
        console.log("node----", param, Date.now() - initTime)

        cb()
      }, 1000)
    })

    this.hooks.arch.tapAsync("react", (param, cb) => {
      setTimeout(() => {
        console.log("react", "----", param,Date.now() - initTime)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync("webpack", (param, cb) => {
      setTimeout(() => {
        console.log("webpack----", param,Date.now() - initTime)
        cb()
      }, 1000)
    })
  }

  start (...args) {
    console.log(...args)
    // callAsync 中的回调是没有参数的，也不需要写参数，写了是无效的
    this.hooks.arch.callAsync(["异步钩子"], () => {
      // 这里的回调函数就是异步钩子都执行完成以后，再执行的
      console.log(...args)
      console.log("end")
    })
  }
}

let l = new Lesson()

l.tap()
l.start(["张三"])

// 其中任何一个 cb回调没有执行，那么 end这个回调就不会触发