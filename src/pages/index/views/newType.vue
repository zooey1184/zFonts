<template>
  <div class="wrap">
    <div>
      <img class="logo mg_c" src="./../imgs/zfonts.png" alt="">
      <p class="microTxt maobiFont">一个自定义的字体库，在线生成你需要的文字</p>
    </div>
    <transition name='fade' mode="out-in">
      <div v-if='(!showCore)'>
        <div class="maobiFont f_flex" style="font-size: 54px;">
          <img class="mg_c" style="height: 70vh" src="./../imgs/zi2.png" alt="">
        </div>
        <button class="btn bd_n maobiFont btnNewType mg_c" @click='startFn'>开始使用</button>
      </div>
      <font-pane v-else></font-pane>
    </transition>
  </div>
</template>

<script>
import fontPane from './fontPane'

export default {
  name: 'new-type',
  data: () => ({
    showCore: false
  }),
  components: {
    fontPane
  },
  methods: {
    startFn () {
      this.showCore = true
      sessionStorage.setItem('showCore', true)
    }
  },
  mounted () {
    let s = sessionStorage.getItem('showCore')
    setTimeout(() => {
      if (s) {
        this.showCore = s
      }
    }, 400)
  }
}
</script>

<style lang="less">
.wrap {
  background: #f8f8f8;
  width: 100vw;
  height: 100vh;
  .logo {
    padding-top: 20px;
  }
  .microTxt {
    font-size: 16px;
    color: #525252;
    text-align: center;
  }
  .maobiFont {
    font-family: 'maobi'
  }
  .btnNewType {
    border-radius: 30px;
    background: #f8f8f8;
    border: 1px solid #666;
    width: 160px;
    height: 45px;
    font-size: 20px;
    margin-top: 50px;
  }
}
</style>
