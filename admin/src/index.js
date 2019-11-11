// 后台入口文件

const Koa = require('koa');
const chalk = require('chalk')
const bodyparser = require('koa-bodyparser')
const {
  router,
  getFontList,
  dealText,
  downLoad,
  upload,
  deleteFont,
  login,
  deleteDir
} = require('./router')
const uploadConfig = require('./uploadFont')
const app = new Koa()
const PORT = 4321

app.use(uploadConfig())
app.use(bodyparser())
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next()
});

login()

getFontList()
dealText()
downLoad()
upload()
deleteFont()
deleteDir()

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(chalk.yellow(`listen at 127.0.0.1:${PORT}`));
});
