const Router = require('koa-router')
const router = new Router()
const compressing = require('compressing');
const fontList = require('./getFontList')
const dealFont = require('./getFontText')
const path = require('path')
const proName = '/zFont'
const fs = require('fs')
const jwt = require('jsonwebtoken');
const skey = 'ORRdSRXnUI4XrFlCxEadFjv_X25xk_ks949JCofk'
const whiteList = {
  admin: 'admin123'
}

// 获取可支持的下拉字体列表
const getFontList = () => {
  router.get(`${proName}/getFontList`, async (ctx, next) => {
    ctx.body = fontList()
    await next()
  })
}

// 获取处理后的文案
const dealText = () => {
  router.post(`${proName}/dealText`, async (ctx, next) => {
    let query = ctx.body
    dealFont(query).then(res => {
      let rand = query.hash ? `.${res}` : ''
      let downloadUrl = query.hash ? path.resolve(__dirname, `./../font/${res}`) : path.resolve(__dirname, `./../font`)
      ctx.body = {
        res: 'success',
        data: {
          url: {
            ttf: `${downloadUrl}/font${rand}.ttf`,
            eot: `${downloadUrl}/font${rand}.eot`,
            woff: `${downloadUrl}/font${rand}.woff`
          },
          hash: res
        }
      }
    })
    await next()
  })
}

// 获取下载处理后的ttf压缩文件地址
const downLoad = () => {
  router.post(`${proName}/download`, async (ctx, next) => {
    let downloadUrl = path.resolve(__dirname, `./../example.zip`)
    let query = ctx.body
    let durl = `./../font`
    if (query.hash) {
      durl = `./../font/${query.hash}`
    }
    await compressing.zip.compressDir(path.resolve(__dirname, durl), path.resolve(__dirname, '../example.zip'))
      .then(() => {
        ctx.body = {
          res: 'success',
          data: downloadUrl
        }
      })
      .catch(err => {
        console.error(err);
      });
    await next()
  })
}

// 上传文件
const upload = () => {
  router.post(`${proName}/upload`, async (ctx, next) => {
    let name = ctx.request.files.file.name
    let query = ctx.body

    if (query.token) {
      jwt.verify(query.token, skey, (err, res) => {
        if (err) {
          console.log(err);
        }
        if (whiteList[res.account] === res.pwd) {
          let uploadUrl = path.join(__dirname, './../../fonts', name)
          const reader = fs.createReadStream(ctx.request.files.file.path);
          // 创建可写流
          const upStream = fs.createWriteStream(uploadUrl);
          // 可读流通过管道写入可写流
          reader.pipe(upStream);
          ctx.body = {
            res: 'success',
            data: uploadUrl
          }
        } else {
          ctx.body = {
            msg: '登录账号非白名单',
            res: 'fail'
          }
        }
      })
    } else {
      ctx.body = {
        msg: '你当前权限不够',
        res: 'fail'
      }
    }
    await next()
  })
}

const deleteDir = () => {
  router.post(`${proName}/deleteDir`, async (ctx, next) => {
    let path = ctx.body.path
    fs.rmdir(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        ctx.body = {
          res: 'success',
          data: ''
        }
      }
    });

    await next()
  })
}

const deleteFont = () => {
  router.post(`${proName}/delete`, async (ctx, next) => {
    let path = ctx.body.path
    let query = ctx.body
    let arr = []
    if (typeof path === 'string') {
      arr = [path]
    } else if (path instanceof Array) {
      arr = [...path]
    }

    if (query.token && typeof path === 'string') {
      jwt.verify(query.token, skey, (err, res) => {
        if (err) {
          console.log(err);
        }
        if (whiteList[res.account] === res.pwd) {
          fs.unlink(path, (err) => {
            if (err) {
              console.log(err);
            }
            ctx.body = {
              res: 'success'
            }
          })
        } else {
          ctx.body = {
            msg: '登录账号非白名单',
            res: 'fail'
          }
        }
      })
    } else if (path instanceof Array) {
      for (let i = 0; i < arr.length; i++) {
        fs.unlink(arr[i], (err) => {
          if (err) {
            console.log(err);
          }
        })
        if (i === arr.length - 1) {
          ctx.body = {
            res: 'success'
          }
        }
      }
    } else {
      ctx.body = {
        msg: '你当前权限不够',
        res: 'fail'
      }
    }
    await next()
  })
}

const login = () => {
  router.post(`${proName}/login`, async (ctx, next) => {
    let query = ctx.body
    if (query.account) {
      let { account, pwd } = query
      if (whiteList[account] && whiteList[account] === pwd) {
        let token = jwt.sign({ account: account, pwd: pwd }, skey);
        ctx.body = {
          res: 'success',
          data: token
        }
      }
    }
    await next()
  })
}

module.exports = {
  router,
  getFontList,
  dealText,
  downLoad,
  upload,
  deleteFont,
  login,
  deleteDir
}
