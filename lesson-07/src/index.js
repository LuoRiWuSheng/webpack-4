import "core-js";
let f1 = ()=> {
  console.log("箭头函数")
}

f1()
/*
// es6定义一个类
@di
class Foo {
  constructor(x,y) {
    this.x = x
    this.y = y
  }

  say() {
    console.log(this.x, this.y)
  }
}

let p = new Foo(1,2)

function di(target) {
  console.log("装饰器函数", target)
}
p.say()

class Person {

}

// generator函数
function * g() {
  yield 1;
}

console.log(g().next())

// chrome是可以的 ie就不行
console.log("abc".includes("a"))

var a;
a= 222
*/