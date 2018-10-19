<template>
  <div>
    <HeaderView title="客户详情" :isShowBack="true">
      <template slot="right">
        <span @click="onToEditCustom('employ')">编辑</span>
      </template>
    </HeaderView>
    <ContentView>
      <el-form :model="employ"  ref="employ" label-width="100px" class="employ">
        <el-form-item label="客户姓名：" prop="name">
          {{employ.name}}
        </el-form-item>
        <el-form-item label="客户手机：" prop="mobile">
          {{employ.mobile}}
        </el-form-item>
        <el-form-item prop="hairTime" label="剪发日期：">
          {{employ.hairTime}}
        </el-form-item>
        <el-form-item label="是否是vip：" prop="vipLevel">
          {{employ.vipLevel}}
        </el-form-item>
        <el-form-item label="介绍人姓名：" prop="introduceEmployName">
          {{getIntroduceEmployName}}
        </el-form-item>
        <!--<el-form-item label="介绍人手机" prop="introduceEmployMobile">-->
        <!--<el-input  v-model="employ.introduceEmployMobile" placeholder="请输入介绍人手机"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="理发师姓名：" prop="cutHairEmployName">
          {{getHairCutEmployName}}
        </el-form-item>
        <!--<el-form-item label="理发师手机" prop="cutHairEmployMobile">-->
        <!--<el-input  v-model="employ.cutHairEmployMobile" placeholder="请输入理发师手机"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="客户图片：" prop="img">
          <img v-for="item in employ.img" :src="item" alt="暂无图片" style="width: 100px;height: 100px;margin-left: 10px">
        </el-form-item>
        <el-form-item label="剪发费用：" prop="cutHairPrice">
          {{employ.cutHairPrice}}
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
  export default {
    components: {
      HeaderView,
      ContentView
    },
    data() {
      return {
        type: '',
        shops: [],
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
        }
      }
    },
    methods: {
      getEmployList: function () {
        HttpClient.get('/employ/employList').then((resp) => {
          this.employs = resp.data
        })
      },
      deleteCustom() {
        this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'widthClass',
          type: 'warning'
        }).then(() => {
          let qs = require('qs')
          HttpClient.post('/custom/delete', qs.stringify(
            {
              mobile: this.$route.query.mobile
            })).then((resp) => {
            if (resp.success) {
              this.$message.success(resp.message)
              this.$router.replace({name:'employList'})
            }
          }).catch((error) => {
            this.$message.error(error.message)
          })
        }).catch(() => {
        });
      },
      getCustomDtl() {
        HttpClient.get(`/custom/dtl?mobile=${this.$route.query.mobile}`).then((resp) => {
          if (resp.success) {
            this.employ = resp.data[0]
            this.employ.img = this.employ.hairImg.split(',')
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
      onToEditCustom: function(formName) {
        this.$router.push({name: 'customAdd', query: {type: 'edit', mobile: this.$route.query.mobile}})
      }
    },
    mounted: function () {
      this.getCustomDtl()
      this.getEmployList()
    },
    computed: {
      getIntroduceEmployName: function() {
        if (this.employ.introduceEmployMobile === 'none') {
          return '无'
        }
        let name = ''
        for(let i = 0; i< this.employs.length;i++) {
          if (this.employs[i].mobile === this.employ.introduceEmployMobile) {
            name = this.employs[i].name
            break;
          }
        }
        if (name) {
          return name
        } else {
          return '无'
        }
      },
      getHairCutEmployName : function() {
        if (this.employ.cutHairEmployMobile === 'none') {
          return '无'
        }
        let name = ''
        for(let i = 0; i< this.employs.length;i++) {
          if (this.employs[i].mobile === this.employ.cutHairEmployMobile) {
            name = this.employs[i].name
            break;
          }
        }
        if (name) {
          return name
        } else {
          return '无'
        }
      }
    }
  }
</script>

<style>
  .widthClass{
    width: 315px;
  }
  .employ{
    margin: 10px;
  }
</style>
