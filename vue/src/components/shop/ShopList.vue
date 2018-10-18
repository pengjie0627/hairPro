<template>
  <div>
    <HeaderView title="门店列表" :isShowBack="false">
      <template slot="left">
        <span @click="onToSelectRole">返回</span>
      </template>
      <template slot="right">
        <span @click="onToAdd">新增</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-table
        :data="shops"
        style="width: 100%">
        <el-table-column
          prop="shopName"
          label="门店名称"
          >
          <template slot-scope="scope">
            <a class="name" @click="onToShopDtl(scope.row)">{{scope.row.shopName}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="shopMobile"
          label="店主手机"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="shopUuid"
          label="门店码"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="shopSize"
          label="门店报表">
          <template slot-scope="scope">
            <a class="name" @click="onToShopReport(scope.row)">查看</a>
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
        shops: []
      }
    },
    mounted: function () {
      this.getShopList()
    },
    methods: {
      getShopList() {
        HttpClient.get(`/shop/shopList?mobile=${this.$store.state.user.user.mobile}`).then((resp) => {
          if (resp.success) {
            this.shops = resp.data
            console.log(resp.data)
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
      onToAdd() {
        this.$router.push({name: 'shopAdd', query: {type:'add'}})
      },
      onToShopDtl(row) {
        this.$router.push({name: 'shopDtl', query: {uuid: row.shopUuid}})
      },
      onToShopReport(row) {
        // todo
        this.$router.push({name: 'shopReport', query: {uuid: row.shopUuid}})
      },
      onToSelectRole: function () {
        this.$router.replace({name: 'selectRole'})
      }
    }
  }
</script>

<style scoped>
.name{
  color: #409EFF;
}
</style>
