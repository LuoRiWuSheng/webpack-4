// 模拟异步串行瀑布钩子， 上一次回调的值会传递到下一个回调任务中

class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tapAsync (name, task) {
    this.tasks.push(task)
  }

  callAsync (...args) {
    // 拿到end的回调
    let finalCallback = args.pop()
    let index = 0;

    let next = (err, data) => {
      // 拿到每次递归的 回调函数
      let task = this.tasks[index]
      // 递归结束，执行 end的回调
      if (!task || index === this.tasks.length) {
        return finalCallback(data)
      }

      // 如果是第0个，那么它的入参来源是callAsync调用的第一个参数
      if (index === 0) {
        task(...args, next)
      } else {
        // 这里的参数是上一个的返回值
        // next在递归的时候，执行其实就是下面的回调函数的执行 cb()
        task(data, next)
      }

      index++
    }

    next()
  }
}

let hooks = new AsyncSeriesWaterfallHook()

hooks.tapAsync("node", (data, cb) => {
  setTimeout(() => {
    console.log("node", data)
    cb(null, 1)
  }, 1000)
})

hooks.tapAsync("vue", (data, cb) => {
  setTimeout(() => {
    console.log("vue", data)
    cb(null, 2)
  }, 1000)
})

hooks.tapAsync("react", (data, cb) => {
  setTimeout(() => {
    console.log("react", data)
    cb(null, 3)
  }, 1000)
})

hooks.callAsync("张三", (data) => {
  console.log("end---", data)
})