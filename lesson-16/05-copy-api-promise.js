class AsyncParallelHook {
  constructor(...args) {

    this.args = [...args]
    this.tasks = []
  }

  tapPromise (name, task) {
    // task是一个个promise
    this.tasks.push(task)
  }

  promise (...args) {
    // 这里返回的其实是3个promise
    let all = this.tasks.map(task=> task(...args))
    //console.log(all)
    return Promise.all(all)
  }
}


let hooks = new AsyncParallelHook(["参数"])

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

hooks.promise(["张三", "李四"]).then(() => {
  console.log("end")
})