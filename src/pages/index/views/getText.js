import axios from './../api/http'
import env from '@/common/js/global/env'

export default {
  methods: {
    productDelectFont (res) {
      if (res.data.res === 'success') {
        this.font = this.getFont(this.fontName)
        if (sessionStorage.getItem('ttf')) {
          axios.post('/zFont/delete', {
            path: [sessionStorage.getItem('ttf'), sessionStorage.getItem('eot'), sessionStorage.getItem('woff')]
          }).then(d => {
            let t = sessionStorage.getItem('ttf').split('/')
            t.pop()
            let path = t.join('/')
            axios.post('/zFont/deleteDir', {
              path: path
            }).then(rr => {
              this.$toast.show('已删除旧字体')
            })
            window.sessionStorage.setItem('ttf', res.data.data.url.ttf)
            window.sessionStorage.setItem('eot', res.data.data.url.eot)
            window.sessionStorage.setItem('woff', res.data.data.url.woff)
          })
        }
        setTimeout(() => {
          this.isChange = true
          // 生成font资源的地址
          this.getFontFace('webFont', res.data.data.url.ttf.replace('/jianbing/base', 'https://uat.51bmsh.com'))
        }, 350)
      }
    },
    dealFontText (callback) {
      if (this.originText.trim() !== '') {
        if (this.fontName) {
          this.isChange = false
          this.font = this.getFont(this.fontName)
          axios.post('/zFont/dealText', {
            text: this.originText,
            type: this.font.text,
            hash: !env().isDev()
          }).then(res => {
            // 前端后端本地开发使用本地的服务器情况 font资源是生成在本地，不需要hash,故而不需要清理缓存
            if (!env().isDev()) {
              this.productDelectFont(res)
            }
            if (callback && typeof callback === 'function') {
              callback(res.data)
            }
            this.getFontFace('webFont')
          })
        } else {
          this.$toast.show('请选择字体')
        }
      } else {
        this.$toast.show('请输入文案')
      }
    },
    getFontFace (font, src) {
      let a = this.$refs.fontContent
      a.style['font-family'] = font
      if (src) {
        axios({
          url: src,
          method: 'GET',
          responseType: 'blob'
        }).then(res => {
          this.blobToDataURI(res.data, (e) => {
            let a = e.replace('application/octet-stream', 'font/ttf')
            this.addCSS(`@font-face {
            font-family: 'webFont';
            src: url('${a}') format('truetype');
            }
          `)
          })
        })
      }
    },
    // 转化base64
    blobToDataURI (blob, callback) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
        callback(e.target.result);
      }
    },
    addCSS (cssText) {
      let style = document.createElement('style')
      let head = document.head || document.getElementsByTagName('head')[0];
      style.type = 'text/css'; // 兼容ie
      if (style.styleSheet) { // IE
        var func = function () {
          try {
            style.styleSheet.cssText = cssText;
          } catch (e) {
            console.log(e);
          }
        }
        // 如果当前styleSheet还不能用，则放到异步中则行
        if (style.styleSheet.disabled) {
          setTimeout(func, 10);
        } else {
          func();
        }
      } else { // w3c
        var textNode = document.createTextNode(cssText);
        style.appendChild(textNode);
      }
      try {
        // 删除旧节点 新增新节点
        let s = document.style || document.getElementsByTagName('style')
        if (s && s.length > 0) {
          head.removeChild(s[s.length - 1])
        }
        setTimeout(() => {
          head.appendChild(style);
        }, 10)
      } catch (e) {
        head.appendChild(style);
      }
    }
  }
}
