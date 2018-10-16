<template>
    <div>
      <header-view title="选择角色" :isShowBack="false">
        <!--<template slot="left">返回</template>-->
        <!--<template slot="right">新增</template>-->
      </header-view>
      <div class="home">
        <div class="item"><el-button type="success" @click="onToAddShop">我是店主</el-button></div>
        <div class="item"><el-button type="success" @click="onToRelateShop">我是店员</el-button></div>
      </div>
    </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
  import HeaderView from '@/components/cmp/HeaderView.vue'
  export default {
    components: {HeaderView},
    mounted: function() {
      this.checkPermission = Boolean(this.$route.query.permission)
      this.employName = this.$route.query.name
      this.mobile = this.$store.state.user.user.mobile
    },
    data() {
      return {
        employName: '',
        checkPermission: '',
        mobile: '',
        type: ''
      }
    },
    methods: {
      /**
       * 新增门店
       */
      onToAddShop: function () {
        // todo 调用接口，保存店主状态
        this.type = 1
        HttpClient.get(`/user/userType?mobile=${this.mobile}&type=${this.type}`).then((resp) => {
          if (resp.success) {
            this.$router.push('/shopList')
          }
        }).catch((error) => {
          this.$message.error(error.message);
        })
      },
      /**
       * 关联门店
       */
      onToRelateShop: function() {
        // todo 调用接口，保存店员状态
        this.type = 0
        HttpClient.get(`/user/userType?mobile=${this.mobile}&type=${this.type}`).then((resp) => {
          if (resp.success) {
            this.$router.push('/relatedShop')
          }
        }).catch((error) => {
          this.$message.error(error.message);
        })
      }
    }
  }
</script>

<style scoped>
  .home{
    margin-top: 70px;
  }
  .title{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .item{
    text-align: center;
    margin-top: 20px;
  }
</style>
