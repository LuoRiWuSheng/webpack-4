import $ from "jquery"
import axios from "axios/dist/axios.js"
console.log("a 模块")

console.log($("body"))

axios.interceptors.request.use(config=> {
  console.log("a.js中的拦截器")
})

