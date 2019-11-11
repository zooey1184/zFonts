// 获取目录
const fs = require('fs')
const path = require('path')
const config = require('./../index')
// 运行的项目 baseurl
const dir = config.baseUrl

const root = (p) => {
  return path.resolve(__dirname, `../../${p}`)
}
let arr = fs.readdirSync(root(dir), function (err, files) {
  if (err) {
    console.log(err);
  }
  return files
})

module.exports = arr
