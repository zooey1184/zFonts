const config = require('./../template.json')
const chalk = require('chalk')

if (!config.usePro || (config.usePro && !config.usePro[config.usePro.toString()])) {
  console.log(chalk.red('未检测到您本地设置，可以使用 npm run cli:build 运行打包'));
  throw new Error('you can use cli: npm run cli:build')
}
