module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'space-before-function-paren': 0, //这句话表示在函数后可以不加空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
