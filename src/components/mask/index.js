/**
 * @author: zooey
 * Date: 18/07/09
 * desc: 插件-mark && alert && 其他
 * use: this.$mark.show({obj}) || this.$mark.show('string') && this.$mark.hide()
 */
import Mark from './src/mark.vue'
import plugin from '../mixins/plugin'
const mark = plugin(Mark, {
  initOptions: {
    styleContent: {
      top: '35%'
    }
  },
  name: 'mask',
  showName: 'showToast',
  fullClassName: 'mark--full'
})

export default mark
