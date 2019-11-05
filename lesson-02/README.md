### 演示了一下的功能

**webpack版本**

```
"clean-webpack-plugin": "^3.0.0",
"html-webpack-plugin": "^3.2.0",
"webpack": "^4.38.0",
"webpack-cli": "^3.3.6",
"webpack-dev-server": "^3.7.2"
```

- 多出口文件，打包的多出口， 文件名使用hash 去除缓存，显示hash为8位
- 自动清理 dist打包目录
- html模版自动更新插入
- --watch检测文件更改
- --open 编译，直接在浏览器中打开