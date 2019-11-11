class AsyncParallelHook{
  constructor(...args) {
    this.index = 0;
    this.args = [...args]
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    // 这个callAsync 参数中有一个回调函数
    let finalCallback = args.pop() // 通过pop 返回 end这个回调函数
    let index = 0;

    let done = ()=> { // 这个地方比较像 Promise.all  当所有的异步函数执行完毕以后，再执行回调
      index++;
      // done使用箭头函数，就是为了这里的this访问的是 AsyncParallelHook
      if(index === this.tasks.length) {
        // 表示上面一系列函数都执行完毕，现在执行 end回调
        finalCallback()
      }  
    }

    // 让注册的 tapAsync 一系列回调并发执行
    this.tasks.forEach(task=> {
      task(...args, done)
    })
  }
}


let hooks = new AsyncParallelHook(["参数"])

hooks.tapAsync("react", (name, cb)=> {
  setTimeout(()=> {
    console.log("react", name)
    cb()
  }, 1000)
})

hooks.tapAsync("node", (name, cb)=> {
  setTimeout(()=> {
    console.log("node", name)
    cb()
  }, 1000)
})

hooks.tapAsync("webpack", (name, cb)=> {
  setTimeout(()=> {
    console.log("webpack", name)
    cb()
  }, 1000)
})

hooks.callAsync(["张三", "李四"], ()=>{
  console.log("end")
})