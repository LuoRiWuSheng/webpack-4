// 模拟异步串行

class AsyncSeriesHook {
  constructor(args) {
    this.params = args
    this.tasks = []
  }

  // 注册监听者
  tapAsync (name, task) {
    this.tasks.push(task)
  }

  // 分发消息
  callAsycn (...args) {
    //console.log(...args)
    // 拿到end 这个回调
    let finalCallback = args.pop()
    let index = 0;
   
    let next = ()=> {
      // 当遍历执行到最后一个回调，就执行 end的回调
      if(this.tasks.length === index) return finalCallback()

      // 拿到当前的回调
      let task = this.tasks[index]
      index++;
      // 这里的 args只剩下参数name, cb被上面的剥离掉了

      // task的执行是在下面的 tapAsync回调
      task(...args, next)
    }

    next()
  }
}

let hooks = new AsyncSeriesHook(["参数"])

hooks.tapAsync("react", (name, cb) => {
  setTimeout(() => {
    console.log("react", name)
    cb()
  }, 1000)
})

hooks.tapAsync("node", (name, cb) => {
  setTimeout(() => {
    console.log("node", name)
    cb()
  }, 1000)
})

hooks.tapAsync("webpack", (name, cb) => {
  setTimeout(() => {
    console.log("webpack", name)
    cb()
  }, 1000)
})

hooks.callAsycn("张三", () => {
  console.log("end")
})