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
            <ImgUploadWeui v-model="img" :type="type" :getImgs="imgCopy" @clearImg="onClearImg"></ImgUploadWeui>
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
  // import 'weui/dist/style/weui.min.css'
  // import weui from 'static/js/weui.js'
  import ImgUploadWeui from '@/components/cmp/ImgUploadWeui.vue'
  import HttpClient from 'http/httpClient.js'
  import BaseUrl from 'http/httpBaseuRL.js'
export default {
  components: {
    HeaderView,
    ContentView,
    ImgUploadWeui
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
  // computed: {
  //   getImgs() {
  //     return this.imgCopy.split(',')
  //   }
  // },
  methods: {
    onClearImg() {
      this.imgCopy = []
    },
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
          Array.prototype.push.apply(this.img,this.imgCopy)
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
          this.imgCopy = resp.data[0].shopImg.split(',')
        }
      }).catch((error) => {
        this.$message.error(error.message)
      })
    }
  },
  mounted: function () {
    this.type = this.$route.query.type
    let that = this
    if (this.type === 'edit') {
      this.getShopDtl()
    }
    this.shopMobile = this.$store.state.user.user.mobile
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
