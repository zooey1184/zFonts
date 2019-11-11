/**
 * 判断环境的函数类
 */
export default function (kaifa) {
  class Env {
    constructor (kaifa = ['127.0.0.1', 'localhost', '192.168']) {
      this.kaifaEnv = kaifa
    }
    origin (str = '127.0.0.1') {
      let kaifa = this.kaifaEnv
      let o = window.location.host
      let protocol = window.location.protocol // => http:  || https:
      let s = `${protocol}//${str}`
      let t = kaifa.some((item, index, arr) => {
        let r = new RegExp(item)
        return o.match(r)
      })
      if (t) {
        return s
      } else {
        return `${protocol}//${o}`
      }
    }
    isDev () {
      let kaifa = this.kaifaEnv
      let o = window.location.host
      let t = kaifa.some((item, index, arr) => {
        let r = new RegExp(item)
        return o.match(r)
      })
      return t
    }
  }
  return new Env(kaifa)
}
