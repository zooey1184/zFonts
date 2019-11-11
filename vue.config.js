const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ENV = process.env.NODE_ENV || 'production'
const path = require('path')
const { entry, tip } = require('./cli-config/vue.config/entry')
const { publicPath, outputDir } = require('./cli-config/vue.config/output')

tip()
module.exports = {
  publicPath: publicPath(),
  pages: entry(),
  productionSourceMap: false,
  configureWebpack: config => {
    if ((ENV === 'production')) {
      config.plugins.push(new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')]
      }))
      // if (tools.some(POBJ.header, 'cdn')) {
      //   // 满足需要两个条件 一个是html里面有vue cdn文件  一个是开始 @cdn 修饰符
      //   config.externals = {
      //     'vue': 'Vue'
      //   }
      // }
    }
  },
  devServer: {
    proxy: 'http://localhost:4321'
  },
  outputDir: outputDir()
}
