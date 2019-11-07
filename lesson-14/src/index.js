// 像这种引入，都是去node_modules下加载的，所以需要npm install 安装
import $ from "jquery"
import "bootstrap/dist/css/bootstrap.min.css"

import "bootstrap";
import moment from "moment"
import "moment/locale/zh-cn.js"
import "moment/locale/es-us.js"

// 演示抽离公共代码
import "./a.js";
import "./b.js";

console.log("首页")

// import * as libs from "./base"
// console.log(libs.sum(1,2))
// console.log(libs)

// // three-shaking是不会对require进来的代码做无用的剔除工作的
// let cLibs = require("./base.js")
// console.log(cLibs.sum(2,3))

// scope-hosting 会对代码进行优化，直接在下面输出6，不会在打包后的代码中定义 a b c d
// let a = 1;
// let b = 2;
// let c = 3;
// let d = a + b + c;
// console.log(d, "-----------")

getCurrentTime()


let changeBtn = document.querySelector("#change-language")
changeBtn.addEventListener("click", () => {
  moment.locale("zh-cn")
  getCurrentTime()
}, false)

function getCurrentTime () {
  let r = moment().format("YYYY-MM-DD HH:mm:SS");
  console.log(r)
  let currentTime = document.querySelector(".current-time")
  currentTime.innerText = r
  document.querySelector(".distance-time").innerText =  moment().startOf('day').fromNow();
}
