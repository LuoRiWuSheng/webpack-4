// 同步钩子，只要返回值不是 undefined 就循环调用
const { SyncLoopHook } = require("tapable")

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(["读书"])
    }
  }

  tap () {
    this.hooks.arch.tap("node", () => {
      console.log("学习node")
      return this.index++ === 3 ? undefined : "继续学";
    })
    this.hooks.arch.tap("react", () => {
      console.log("react")
      return undefined
    })
    this.hooks.arch.tap("webpack", () => {
      console.log("wabpack")
      return undefined
    })
  }

  start (...args) {
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson()

l.tap()

l.start()