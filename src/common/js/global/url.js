// parse解析url
let url = {
  /**
   * 解析url 参数
   * @param {*} href
   * @returns {}
   */
  getUrlData (href) {
    let url = href || window.location.href
    url = url.split('?')
    if (url.length <= 1) {
      return {}
    }
    let search = url[1].split('#')[0]
    let params = {}
    if (search) {
      let tmp = search.split('&')
      for (let i = 0; i < tmp.length; i++) {
        let kv = tmp[i].split('=')
        if (kv.length === 2) {
          params[kv[0]] = decodeURIComponent(kv[1])
        }
      }
    }
    return params
  },

  /**
   * 替换链接参数
   * @param {*} plat 链接参数
   * @param {*} rep 需要替换值
   * @param {*} href 链接 默认window.location.href
   * @returns
   */
  replaceUrlParams (plat, rep, href) {
    let url = href || window.location.href
    if (!(/\?/.test(url))) {
      return `${url}?${plat}=${rep}`
    } else {
      let p = this.getUrlData(url)
      if (p[plat]) {
        return url.replace(`${plat}=${p[plat]}`, `${plat}=${rep}`)
      } else {
        return `${url}&${plat}=${rep}`
      }
    }
  }
}
export default url
