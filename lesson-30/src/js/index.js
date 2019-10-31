require("../css/index.css")

window.onload = ()=> {
    console.log("加载完毕")
    createEle()
}

function createEle(parent) {
    let d = document.createElement("div")
    d.innerText = "我是动态创建的"

    if(parent) {
        parent.append(d)
        
        return
    }

    document.body.append(d)

}