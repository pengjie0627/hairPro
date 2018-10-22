<template>
  <div>
    <HeaderView title="员工列表" :isShowBack="false">
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
            <a class="name" @click="onToEmployDtl(scope.row)">{{scope.row.name}}</a>
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
            {{scope.row.salary | amountFmt}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="salary"
          label="所属门店">
          <template slot-scope="scope">
            {{scope.row.belongShopId}}
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
        employ: [],
        shops: []
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
          this.getShopList(resp.data)
        })
      },
      onToEmployDtl: function(row) {
        this.$router.push({name: 'employDtl', query: {mobile: row.mobile}})
      },
      getShopList(data) {
        HttpClient.get(`/shop/shopList?mobile=${this.$store.state.user.user.mobile}`).then((resp) => {
          if (resp.success) {
            this.employ = data
            if (resp.data && resp.data.length > 0) {
              for (let i=0;i<data.length;i++) {
                for (let j=0;j<resp.data.length;j++) {
                  if (data[i].belongShopId === resp.data[j].shopUuid) {
                    this.employ[i].belongShopId = resp.data[j].shopName
                  }
                }
              }
            }
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
    },
    mounted: function () {
      this.getEmployList()
    }
  }
</script>

<style scoped>
.name{
  color: #409EFF;
}
</style>
