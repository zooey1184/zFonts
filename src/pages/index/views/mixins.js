/* eslint-disable */
import axios from './../api/http'
import env from '@/common/js/global/env'
import getFont from './getText'
import url from '@/common/js/global/url'

export default {
  data: () => ({
    fontName: '',
    originText: '',
    isChange: false,
    fontList: [],
    font: {},
    loadingTxt: '上传字体',
    isLoadingFile: false,
    hash: ''
  }),
  mixins: [getFont],
  methods: {
    getFontSelect () {
      axios.get('/zFont/getFontList').then(res => {
        let data = res.data
        let arr = []
        for (let i in data) {
          arr.push({
            text: i,
            value: data[i]
          })
        }
        this.fontList = arr
      })
    },
    getText () {
      this.dealFontText((e) => {
        this.hash = e.data.hash || ''
      })
    },
    getFont (value) {
      let f = this.fontList
      let a = f.find(item => {
        return item.text === value
      })
      return a
    },
    downloadFileAndTip (download) {
      if (env().isDev()) {
        this.$mask.show({
          title: '本地开发',
          msg: `<div style="text-align: left">
            <p>源字体在:</p>
            <p style="color: #d9534f; font-weight: 700; line-height: 30px; font-size: 14px">${download}</p>
            <p>自行下载</p>
          </div>`
        })
      } else {
        window.open(download, '_blank')
      }
    },
    downloadMiniText () {
      if (this.fontName) {
        this.font = this.getFont(this.fontName)
        axios.post('/zFont/download', {
          hash: this.hash
        }).then(res => {
          let download = res.data.data.replace(/\\/g, '/')
          this.downloadFileAndTip(download)
        })
      } else {
        this.$toast.show('请选择字体')
      }
    },
    downloadOriginText () {
      if (this.fontName) {
        this.font = this.getFont(this.fontName)
        let download = this.font.value.replace(/\\/g, '/')
        this.downloadFileAndTip(download)
      } else {
        this.$toast.show('请选择字体')
      }
    },
    deleteOriginFont () {
      if (this.fontName) {
        this.font = this.getFont(this.fontName)
        // 删除源font
        let fontPath = env().isDev() ? this.font.value : '/jianbing/base' + this.font.value
        axios.post('/zFont/delete', {
          path: fontPath,
          token: window.localStorage.getItem('token')
        }).then(res => {
          if (res.data.res === 'success' || res.data.path) {
            this.$toast.show('delete ok')
            setTimeout(() => {
              this.getFontSelect()
              this.fontName = ''
            }, 100)
          } else {
            this.$toast.show(res.data.msg)
          }
        })
      } else {
        this.$toast.show('请选择字体')
      }
    },
    uploadFile (e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      if (window.localStorage.getItem('token')) {
        formData.append('token', window.localStorage.getItem('token'))
      }
      if (e.target.files[0].name.match(/.ttf/g)) {
        this.isLoadingFile = true
        this.loadingTxt = '上传ing...'
        axios({
          url: '/zFont/upload',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(res => {
          this.loadingTxt = '上传字体'
          if (res.data.res === 'success') {
            this.getFontSelect()
            this.$toast.show('ok')
            this.isLoadingFile = false
          } else {
            this.$toast.show(res.data.msg)
          }
        })
      } else {
        this.$toast.show('需要上传 .ttf 格式文件')
      }
    },
    login() {
      let query = url.getUrlData()
      if (query.account) {
        axios({
          url: '/zFont/login',
          method: 'POST',
          data: query
        }).then(res => {
          if (res.data.res === 'success') {
            window.localStorage.setItem('token', res.data.data)
          } else {
            window.localStorage.removeItem('token')
          }
        })
      }
    }
  },
  created () {
    this.getFontSelect()
    this.login()
  }
}
