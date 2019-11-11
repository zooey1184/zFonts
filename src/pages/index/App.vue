<template>
  <div>
    <div class="exchangeFont" @click='exchangeFont'>
      <svg t="1572579557289" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6016" width="26" height="26"><path d="M950.4 361.6l-288-288c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l233.6 233.6L96 352c-19.2 0-32 12.8-32 32s12.8 32 32 32l832 0c12.8 0 25.6-6.4 28.8-19.2C963.2 384 960 371.2 950.4 361.6z" p-id="6017"></path><path d="M928 608 96 608c-12.8 0-25.6 6.4-28.8 19.2C60.8 640 64 652.8 73.6 662.4l288 288c6.4 6.4 16 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L172.8 672 928 672c19.2 0 32-12.8 32-32S947.2 608 928 608z" p-id="6018"></path></svg>
    </div>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import makalong from './views/makalong'
import newType from './views/newType'

export default {
  data: () => ({
    componentId: 'newType'
  }),
  components: {
    makalong,
    newType
  },
  methods: {
    exchangeFont (val) {
      if (this.componentId === 'newType') {
        this.componentId = 'makalong'
      } else {
        this.componentId = 'newType'
      }
    }
  }
}
</script>

<style lang="less">
@import url('./../../common/css/flex.less');
@import url('./../../common/css/transition.less');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  width: 100vw;
  overflow: auto;
}
.mx_w {
  width: 80%;
  max-width: 1000px;
}

.mg_c {
  display: block;
  margin: 0 auto;
}
.exchangeFont {
  position: absolute;
  top: 10px;
  right: 12px;
}
// 这个是后端运行放本地情况，font资源放本地
@font-face {
  font-family: 'webFont';
  src: url('./../../../admin/font/font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
// 这个是后端运行放远程服务器的情况，font资源生成在远程服务器
// @font-face {
//   font-family: 'webFont';
//   src: url('https://uat.51bmsh.com/lanjian/application/views/h5/pages/zFontsAdmin/font/font.ttf') format('truetype');
//   font-weight: normal;
//   font-style: normal;
// }
@font-face {
  font-family: 'maobi';
  src: url('./font/font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
</style>
