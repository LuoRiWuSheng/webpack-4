const HtmlWebpackPlugin = require("html-webpack-plugin")

const HtmlTemplateList = [
  new HtmlWebpackPlugin({
    template: "src/one/userNotice.html",
    filename: "view/index.html",
    inject: true,
    chunks: ["userNotice"],
    title: "用户须知"
  })
  
]

module.exports = HtmlTemplateList