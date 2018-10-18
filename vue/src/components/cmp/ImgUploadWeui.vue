<template>
  <div class="weui-cells weui-cells_form" id="uploader">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-uploader__info">
              <el-button size="mini" @click="onReUploadImg">重新上传</el-button>
            </div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles">

              <li v-if=" type ==='edit'" v-for="item in getImgs" class="weui-uploader__file">
                <img :src="item" alt="暂无图片" style="width: 77px;height: 77px">
              </li>
            </ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" capture="camera" multiple="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'weui/dist/style/weui.min.css'
  import weui from 'static/js/weui.js'
  import BaseUrl from 'http/httpBaseuRL.js'
export default {
  props: {
    value: '',
    type: '',
    getImgs: ''
  },
  data() {
    return {
      img: []
    }
  },
  methods: {
    onReUploadImg() {
      $('#uploaderFiles').children().remove()
      this.img = []
      this.$emit('clearImg')
    }
  },
  mounted: function () {
    var uploadCount = 0;
    let that = this
    weui.uploader('#uploader', {
      url: BaseUrl.url + '/user/shopImg',
      auto: true,
      type: 'file',
      fileVal: 'file',
      xhrFields: {
        withCredentials: true,
        // headers: {'Content-Type': 'multipart/form-data'}
      },
      compress: {
        width: 1600,
        height: 1600,
        quality: .8
      },
      onBeforeQueued: function(files) {
        // `this` 是轮询到的文件, `files` 是所有文件
        if (that.type === 'edit') {
          if (that.getImgs.length > 5) {
            weui.alert('最多只能上传5张图片，请重新选择');
            return false;
          }
        }
        if(["image/jpg", "image/jpeg", "image/png"].indexOf(this.type) < 0){
          weui.alert('请上传图片');
          return false; // 阻止文件添加
        }
        if(this.size > 10 * 1024 * 1024){
          weui.alert('请上传不超过10M的图片');
          return false;
        }
        if (files.length > 5) { // 防止一下子选择过多文件
          weui.alert('最多只能上传5张图片，请重新选择');
          return false;
        }
        if (uploadCount + 1 > 5) {
          weui.alert('最多只能上传5张图片');
          return false;
        }
        ++uploadCount;
      },
      onQueued: function(){
        console.log(this);
      },
      onBeforeSend: function(data, headers){
        console.log(this, data, headers);
        return headers
      },
      onProgress: function(procent){
        console.log(this, procent);
      },
      onSuccess: (ret) => {
        this.img.push(ret.data)
        this.$emit('input', this.img)
      },
      onError: function(err){
        console.log(this, err);
      }
    });
  }
}
</script>

<style scoped>

</style>
