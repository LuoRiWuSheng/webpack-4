// 获取文件名
const glob = require('glob')
// 多页应用文件名--数组

function getTemplate (reg) {
  let entryList = glob.sync(reg)
  console.log(entryList)
  let t = []
  entryList.forEach(item => {
    t.push({
      name: path.parse(item).name,
      url: item
    })
  })

  return t;
}

//  入口
// getTemplate("./src/**/*.js").forEach(item=> {
//   console.log(51,item)
//   if(item.url) {
//     webpackconfig.entry[item.name] = item.url
//   }
// })

// 模版

// getTemplate("./src/**/*.?(html|js)").forEach(item => {
//   if (path.parse(item.url).ext === ".js") {
//     return
//   }

//   console.log(path.parse(item.url).name)
//   let config = {
//     template: item.url,
//     filename: item.name + "/" + item.name + ".html",
//     title: item.name,
//     chunks: ["common", path.parse(item.url).name],
//     inject: true
//   }

//   webpackconfig.plugins.push(new HtmlWebpackPlugin(config))
// })
