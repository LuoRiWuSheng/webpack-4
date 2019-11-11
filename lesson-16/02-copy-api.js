class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    
    let res = null;
    let index = 0;

    do {
      res = this.tasks[index](...args)
      index++
    } while (res === undefined && index < this.tasks.length);
  }
}

let sy = new SyncBailHook()
sy.tap("node", ()=> {
  console.log("做第一件事")
  return null
})
sy.tap("react", ()=> {
  console.log("做第二件事")
})

sy.call("麻子")