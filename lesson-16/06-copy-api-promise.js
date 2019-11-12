// 模拟异步串行 -- promise实现方式

class AsyncSeriesHook {
  constructor(args) {
    this.params = args
    this.tasks = []
  }

  // 注册监听者
  tapPromise (name, task) {
    this.tasks.push(task)
  }

  // 分发消息
  promise (...args) {// 最终是要返回一个promise的
    let [firstPromise, ...others] = this.tasks;
    // firstPromise不执行，就是一个匿名函数，就是 tapPromise的匿名回调
    // 执行之后，返回一个promise
    // firstPromise() 拿到的是一个promise, 作为初始参数， p第一次就是这个初始参数
    return others.reduce((p, nextPromise) => {
      return p.then(() => nextPromise(...args))
    }, firstPromise(...args))
  }
}

let hooks = new AsyncSeriesHook(["参数"])

hooks.tapPromise("react", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("react", name)
      resolve()
    }, 1000)
  })
})

hooks.tapPromise("node", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("node", name)
      resolve()
    }, 1000)
  })
})

hooks.tapPromise("webpack", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("webpack", name)
      resolve()
    }, 1000)
  })
})

hooks.promise("张三").then(() => {
  console.log("end")
}).catch(err => {
  console.debug(err)
})