<template>
  <div>
    <HeaderView title="员工管理" :isShowBack="false">
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
          label="员工名称">
          <template slot-scope="scope">
            <a class="name" @click="onToShopDtl(scope.row)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mobile"
          label="员工手机">
        </el-table-column>
        <el-table-column
          align="center"
          prop="salary"
          label="员工薪资">
          <template slot-scope="scope">
            {{scope.row.salary}}
          </template>
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
        this.$router.push({name: 'employAdd', query: {type: 'add'}})
      },
      getEmployList: function () {
        HttpClient.get('/employ/employList').then((resp) => {
          this.employ = resp.data
        })
      }
    },
    mounted: function () {
      this.getEmployList()
    }
  }
</script>

<style scoped>

</style>
