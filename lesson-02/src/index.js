import print from "./print.js"

const button = document.createElement('button')
button.innerText = "点击";

button.addEventListener("click", print, false)

document.body.appendChild(button)