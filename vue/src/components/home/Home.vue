<template>
    <div>
      <router-view></router-view>
      <footer class="footer">
        <el-row>
          <el-col :style="{color: selectIndex === 0 ? '#409EFF' : ''}" :span="6" class="col-padding">
            <div @click="onSelect(0)">
              <div class="center"><i class="el-icon-mobile-phone"></i></div><div class="center">门店管理</div>
            </div>
          </el-col>
          <el-col :style="{color: selectIndex === 1 ? '#409EFF' : ''}" :span="6" class="col-padding">
            <div @click="onSelect(1)">
              <div class="center"><i class="el-icon-service"></i></div><div class="center">员工管理</div>
            </div>
          </el-col>
          <el-col :style="{color: selectIndex === 2 ? '#409EFF' : ''}" :span="6" class="col-padding">
            <div @click="onSelect(2)">
              <div class="center"><i class="el-icon-search"></i></div><div class="center">客户管理</div>
            </div>
          </el-col>
          <el-col :style="{color: selectIndex === 3 ? '#409EFF' : ''}" :span="6" class="col-padding">
            <div @click="onSelect(3)">
              <div class="center"><i class="el-icon-setting"></i></div><div class="center">个人设置</div>
            </div>
          </el-col>
        </el-row>
      </footer>
    </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  export default {
    components: {
      HeaderView
    },
    data() {
      return {
        selectIndex: 0
      }
    },
    methods: {
      onSelect: function (index) {
        this.selectIndex = index
        switch (index) {
          case 0:
            this.$router.push('shopList')
                break
          case 1:
            this.$router.push('employList')
            break
          case 2:
            this.$router.push('customList')
            break
          case 3:
            this.$router.push('settingList')
            break
        }
      }
    }
  }
</script>

<style scoped>
.footer{
  height: 50px;
  background: #e4e7ed;
  bottom: 0;
  position: fixed;
  width: 100%;
}
  .center{
    text-align: center;
  }
  .col-padding{
    padding: 5px;
  }
</style>
