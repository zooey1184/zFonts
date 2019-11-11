const config = require('./../template.json')
const chalk = require('chalk')
const configRes = require('./../index')

const pro = config.usePro

const entry = () => {
  if (pro.length > 0) {
    let obj = {}
    for (let i of pro) {
      obj[i] = {
        entry: `./${configRes.baseUrl}/${i}/main.js`,
        template: `./${configRes.baseUrl}/${i}/index.html`,
        filename: pro.length > 1 ? `${i}.html` : 'index.html'
      }
    }
    return obj
  } else {
    throw new Error('请设置项目')
  }
}
const tip = () => {
  for (let i of pro) {
    console.log(chalk.green(`启动项目：${i}`))
  }
}
module.exports = {
  entry,
  tip
}
