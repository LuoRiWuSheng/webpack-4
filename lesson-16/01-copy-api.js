// 实现 tapable 的钩子--发布订阅者模式

class SyncHook {
  constructor() {
    // 存储所有订阅者
    this.tasks = []
  }
  
  tap(name, task) {
    // task 是一个回调函数
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(task => task(...args))
  }
}

let l = new SyncHook(["张三"])

// 注册 订阅者
l.tap("react", (name)=> {
  console.log("react", name)
})

l.tap("node", (name)=> {
  console.log("noed", name)
})

// 发布信息
l.call("李四")