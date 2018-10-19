<template>
  <div>
    <HeaderView title="个人设置" :isShowBack="false">
      <template slot="left">
        <span @click="onToSelectRole">返回</span>
      </template>
      <!--<template slot="right">-->
        <!--<span @click="onToAddEmploy">新增</span>-->
      <!--</template>-->
    </HeaderView>
    <ContentView>
      <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="关于软件" name="1" class="setting-view-padding">
        <div>
          1、此软件是几个开理发店的朋友托我做的，因此只是为理发店专门提供的，主要目的不是想为了赚钱，<br/>
          2、其它用户想要使用的话，只需要提供服务器，
          或者愿意给服务器租赁费用（50元/月，低于市场价，
          可去阿里云、京东云、百度云、腾讯云等各大门户网站比价）的，
          可以联系技术开发人员（QQ；2396097873）给予支持，
          毕竟服务器是别人的，我也需要给租赁费<br>
          3、服务器费用包括，租赁服务器费用、购买域名费用<br>
          4、至于软件开发的成本费、维护费、服务费概不收取<br/>
          5、本次服务器到期时间为<span style="color: red;font-weight: bold;font-size: 20px">2018年12月31</span>号，
          到期后，软件将无法使用。如果想使用请联系上面的QQ号<br/>
          6、此软件既可以在手机上使用，也可以在电脑上使用，在电脑上使用，建议下载使用chrome（谷歌）浏览器
        </div>
      </el-collapse-item>
      <el-collapse-item title="修改手机号码" name="2" class="setting-view-padding">
        <el-form ref="employ" label-width="100px">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入手机号码"></el-input>
            </el-col>
            <!--<el-col :span="12"><el-button type="danger" size="mini" @click="deleteCustom">删除该员工</el-button></el-col>-->
            <el-col :span="6">
              <el-button type="primary" size="mini" class="btn-confirm">确定修改</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
        <el-collapse-item title="信息反馈" name="3" class="setting-view-padding">
          <el-input class="last-textarea" type="textarea" placeholder="如果你还有什么功能想在软件中定制的，请填写你要做的功能"></el-input>
          <el-button style="margin-top: 10px" type="primary">提交建议</el-button>
        </el-collapse-item>
      </el-collapse>
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
        activeName: ''
      }
    },
    methods: {
      onToSelectRole: function () {
        this.$router.replace({name: 'selectRole'})
      }
    },
    mounted: function () {

    }
  }
</script>

<style scoped>
.setting-view-padding{
  padding-left: 10px;
}
  .btn-confirm{
    margin: 6px;
  }
  .last-textarea{
   padding-right: 10px;
  }
</style>
