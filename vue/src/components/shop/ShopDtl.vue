<template>
    <div>
      <HeaderView title="店铺详情" :isShowBack="true">
        <template slot="right"><span @click="onToEdit">编辑</span></template>
      </HeaderView>
      <content-view>
        <el-form style="margin-right: 10px; margin-top: 30px;" status-icon ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-form-item label="门店名称" prop="pass">
            <div>{{shopName}}</div>
          </el-form-item>
          <el-form-item label="门店地址" prop="pass">
            <div>{{shopAddress}}</div>
          </el-form-item>
          <el-form-item label="门店规模" prop="pass">
            <div>{{shopSize.toString() | shopSize}}</div>
          </el-form-item>
          <el-form-item label="店主名称" prop="pass">
            <div>{{shopOwner}}</div>
          </el-form-item>
          <el-form-item label="店主手机" prop="pass">
            <div>{{shopMobile}}</div>
          </el-form-item>
          <el-form-item label="门店图片" prop="pass">
            <img v-for="item in getImgs" :src="item" @click="onImgCheck(item)" style="width: 100px;height: 100px;margin-left: 10px" alt="暂无图片">
          </el-form-item>
          <el-form-item label="门店等级" prop="pass">
            <el-input maxLength="20" v-model="shopLevel" :disabled="true" placeholder="请输入门店等级"></el-input>
          </el-form-item>
        </el-form>
        <!--<el-button class="btn-save" @click="onToSave" type="primary">保存</el-button>-->
      </content-view>
      <el-dialog
        title="图片查看"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
        <img :src="curImgUrl" alt="暂无图片" style="width: 100%;height: 300px">
      </el-dialog>
    </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import HttpClient from 'http/httpClient.js'
  export default {
    components: {ContentView,HeaderView},
    data() {
      return {
        shopName: '',
        shopAddress: '',
        shopSize: '0',
        shopOwner: '',
        shopLevel: '低',
        shopMobile: '',
        img: '',
        dialogVisible: false,
        curImgUrl: ''
      }
    },
    mounted: function () {
      this.getShopDtl()
    },
    methods: {
      getShopDtl() {
        HttpClient.get(`/shop/shopDtl?shopUuid=${this.$route.query.uuid}`).then((resp) => {
          if (resp.success) {
            this.shopName = resp.data[0].shopName
            this.shopAddress = resp.data[0].shopAddress
            this.shopSize = resp.data[0].shopSize
            this.shopOwner = resp.data[0].user
            this.shopLevel = resp.data[0].shopLevel
            this.shopMobile = resp.data[0].shopMobile
            this.img = resp.data[0].shopImg
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      onImgCheck: function (imgUrl) {
        this.dialogVisible = true
        this.curImgUrl = imgUrl
      },
      handleClose(done) {
        done()
      },
      onToEdit() {
        this.$router.push({name: 'shopAdd', query:{type: 'edit', uuid: this.$route.query.uuid}})
      }
    },
    computed: {
      getImgs() {
        return this.img.split(',')
      }
    }
  }
</script>

<style scoped>

</style>
