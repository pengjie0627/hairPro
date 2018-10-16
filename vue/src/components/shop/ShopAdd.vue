<template>
    <div>
      <header-view title="新增门店" :rightSpan='5' :isShowBack="true">
        <!--<template slot="left">-->
          <!--<span>返回</span>-->
        <!--</template>-->
        <template slot="right">
          <span @click="onToSave">保存</span>
        </template>
      </header-view>
      <content-view>
        <el-form style="margin-right: 10px; margin-top: 30px;" status-icon ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-form-item label="门店名称" prop="pass">
            <el-input maxLength="20" v-model="shopName" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="pass">
            <el-input maxLength="50" v-model="shopAddress" placeholder="请输入门店地址"></el-input>
          </el-form-item>
          <el-form-item label="门店规模" prop="pass">
            <el-select v-model="shopSize" placeholder="请选择门店地址">
              <el-option value="0" label="5人以下">5人以下</el-option>
              <el-option value="1" label="5人~10人">5人~10人</el-option>
              <el-option value="2" label="10~50人">10~50人</el-option>
              <el-option value="3" label="50人以上">50人以上</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店主名称" prop="pass">
            <el-input maxLength="50" v-model="shopOwner" placeholder="请输入店主名称"></el-input>
          </el-form-item>
          <el-form-item label="店主手机" prop="pass">
            <el-input maxLength="11" v-model="shopMobile" :disabled="true" placeholder="请输入店主手机号码"></el-input>
          </el-form-item>
          <el-form-item label="门店图片" prop="pass">
            <div class="weui-cells weui-cells_form" id="uploader">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                      <!--<p class="weui-uploader__title">图片上传</p>-->
                      <!--<div class="weui-uploader__info"><span id="uploadCount">0</span>/5</div>-->
                    </div>
                    <div class="weui-uploader__bd">
                      <ul class="weui-uploader__files" id="uploaderFiles">
                        <li v-if="type === 'edit'" v-for="item in getImgs" class="weui-uploader__file">
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
          </el-form-item>
          <el-form-item label="门店等级" prop="pass">
            <el-input maxLength="20" v-model="shopLevel" :disabled="true" placeholder="请输入门店等级"></el-input>
          </el-form-item>
        </el-form>
        <!--<el-button class="btn-save" @click="onToSave" type="primary">保存</el-button>-->
      </content-view>

    </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import 'weui/dist/style/weui.min.css'
  import weui from 'static/js/weui.js'
  import HttpClient from 'http/httpClient.js'
  import BaseUrl from 'http/httpBaseuRL.js'
export default {
  components: {
    HeaderView,
    ContentView
  },
  data() {
      return {
        shopName: '',
        shopAddress: '',
        shopSize: '0',
        shopOwner: '',
        shopLevel: '低',
        shopMobile: '',
        img: [],
        type: '',
        imgCopy: ''
      }
  },
  computed: {
    getImgs() {
      return this.imgCopy.split(',')
    }
  },
  methods: {
    formValidate() {
      if (!this.shopName) {
        this.$message.error('请填写门店名称')
        return false
      }
      else if (!this.shopAddress) {
        this.$message.error('请填写门店地址')
        return false
      }
      else if (!this.shopOwner) {
        this.$message.error('请填写店主名称')
        return false
      }
      else if (this.img.length === 0 && !this.imgCopy) {
        this.$message.error('请上传门店图片')
        return false
      } else {
        return true
      }
    },
    onToSave() {
      if (!this.formValidate()) {
        return false
      }
      let url = ''
      if (this.type === 'edit') {
        url = '/shop/shopEdit'
        if (this.imgCopy) {
          Array.prototype.push.apply(this.img,this.getImgs)
        }
      } else {
        url = '/shop/shopAdd'
      }
      let qs = require('qs')
      HttpClient.post(url, qs.stringify(
        {
          name: this.shopName,
          address: this.shopAddress,
          size: this.shopSize,
          owner: this.shopOwner,
          img: this.img,
          level: this.shopLevel,
          mobile: this.shopMobile,
          uuid: this.$route.query.uuid
        })).then((resp) => {
        if (resp.success) {
          this.$message.success(resp.message)
          this.img = []
          this.$router.push({name:'shopDtl', query: {uuid: resp.data[0].shopUuid}})
        }
      }).catch((error) => {
        this.$message.error(error.message)
      })
    },
    getShopDtl() {
      HttpClient.get(`/shop/shopDtl?shopUuid=${this.$route.query.uuid}`).then((resp) => {
        if (resp.success) {
          this.shopName = resp.data[0].shopName
          this.shopAddress = resp.data[0].shopAddress
          this.shopSize = resp.data[0].shopSize.toString()
          this.shopOwner = resp.data[0].user
          this.shopLevel = resp.data[0].shopLevel
          this.shopMobile = resp.data[0].shopMobile
          this.imgCopy = resp.data[0].shopImg
        }
      }).catch((error) => {
        this.$message.error(error.message)
      })
    }
  },
  mounted: function () {
    this.type = this.$route.query.type
    if (this.type === 'edit') {
      this.getShopDtl()
    }
    this.shopMobile = this.$store.state.user.user.mobile
    var uploadCount = 0;
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

        // return true; // 阻止默认行为，不插入预览图的框架
      },
      onQueued: function(){
        console.log(this);

        // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
        // this.stop(); // 中断上传

        // return true; // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function(data, headers){
        console.log(this, data, headers);
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, {
        //   'Content-Type': 'multipart/form-data',
        //   'Accept': 'application/json, text/plain, */*'
        // }); // 可以扩展此对象来控制上传头部
        // return false; // 阻止文件上传
        return headers
      },
      onProgress: function(procent){
        console.log(this, procent);
        // return true; // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: (ret) => {
        this.img.push(ret.data)
      },
      onError: function(err){
        console.log(this, err);
        // return true; // 阻止默认行为，不使用默认的失败态
      }
    });
  }
}
</script>

<style scoped>
.btn-save{
  width: 96%;
  margin: 0 2%;
}
.el-select{
  width: 100%;
}
</style>
