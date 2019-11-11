<template>
  <div class="fontPane">
    <div class="f_flex f_j_sb f_w" style="padding: 40px;">
      <div class="panelContent">
        <textarea name="text" class="textareaPane bd_n" v-model='originText' placeholder="请输入你要转化的文案..."></textarea>
      </div>
      <div class="f_flex f_dir_v middlePane">
        <select name="fontName" id="fontSelect" class="fontPane_select" v-model='fontName' @change='getText'>
          <option value="" disabled>选择字体</option>
          <option v-for='(item, index) in fontList' :key='index' :value='item.text'>{{item.text}}</option>
        </select>
        <div class="f_flex f_j_c" style="margin-top: 30px;">
          <svg t="1572575484255" @click='getText' class="icon iconFontArrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4797" width="64" height="64"><path d="M0 512c0 69.1 13.5 136.2 40.3 199.3C66 772.3 103 827 150 874s101.8 83.9 162.7 109.7c63.1 26.7 130.2 40.3 199.3 40.3s136.2-13.5 199.3-40.3C772.3 958 827 921 874 874s83.9-101.8 109.7-162.7c26.7-63.1 40.3-130.2 40.3-199.3s-13.5-136.2-40.3-199.3C958 251.7 921 197 874 150S772.3 66 711.3 40.3C648.2 13.5 581.1 0 512 0S375.8 13.5 312.7 40.3C251.7 66 197 103 150 150S66 251.7 40.3 312.7C13.5 375.8 0 442.9 0 512z m607.1 0L400.5 305.5c-14.1-14.1-14.1-36.9 0-50.9 14.1-14.1 36.9-14.1 50.9 0l232 231.9c14.1 14.1 14.1 36.9 0 50.9l-231.9 232c-7 7-16.2 10.5-25.5 10.5s-18.4-3.5-25.5-10.5c-14.1-14.1-14.1-36.9 0-50.9L607.1 512z" fill="" p-id="4798"></path></svg>
        </div>
      </div>
      <div class="contentPane panelContent">
        <transition name='fade'>
          <div v-show='isChange' class="f_flex f_a_c f_dir_v f_j_sb" style="height: 100%">
            <div  class='fontContent' ref='fontContent'> {{originText}} </div>
            <div class="f_flex f_a_c" style="font-size: 14px; color: #004d61; margin-top: 20px;">
              <div class="f_flex f_a_c iconFonts" style="margin-right: 30px">
                <svg t="1572252476553" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5735" width="20" height="20"><path d="M0 136.2v751.6C0 963 61 1024 136.2 1024h751.6c75.2 0 136.2-61 136.2-136.2V136.2C1024 61 963 0 887.8 0H136.2C61 0 0 61 0 136.2z m814 231.6l-18.1 4.2c-11.4 2.7-22.7-4.5-25.1-15.9C747.6 246.8 716.7 237 634.2 237h-53.4c-11.5 0-20.8 9.3-20.8 20.8v481.7c0 36.4 1.8 56.5 11.4 65.9 10.6 10.4 35.9 15.6 87.4 18 11.1 0.6 19.8 9.7 19.8 20.8v15c0 11.5-9.3 20.8-20.8 20.8H369.4c-11.5 0-20.8-9.3-20.8-20.8v-15c0-11.1 8.7-20.2 19.8-20.8 48.6-2.4 73.6-7.8 83.5-17.8 9.3-9.5 11.1-29.7 11.1-66.2V257.8c0-11.5-9.3-20.8-20.8-20.8h-24.6c-68.3 0-101 5.8-120.4 21.2-20.6 16.4-31.4 50-45.4 99.3-2.5 8.9-10.7 15.1-20 15.1h-17.1c-12.4 0-21.9-10.6-20.7-22.9 6.8-67.5 9.9-134.6 11.6-185.5 0.4-11.2 9.6-20.1 20.8-20.1h17.1c7.4 0 14.2 3.9 18 10.3 5.7 9.8 9.9 12.3 12.8 13.4 5 1.9 14.7 1.9 26.9 1.9h430.4c20.2 0 21.9-1.4 33.4-17.2 4.2-5.7 10.9-8.8 18-8.4l18.1 1.1c11.4 0.6 20.1 10.3 19.6 21.6-1.9 43.8 3.1 102.6 7.9 159.4 0.6 6.5 1.1 13 1.7 19.5 0.7 10.4-6.1 19.7-16.3 22.1z" p-id="5736"></path></svg>
                <p class="iconFontText">{{font.text}}</p>
              </div>
              <div class="f_flex f_a_c iconFonts" style="margin-right: 30px">
                <svg t="1572252366223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4857" width="26" height="26"><path d="M1024 640.192C1024 782.912 919.872 896 787.648 896h-512C123.904 896 0 761.6 0 597.504 0 451.968 94.656 331.52 226.432 302.976 284.16 195.456 391.808 128 512 128c152.32 0 282.112 108.416 323.392 261.12C941.888 413.44 1024 519.04 1024 640.192zM341.312 570.176L512 756.48l170.688-186.24H341.312z m213.376 0v-256H469.312v256h85.376z" fill="#1296db" p-id="4858"></path></svg>
                <p class="iconFontText" @click='downloadMiniText'>下载到本地</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="btm f_flex f_a_c f_j_sa">
      <div class="maobiFont itemFontBtn f_flex f_a_c f_j_c">{{loadingTxt}}
        <input v-if='!isLoadingFile' type="file" id='file' class="uploadFile" name='file' ref='file' @change="uploadFile">
      </div>
      <div class="maobiFont itemFontBtn f_flex f_a_c f_j_c" @click='downloadOriginText'>下载源字体</div>
      <div class="maobiFont itemFontBtn f_flex f_a_c f_j_c" @click='deleteOriginFont'>删除源字体</div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  data: () => ({
    fontName: '',
    originText: '',
    isChange: false,
    fontList: [],
    font: {},
    loadingTxt: '上传字体',
    isLoadingFile: false
  })
}
</script>

<style lang="less">
@height: 55vh;
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
}
.fontPane {
  .textareaPane {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: #fff;
    padding: 20px;
    font-size: 20px;
    box-shadow: 0 0 10px #ddd;
  }
  .fontContent {
    font-size: 24px;
  }
  .panelContent {
    width: 38vw;
    height: @height;
    @media (max-width: 900px) {
      width: 100%;
      height: 30vh;
      font-size: 16px;
    }
  }
  .middlePane {
    width: 15vw;
    padding: 20px;
    @media (max-width: 900px) {
      width: 100%;
      font-size: 16px;
    }
  }
  .contentPane {
    overflow: auto;
    box-shadow: 0 0 10px #ddd;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
  }
  .fontPane_select {
    height: 45px;
    background: #fff;
    border: 1px solid #eee;
    font-size: 20px;
    padding: 0 10px;
    font-family: 'maobi', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }
  .iconFontArrow {
    &:active {
      opacity: 0.8;
    }
  }
  .itemFontBtn {
    width: 120px;
    height: 120px;
    border-radius: 80px;
    background: #fff;
    background: #ffb6b9;
    font-size: 20px;
    position: relative;
    text-align: center;
    .noSelect;
    &:active {
      background: #fae3d9
    }
    @media (max-width: 900px) {
      width: 80px;
      height: 80px;
      font-size: 16px;
    }
  }
}
</style>
