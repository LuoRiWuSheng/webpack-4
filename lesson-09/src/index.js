import "./a.css";

import Icon from "./icon.jpg"
// 在js中使用图片

let img = new Image()
console.log("图片地址",Icon)
// 这里指定图片，其实并不是图片，是一个字符串，没有被webpack作为资源进行追踪打包
//img.src = "./icon.jpg"

img.src = Icon
document.body.appendChild(img)
