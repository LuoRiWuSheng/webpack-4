class SyncWaterfallHook {
  constructor(list) {
    this.list = list
    this.tasks = []
  }

  tap (name, task) {
    this.tasks.push(task)
  }

  call (...args) {
    // 这个实现的核心在这里，我们调用call 是要拿到第一个的返回值
    // 后面的函数的入参preData拿到的都是前一个函数的返回值
    let [first, ...others] = this.tasks

    let res = first(...args); // 第一个的返回值

    others.reduce((prev, nextCall)=> {
      // 将上一个函数的返回值放到下一个函数中作为入参
      return nextCall(prev)
    }, res)
  }
}

let hook = new SyncWaterfallHook(["参数"])

hook.tap("node", (name)=> {
  console.log("node学习", name)
  return 1
})

hook.tap("react", (preData)=> {
  console.log("react", preData)
  return 1+preData
})

hook.tap("vue", (preData)=> {
  console.log("vue", preData)
})

hook.call(["学习历程"])