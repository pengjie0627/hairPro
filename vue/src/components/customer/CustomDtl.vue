<template>
  <div>
    <HeaderView title="客户详情" :isShowBack="true">
      <template slot="right">
        <!--<span @click="onToEditCustom('employ')">编辑</span>-->
      </template>
    </HeaderView>
    <ContentView>
      <el-form v-for="form in employ"  ref="employ" label-width="100px" class="custom-dtl">
        <el-row>
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="客户姓名：" prop="name">
              {{form.name}}
            </el-form-item>
          </el-col>
          <!--<el-col :span="12"><el-button type="danger" size="mini" @click="deleteCustom">删除该员工</el-button></el-col>-->
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="客户手机：" prop="mobile">
              {{form.mobile}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="form-item-wrap" prop="hairTime" label="剪发日期：">
              {{form.hairTime}}
            </el-form-item>
          </el-col>
          <!--<el-col :span="12"><el-button type="danger" size="mini" @click="deleteCustom">删除该员工</el-button></el-col>-->
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="是否是vip：" prop="vipLevel">
              {{form.vipLevel}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="介绍人姓名：" prop="introduceEmployName">
              {{form.introduceEmployMobile}}
            </el-form-item>
          </el-col>
          <!--<el-col :span="12"><el-button type="danger" size="mini" @click="deleteCustom">删除该员工</el-button></el-col>-->
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="理发师姓名：" prop="cutHairEmployName">
              {{form.cutHairEmployMobile}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="form-item-wrap" label="客户图片：" prop="img">
          <img v-for="item in form.img" :src="item" @click="onImgCheck(item)" alt="暂无图片" style="width: 60px;height: 60px;margin-left: 10px">
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="剪发费用：" prop="cutHairPrice">
              {{form.cutHairPrice | amountFmt}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="form-item-wrap" label="操作：" prop="cutHairPrice">
              <a style="color: #409EFF" @click="onToEditCustom(form.id)">编辑</a>&nbsp;&nbsp;
              <a style="color: red" @click="deleteCustom(form.id)">删除</a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="form-item-wrap" label="备注信息：" prop="remark">
          {{form.remark}}
        </el-form-item>
      </el-form>
    </ContentView>
    <el-dialog
      title="图片查看"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose">
      <img :src="curImgUrl" alt="暂无图片" style="width: 100%;height: 300px">
    </el-dialog>
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
        dialogVisible: false,
        curImgUrl: '',
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
      handleClose(done) {
        done()
      },
      onImgCheck: function (imgUrl) {
        this.dialogVisible = true
        this.curImgUrl = imgUrl
      },
      getEmployList: function () {
        HttpClient.get('/employ/employList').then((resp) => {
          this.employs = resp.data
          this.getCustomDtl()
        })
      },
      deleteCustom(id) {
        this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'widthClass',
          type: 'warning'
        }).then(() => {
          let qs = require('qs')
          HttpClient.post('/custom/delete', qs.stringify(
            {
              id: id
            })).then((resp) => {
            if (resp.success) {
              this.$message.success(resp.message)
              this.getCustomDtl()
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
            this.employ = resp.data
            this.employ.forEach(item => {
              item.img = item.hairImg.split(',')
              if (item.introduceEmployMobile === 'none') {
                item.introduceEmployMobile = '无'
              } else {
                this.employs.forEach(employ => {
                  if (employ.mobile === item.introduceEmployMobile) {
                    item.introduceEmployMobile = employ.name
                  }
                })
              }
              if (item.cutHairEmployMobile === 'none') {
                item.cutHairEmployMobile = '无'
              } else {
                this.employs.forEach(employ => {
                  if (employ.mobile === item.cutHairEmployMobile) {
                    item.cutHairEmployMobile = employ.name
                  }
                })
              }
            })

          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
      onToEditCustom: function(id) {
        this.$router.push({name: 'customAdd', query: {type: 'edit', id:id}})
      }
    },
    mounted: function () {
      this.getEmployList()
    }
  }
</script>

<style>
  .form-item-wrap{
    margin-bottom: 0;
    line-height: 20px;
  }
  .widthClass{
    width: 315px;
  }
  .custom-dtl{
    margin: 10px;
    background: #eee;
  }
</style>
