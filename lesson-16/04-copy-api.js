class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap (name, task) {
    this.tasks.push(task)
  }

  call (...args) {
    this.tasks.forEach(task => {
      let res;
      do {
        res = task(...args)
      } while (res !== undefined);
    })
  }
}

let hooks = new SyncLoopHook(["学习"])

let total = 1;

hooks.tap("react", (param) => {
  console.log("react", param)
  return total++ === 3 ? undefined : "继续学"
})

let nodeRepeat = 1
hooks.tap("node", (param) => {
  console.log("node", param)
  return nodeRepeat++ === 2 ? undefined : "继续学"
})

hooks.tap("webpack", (param) => {
  console.log("webpack", param)
})


hooks.call("你好")