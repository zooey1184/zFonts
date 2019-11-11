<!-- eslint-disable -->
<template>
  <div>
    <div class="header f_flex f_a_c">
      <div class="mx_w mg_c">
        zFonts
      </div>
    </div>
    <div class="mx_w mg_c" style="padding: 20px 0;">
      <textarea name="text" id="originText" v-model='originText' placeholder="请输入你要转化的文案..."></textarea>
    </div>
    <div class="action">
      <div class="mx_w mg_c f_flex f_a_c f_j_sb f_w">
        <div>
          <select name="fontName" class="inputPane" id="fontSelect" v-model='fontName' @change='isChange=false'>
            <option value="" disabled>请选择字体</option>
            <option v-for='(item, index) in fontList' :key='index' :value='item.text'>{{item.text}}</option>
          </select>
        </div>
        <div class="f_flex f_a_c f_j_sb f_w">
          <button class="btn btn_primary bd_n mg_f btn_red">
            上传
            <input type="file" id='file' name='file' ref='file' @change="uploadFile">
          </button>
          <button class="btn bd_n mg_f btn_red" @click='downloadOriginText'>下载源字体</button>
          <button class="btn bd_n mg_f btn_red" @click='deleteOriginFont'>删除源字体</button>
          <button class="btn bd_n mg_f btn_red_main" @click='getText'>生成字体</button>
        </div>
      </div>
    </div>
    <div class="mg_c mx_w">
      <transition name='fade'>
      	<div class="outputPane" v-show='isChange'>
      	  <div class='fontContent' ref='fontContent'>
      	    {{originText}}
      	  </div>
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
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins]
}
</script>

<style lang="less">
@import url('./index.less');

#fontContent {
  font-family: 'webFont';
  font-size: 24px
}
#originText {
  width: 100%;
  height: 40vh;
  font-size: 16px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
