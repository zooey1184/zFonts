// 获取fonts目录下的ttf文件

const fs = require('fs')
const path = require('path')
const ORIGINFONT = path.join(__dirname, `./../../fonts`)

const getList = () => {
  let d = fs.readdirSync(ORIGINFONT)
  let obj = {}
  d.forEach(item => {
    let k = item.replace('.ttf', '')
    obj[k] = `${ORIGINFONT}/${item}`
  })
  return obj
}

module.exports = getList
