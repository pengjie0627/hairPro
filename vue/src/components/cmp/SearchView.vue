<template>
    <div class="search-view">
      <el-row>
        <el-col :span="18">
          <el-input placeholder="请输入手机号码或者客户姓名" v-model="customInfo" clearable ref="search"></el-input>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-button class="btn-search" size="mini" type="primary" @click="onBtnSearch">查询</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
export default {
  data() {
    return {
      customInfo: ''
    }
  },
  mounted: function() {
    this.$refs.search.focus()
  },
  methods: {
    getCustomListBySearch() {
      HttpClient.get(`/custom/CustomListBySearch?info=${this.customInfo}`).then(resp => {
        if (resp.success) {
          this.$emit('customList', resp.data)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    onBtnSearch() {
      this.getCustomListBySearch()
    }
  }
}
</script>

<style scoped>
.search-view{
  padding: 5px;
}
  .btn-search{
    margin: 5px;
  }
</style>
