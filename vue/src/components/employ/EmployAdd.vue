<template>
  <div>
    <HeaderView title="新增员工" :isShowBack="true">
      <template slot="right">
        <span @click="onToSaveEmploy('employ')">保存</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-form :model="employ" :rules="rules" ref="employ" label-width="80px" class="employ">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="employ.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工手机" prop="mobile">
          <el-input v-model="employ.mobile" placeholder="请输入员工手机" @change="onMobileChange"></el-input>
        </el-form-item>
        <el-form-item prop="dateTime" label="入职日期">
          <el-date-picker type="date" placeholder="选择入职日期" v-model="employ.dateTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属门店" prop="belongShopId">
          <el-select v-model="employ.belongShopId" placeholder="请选择门店" style="width: 100%">
            <el-option v-for="shop in shops" :label="shop.shopName" :value="shop.shopUuid">{{shop.shopName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名称" prop="loginName">
          <el-input v-model="employ.loginName" :disabled="true" placeholder="默认为手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="loginPwd">
          <el-input type="password" v-model="employ.loginPwd" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="employ.idCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCard">
          <el-input v-model="employ.bankCard" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="员工图片" prop="img">
          <ImgUploadWeui v-model="employ.img"  type="type"></ImgUploadWeui>
        </el-form-item>
        <el-form-item label="员工工资" prop="salary">
          <el-input v-model="employ.salary" placeholder="请输入员工工资"></el-input>
        </el-form-item>
        <el-form-item label="登录权限" prop="loginAuth">
          <el-switch v-model="employ.loginAuth"></el-switch>&nbsp;&nbsp;该员工<span style="color: red;font-weight: bold">{{employ.loginAuth ? '有' : '无'}}</span>登录权限
        </el-form-item>
        <el-form-item label="客户权限" prop="customCheckedAuth">
          <el-switch v-model="employ.customCheckedAuth"></el-switch>&nbsp;&nbsp;该员工<span style="color: red;font-weight: bold">{{employ.customCheckedAuth ? '有' : '无'}}</span>查看客户权限
        </el-form-item>
        <el-form-item label="同事权限" prop="otherEmployCheckAuth">
          <el-switch v-model="employ.otherEmployCheckAuth"></el-switch>&nbsp;&nbsp;该员工<span style="color: red;font-weight: bold">{{employ.otherEmployCheckAuth ? '有' : '无'}}</span>查看其他员工权限
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input type="textarea" v-model="employ.remark" placeholder="请输入对员工的备注信息"></el-input>
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
        },
        rules: {
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          mobile: [
            { min: 11,max: 11,required: true, message: '请输入11位手机号码', trigger: 'blur' }
          ],
          dateTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          belongShopId: [
            { max: 11,required: true, message: '请选择门店', trigger: 'blur' }
          ],
          loginPwd: [
            { required: true, message: '请输入登录密码', trigger: 'blur' }
          ],
          idCard: [
            { max: 20,required: true, message: '请输入身份证号码', trigger: 'blur' }
          ],
          bankCard: [
            { max: 50,required: true, message: '请输入银行卡号码', trigger: 'blur' }
          ],
          img: [
            { type:'array', required: true, message: '请上传员工图片', trigger: 'change' }
          ],
          salary: [
            { max: 20,required: true, message: '请输入员工工资', trigger: 'blur' }
          ],
          remark: [
            { max: 255,required: true, message: '请输入对员工的备注', trigger: 'blur' }
          ]
        }
      }
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
      onMobileChange() {
        this.employ.loginName = this.employ.mobile
      },
      onToSaveEmploy: function(formName) {
        // this.$router.push({name: 'employAdd', query: {type: 'add'}})
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.type === 'add' ? '/employ/add' : '/employ/edit'
            let qs = require('qs')
            HttpClient.post(url, qs.stringify(
              {
                name: this.employ.name,
                mobile: this.employ.mobile,
                dateTime: this.employ.dateTime,
                belongShopId: this.employ.belongShopId,
                loginName: this.employ.mobile,
                loginPwd: this.employ.loginPwd,
                idCard: this.employ.idCard,
                bankCard: this.employ.bankCard,
                img: this.employ.img,
                salary: this.employ.salary,
                introducePercent: this.employ.introducePercent,
                remark: this.employ.remark,
                loginAuth: this.employ.loginAuth ? 1 : 0,
                customCheckedAuth: this.employ.customCheckedAuth ? 1: 0,
                otherEmployCheckAuth: this.employ.otherEmployCheckAuth ? 1 : 0
              })).then((resp) => {
              if (resp.success) {
                this.$message.success(resp.message)
                this.$router.push({name:'employDtl', query: {uuid: resp.data[0].mobile}})
              }
            }).catch((error) => {
              this.$message.error(error.message)
            })
          } else {

            return false;
          }
        });
      }
    },
    mounted: function () {
      this.type = this.$route.query.type
      this.getShopList()
    }
  }
</script>

<style scoped>
.employ{
  margin: 10px;
}
</style>
