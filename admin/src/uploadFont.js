// 上传文件
const koaBody = require('koa-body')
// const path = require('path')
const SIZE = 10 // 10M

const uploadConfig = () => {
  return koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    formidable: {
      // uploadDir: UPLOADPATH, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: SIZE * 1024 * 1024 // 文件上传大小
      // onFileBegin: (name, file) => { // 文件上传前的设置
      //   const dir = path.join(__dirname, './../../fonts');
      //   file.path = `${dir}/${file.name}`
      // }
    }
  })
}
module.exports = uploadConfig
