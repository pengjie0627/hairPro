<template>
    <div>
      <header-view title="首页">
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
  import HeaderView from '@/components/cmp/HeaderView.vue'
  export default {
    components: {HeaderView},
    mounted: function() {
      this.checkPermission = Boolean(this.$route.query.permission)
      this.employName = this.$route.query.name
    },
    data() {
      return {
        employName: '',
        checkPermission: '',
      }
    },
    methods: {
      /**
       * 新增门店
       */
      onToAddShop: function () {
        this.$router.push('/shopAdd')
      },
      /**
       * 关联门店
       */
      onToRelateShop: function() {
        this.$router.push('/relatedShop')
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
