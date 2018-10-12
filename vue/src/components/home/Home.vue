<template>
    <div>
      <header class="title">首页</header>
      <div class="home">
        <div class="item"><el-button type="success" @click="onAddCustom">我是店主</el-button></div>
        <div class="item"><el-button type="success" @click="onAddEmploy">我是店员</el-button></div>
      </div>
    </div>
</template>

<script>
  export default {
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
      onToAuth: function () {
        this.$router.push('/permit')
      },
      onToCheck: function() {
        this.$router.push('/search')
      },
      onAddCustom: function () {
        this.$router.push({name: 'addCustom', query: {type: 'add'}})
      },
      onAddEmploy: function () {
        this.$router.push({name: 'addEmploy', query: {type: 'add'}})
      },
      onToGroupChat: function () {
        this.$router.push('/groupChat')
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
