const glob = require("glob")

glob("../src/**/*.?(html|js)", (err,files) => {
  console.log(files)
})