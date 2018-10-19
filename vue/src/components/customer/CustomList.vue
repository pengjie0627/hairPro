<template>
  <div>
    <HeaderView title="客户列表" :isShowBack="false">
      <template slot="left">
        <span @click="onToSelectRole">返回</span>
      </template>
      <template slot="right">
        <span @click="onToAddEmploy">新增</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-table
        :data="employ"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="客户名称">
          <template slot-scope="scope">
            <a class="name" @click="onToEmployDtl(scope.row)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mobile"
          label="客户手机">
        </el-table-column>
        <el-table-column
          align="center"
          prop="hairTime"
          label="最近剪发时间">
        </el-table-column>
      </el-table>
    </ContentView>
  </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import HttpClient from 'http/httpClient.js'
  export default {
    components: {
      HeaderView,
      ContentView
    },
    data() {
      return {
        employ: []
      }
    },
    methods: {
      onToSelectRole: function () {
        this.$router.replace({name: 'selectRole'})
      },
      onToAddEmploy: function() {
        this.$router.push({name: 'customAdd', query: {type: 'add'}})
      },
      getCustomList: function () {
        HttpClient.get('/custom/customList').then((resp) => {
          this.employ = resp.data
        })
      },
      onToEmployDtl: function(row) {
        this.$router.push({name: 'customDtl', query: {mobile: row.mobile}})
      },
    },
    mounted: function () {
      this.getCustomList()
    }
  }
</script>

<style scoped>
  .name{
    color: #409EFF;
  }
</style>
