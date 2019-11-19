// 处理ttf文件 生成微型ttf，eot, woff文件

const path = require('path')
const Fontmin = require('fontmin');
const rename = require('gulp-rename')
const randomNum = () => {
  let arr = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
  let l = arr.length
  let str = ''
  for (let i = 0; i < 4; i++) {
    let r = Number.parseInt(Math.random() * l)
    let s = arr.substr(r, 1)
    str += s
  }
  return str
}

const dealFont = (query) => {
  const fontMinObj = new Fontmin()
  let ttfPath = path.resolve(__dirname, `./../../fonts/${query.type}.ttf`) // 获取字体
  let random = randomNum() // 生成随机字符串当做hash值
  let renameFont = 'font.ttf' // 重命名字体
  let ppath = `../font`
  if (query.hash) { // 部署到远程服务器需要开启哈希值 否则获取字体会有缓存
    renameFont = `font.${random}.ttf`
    ppath = `../font/${random}`
  }
  const fontmin = fontMinObj.src(ttfPath)
    .use(Fontmin.glyph({ // 转化的核心
      text: query.text,
      hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .use(rename(renameFont)) // 重命名
    .dest(path.resolve(__dirname, ppath)) // 生成到xx目录
    .use(Fontmin.ttf2eot()) // 转化为eot
    .use(Fontmin.ttf2woff()) // 转化为woff

  fontmin.run(function (err, files) {
    if (err) {
      throw err;
    }
    console.log('\n', files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
  });
  return new Promise((resolve, reject) => {
    resolve(random)
  })
}

module.exports = dealFont
