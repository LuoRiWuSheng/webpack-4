// 只要 待bail的 api 意思就是，你可以随时终止，不再继续往下执行
const {SyncBailHook} = require("tapable")

class Lesson{
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(["张三"])
    }
  }

  tap() {
    this.hooks.arch.tap("node", (param1)=> {
      console.log("node", "注册第一个")
      // 在这里 reutrn, 将不在执行下面的hook
      // return null 不会执行后面的hook
      // return 这样return,不接任何内容  还是会执行后面的hook
      // return undefined  也会执行后面的hook
      // return "随便什么内容"  会执行后面的hook
      return undefined
    })

    this.hooks.arch.tap("react", (param1)=> {
      console.log("node", "注册第2个")
    })
  }

  start(...args) {
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson()
l.tap()

l.start()
