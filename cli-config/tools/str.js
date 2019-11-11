// 处理输入的字符

// 字符串转数组
const dealArr = (str) => {
  try {
    if (str.match(/\[.*]/g)) {
      let arr = str.replace(/^\[/, '').replace(/\]$/, '').split(',')
      return arr.map(item => item.trim())
    }
  } catch (error) {
    throw new Error('数组不能解析:', str)
  }
}

module.exports = {
  dealArr
}
