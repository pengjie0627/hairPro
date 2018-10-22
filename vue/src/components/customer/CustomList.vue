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
      <SearchView @customList="onCustomList"></SearchView>
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
          label="剪发时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="belongShopId"
          label="所属门店">
        </el-table-column>
      </el-table>
    </ContentView>
  </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import SearchView from '@/components/cmp/SearchView.vue'
  import HttpClient from 'http/httpClient.js'
  export default {
    components: {
      HeaderView,
      ContentView,
      SearchView
    },
    data() {
      return {
        employ: []
      }
    },
    methods: {
      onCustomList: function(data) {
        this.employ = data
      },
      onToSelectRole: function () {
        this.$router.replace({name: 'selectRole'})
      },
      onToAddEmploy: function() {
        this.$router.push({name: 'customAdd', query: {type: 'add'}})
      },
      getCustomList: function () {
        HttpClient.get('/custom/customList').then((resp) => {
          this.getShopList(resp.data)
        })
      },
      onToEmployDtl: function(row) {
        this.$router.push({name: 'customDtl', query: {mobile: row.mobile}})
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
      this.getCustomList()
    }
  }
</script>

<style scoped>
  .name{
    color: #409EFF;
  }
</style>
