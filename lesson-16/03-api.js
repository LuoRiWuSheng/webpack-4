// 同步钩子
// 前一个订阅者的返回值可以传递给下一个订阅者使用

const {SyncWaterfallHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(["瀑布流"])
    }
  }
  tap() {
    this.hooks.arch.tap("node", (param1)=> {
      console.log("第一个订阅者", param1)
      return "给第二个使用的数据"
    })
    this.hooks.arch.tap("react", param1=> {
      console.log("第2个订阅者", param1)
      // 这里的 param1 是上面那个tap传递下来的数据 return 的 ，像瀑布一样
      console.log(param1)

    })
  }
  start(...args) {
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson()

l.tap()
l.start(["战三"])