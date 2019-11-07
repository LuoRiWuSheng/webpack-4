import $ from "jquery"
import axios from "axios/dist/axios.js"
console.log("b---- 模块")

console.log($("body"))

axios.interceptors.request.use(config=> {
  console.log("b.js中的拦截器")
})

