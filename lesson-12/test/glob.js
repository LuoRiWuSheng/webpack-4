const glob = require("glob")

// 回调函数
/**
 * 如果找到匹配参数1 的文件，就返回文件名称，带路径的
 * 没有找到，就返回空数组
 * 
 */

 /*
    目录层次
    / 
      - src
      |  -js
      |  -view
      |    - about.html
      |    - home.html
      - test
      |  - glob.js
  */
var pattern1 = "../src/*/*"
var pattern2 = "../src/view/*"

glob(pattern2,{
  nodir: true
}, function(err, files) {
  if(err) {
    console.log(err)
    return
  }
  console.log(files)
  
})

// 结果
/**
 * pattern1 会得到的结果是 src下面所有的文件
    [ '../src/js/about.js',
  '../src/js/app.js',
  '../src/js/common.js',
  '../src/view/about.html',
  '../src/view/home.html' ]

    pattern2 会得到view目录下面的所有文件
      [ '../src/view/about.html', 
        '../src/view/home.html' ]
 */