
const $ = require("jquery")
var str = "   footer中的    "

$(function() {
    // 去掉前后空格的
    console.log($.trim(str))
})
