import print from './print.js'

var button = document.createElement("button")
button.innerText = "点击";
button.addEventListener("click", print, false)

document.body.appendChild(button)

if(module.hot) {
	module.hot.accept('./print.js', function() {
		console.log("print模块更新")
		print();
	})
}