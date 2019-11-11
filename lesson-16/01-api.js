// 学习 tapable库的钩子，02将手动模拟钩子
// 同步钩子 也有同步钩子
const {SyncHook} = require("tapable")

class Lesson {
  constructor() {

    this.hooks = {
      arch: new SyncHook(["参数1"])
    }
  }
  // 使用 tap添加订阅者
  tap() { // 注册监听函数

    this.hooks.arch.tap("随便什么参数", (param1)=> {
      // 这里的参数，是上面的 new SyncHook中传入的
      console.log("第一个", "----", param1)
    })

    // 注册第二个事件
    this.hooks.arch.tap("随便", (param2)=> {
      console.log("注册第二个", "----", param2)
    })
  }
  start(...args) {
 
    // 触发钩子-- 调用call 会触发上面住的中的回调函数，会触发所有的arch注册的事件
    this.hooks.arch.call(...args)
  }
}

// 使用
let l = new Lesson()
// 启动注册--订阅消息的过程
l.tap()

// 调用--发布消息的过程
l.start("战三")
