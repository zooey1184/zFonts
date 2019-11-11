// 获取当前项目
const proList = require('./getDir')
const config = require('./../index')
const { dealArr } = require('./str')
const pro = process.env.pro
const dir = config.baseUrl

const getPro = (item) => {
  if (item) {
    return item
  }
  if (pro) {
    if (pro.match(/\[/)) {
      return dealArr(pro)
    }
    return [pro]
  }
  if (proList.length > 0) {
    return proList[0]
  } else {
    throw new Error(`${dir} 目录下不存在可运行的项目`)
  }
}

module.exports = getPro
