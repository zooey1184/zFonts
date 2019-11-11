const config = require('./../template.json')
const runEnv = process.env.runEnv

const pro = config.usePro
const proObj = config[pro.toString()]
const detail = proObj[proObj.useEnv]

const publicPath = () => {
  if (runEnv === 'local') {
    return '/'
  } else {
    return detail.baseUrl ? detail.baseUrl : './'
  }
}

const outputDir = () => {
  if (detail.baseUrl && detail.baseUrl.match(/^(http:|https:)?\/\/.*$/)) {
    return `dist/${pro}`
  } else {
    return 'dist'
  }
}

module.exports = {
  publicPath,
  outputDir
}
