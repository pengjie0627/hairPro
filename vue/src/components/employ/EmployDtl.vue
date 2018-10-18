<template>
  <div>
    <HeaderView title="员工详情" :isShowBack="true">
      <template slot="right">
        <span @click="onToEditEmploy('employ')">编辑</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-form :model="employ" ref="employ" label-width="85px" class="employ">
        <el-form-item label="员工姓名：" prop="name">
          {{employ.name}}
        </el-form-item>
        <el-form-item label="员工手机：" prop="mobile">
          {{employ.mobile}}
        </el-form-item>
        <el-form-item prop="dateTime" label="入职日期：">
          {{employ.dateTime}}
        </el-form-item>
        <el-form-item label="所属门店：" prop="belongShopId">
         {{employ.belongShopId}}
        </el-form-item>
        <el-form-item label="登录名称：" prop="loginName">
          {{employ.mobile}}
        </el-form-item>
        <el-form-item label="登录密码：" prop="loginPwd">
          {{employ.loginPwd}}
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          {{employ.idCard}}
        </el-form-item>
        <el-form-item label="银行卡号：" prop="bankCard">
          {{employ.bankCard}}
        </el-form-item>
        <el-form-item label="员工图片：" prop="img">
          <img v-for="item in employ.img" :src="item" alt="暂无图片" style="width: 100px;height: 100px;margin-left: 10px">
        </el-form-item>
        <el-form-item label="员工工资：" prop="salary">
          ￥{{employ.salary | amountFmt}}元
        </el-form-item>
        <el-form-item label="登录权限：" prop="loginAuth">
          该员工<span style="color: red;font-weight: bold">{{employ.loginAuth ? '有' : '无'}}</span>登录权限
        </el-form-item>
        <el-form-item label="客户权限：" prop="customCheckedAuth">
          该员工<span style="color: red;font-weight: bold">{{employ.customCheckedAuth ? '有' : '无'}}</span>查看客户权限
        </el-form-item>
        <el-form-item label="同事权限：" prop="otherEmployCheckAuth">
          该员工<span style="color: red;font-weight: bold">{{employ.otherEmployCheckAuth ? '有' : '无'}}</span>查看其他员工权限
        </el-form-item>
        <el-form-item label="备注信息：" prop="remark">
          {{employ.remark}}
        </el-form-item>
      </el-form>
    </ContentView>
  </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import HttpClient from 'http/httpClient.js'
  import ImgUploadWeui from '@/components/cmp/ImgUploadWeui.vue'
  export default {
    components: {
      HeaderView,
      ContentView,
      ImgUploadWeui
    },
    data() {
      return {
        type: '',
        shops: [],
        employ: {
          name: '',
          mobile: '',
          dateTime: '',
          belongShopId: '',
          loginName: '',
          loginPwd: '',
          idCard: '',
          bankCard: '',
          img: '',
          salary: '',
          introducePercent: '',
          remark: '',
          loginAuth: 0,
          customCheckedAuth: 0,
          otherEmployCheckAuth: 0
        }
      }
    },
    methods: {
      getEmployDtl() {
        HttpClient.get(`/employ/dtl?mobile=${this.$route.query.mobile}`).then((resp) => {
          if (resp.success) {
            this.employ = resp.data[0]
            this.employ.img = this.employ.img.split(',')
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
      onToEditEmploy: function(formName) {
        this.$router.push({name: 'employAdd', query: {type: 'edit', mobile: this.$route.query.mobile}})
      }
    },
    mounted: function () {
      this.getEmployDtl()
    }
  }
</script>

<style scoped>
  .employ{
    margin: 10px;
  }
</style>
