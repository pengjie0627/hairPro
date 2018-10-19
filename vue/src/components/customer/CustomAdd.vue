<template>
  <div>
    <HeaderView :title="title" :isShowBack="true">
      <template slot="right">
        <span @click="onToSaveEmploy('employ')">保存</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-form :model="employ" :rules="rules" ref="employ" label-width="100px" class="custom">
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="employ.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="客户手机" prop="mobile">
          <el-input v-model="employ.mobile" :disabled="type === 'edit'" placeholder="请输入员工手机" @change="onMobileChange"></el-input>
        </el-form-item>
        <el-form-item prop="hairTime" label="剪发日期">
          <el-date-picker type="date" placeholder="选择剪发日期" v-model="employ.hairTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否是vip" prop="vipLevel">
          <el-select v-model="employ.vipLevel" placeholder="请选择门店" style="width: 100%">
            <el-option label="无" value="none">无</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍人姓名" prop="introduceEmployName">
          <el-select v-model="employ.introduceEmployName" @change="onNameChange()" placeholder="请输入介绍人姓名" style="width: 100%">
            <el-option label="无" value="none">无</el-option>
            <el-option v-for="employ in employs" :label="employ.name" :value="employ.mobile">{{employ.name}}[{{employ.mobile}}]</el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="介绍人手机" prop="introduceEmployMobile">-->
          <!--<el-input  v-model="employ.introduceEmployMobile" placeholder="请输入介绍人手机"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="理发师姓名" prop="cutHairEmployName">
          <el-select v-model="employ.cutHairEmployName" @change="onNameChange()" placeholder="请输入理发师姓名" style="width: 100%">
            <el-option label="无" value="none">无</el-option>
            <el-option v-for="employ in employs" :label="employ.name" :value="employ.mobile">{{employ.name}}[{{employ.mobile}}]</el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="理发师手机" prop="cutHairEmployMobile">-->
          <!--<el-input  v-model="employ.cutHairEmployMobile" placeholder="请输入理发师手机"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="客户图片" prop="img">
          <ImgUploadWeui v-model="employ.img" :type="type" :getImgs="copyImg" @clearImg="onClearImg"></ImgUploadWeui>
        </el-form-item>
        <el-form-item label="剪发费用" prop="cutHairPrice">
          <el-input type="number" v-model="employ.cutHairPrice" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input type="textarea" v-model="employ.remark" placeholder="请输入对员工的备注信息"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-bottom-wrap"><el-button class="btn-bottom" type="primary" @click="onSaveAndAdd('employ')">保存并新增</el-button></div>
    </ContentView>
  </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import HttpClient from 'http/httpClient.js'
  import ImgUploadWeui from '@/components/cmp/ImgUploadWeui.vue'
  import DataFormat from 'utils/dataFormat.js'
  export default {
    components: {
      HeaderView,
      ContentView,
      ImgUploadWeui
    },
    data() {
      return {
        title: '',
        type: '',
        copyImg: [],
        employs: [],
        employ: {
          name: '',
          mobile: '',
          hairTime: '',
          vipLevel: '',
          introduceEmployName: '',
          introduceEmployMobile: '',
          cutHairEmployName: '',
          cutHairEmployMobile: '',
          img: [],
          cutHairPrice: 0,
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],
          mobile: [
            { min: 11,max: 11,required: true, message: '请输入11位手机号码', trigger: 'blur' }
          ],
          hairTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          vipLevel: [
            { max: 50,required: true, message: '请输选择vip等级', trigger: 'change' }
          ],
          introduceEmployName: [
            { max: 20,required: true, message: '请输入介绍人名称', trigger: 'change' }
          ],
          // introduceEmployMobile: [
          //   { min: 11,max: 11,required: true, message: '请输入11位手机号码', trigger: 'blur' }
          // ],
          cutHairEmployName: [
            { max: 20,required: true, message: '请输入理发师名称', trigger: 'change' }
          ],
          // cutHairEmployMobile: [
          //   { min: 11,max: 11,required: true, message: '请输入11位手机号码', trigger: 'blur' }
          // ],
          cutHairPrice: [
            { min: 0,required: true, message: '请输入剪发费用', trigger: 'blur' }
          ],
          remark: [
            { max: 255,required: true, message: '请输入对员工的备注', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onNameChange() {
        this.$forceUpdate()
      },
      onClearImg() {
        this.copyImg = []
      },
      getEmployList() {
        HttpClient.get(`/employ/employList`).then((resp) => {
          if (resp.success) {
            this.employs = resp.data
            if (this.type === 'edit') {
              this.getEmployDtl()
            }
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
            if (this.employ.img.length === 0 && this.copyImg.length === 0) {
              this.$message.error('请上传图片')
              return
            }
            let url = this.type === 'edit' ? '/custom/edit' : '/custom/add'
            if (this.type === 'edit' || this.type === 'saveAndAdd') {
              Array.prototype.push.apply(this.employ.img,this.copyImg)
            }
            let qs = require('qs')
            HttpClient.post(url, qs.stringify(
              {
                id: this.$route.query.id,
                name: this.employ.name,
                mobile: this.employ.mobile,
                hairTime: DataFormat.formatDate(this.employ.hairTime, 'yyyy-MM-dd'),
                vipLevel: this.employ.vipLevel,
                introduceEmployMobile: this.employ.introduceEmployName,
                cutHairEmployMobile: this.employ.cutHairEmployName,
                img: this.employ.img,
                cutHairPrice:this.employ.cutHairPrice,
                remark: this.employ.remark
              })).then((resp) => {
              if (resp.success) {
                this.$message.success(resp.message)
                this.$router.push({name:'customDtl', query: {mobile: resp.data[0].mobile}})
              }
            }).catch((error) => {
              this.$message.error(error.message)
            })
          } else {

            return false;
          }
        });
      },
      onSaveAndAdd(formName) {
        this.type = 'saveAndAdd'
        this.onToSaveEmploy(formName)
      },
      getEmployDtl() {
        HttpClient.get(`/custom/dtlById?id=${this.$route.query.id}`).then((resp) => {
          if (resp.success) {
            this.employ = resp.data[0]
            this.employ.hairTime = new Date(this.employ.hairTime)
            this.employ.cutHairPrice = resp.data[0].cutHairPrice.toString()
            if (this.employ.introduceEmployMobile === 'none') {
              this.employ.introduceEmployName = 'none'
            } else {
              this.employ.introduceEmployName = resp.data[0].introduceEmployMobile
            }
            if (this.employ.cutHairEmployMobile === 'none') {
              this.employ.cutHairEmployName = 'none'
            } else {
              this.employ.cutHairEmployName = resp.data[0].cutHairEmployMobile
            }
            this.copyImg  = resp.data[0].hairImg.split(',')
            this.employ.img = []
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
    },
    mounted: function () {
      this.type = this.$route.query.type
      this.title = this.type === 'add' ? '新增客户' : '编辑客户'
      this.getEmployList()
    }
  }
</script>

<style scoped>
  .custom{
    margin: 10px;
  }
  .btn-bottom-wrap{
    text-align: center;
    padding: 20px 0;
  }
  .btn-bottom{
    width: 90%;
  }
</style>
