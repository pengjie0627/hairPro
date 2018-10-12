<template>
    <div class="header-view" ref="header">
      <el-row>
        <el-col :span="leftSpan" class="text">
          <slot name="left"></slot>
        </el-col>
        <el-col :span="getCenterSpan">{{title}}</el-col>
        <el-col :span="rightSpan" class="text">
          <slot name="right"></slot>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    leftSpan: {
      type: Number,
      default: 4
    },
    rightSpan: {
      type: Number,
      default: 4
    }
  },
  computed: {
    getCenterSpan: function () {
      return 24 - this.leftSpan - this.rightSpan
    }
  }
}
</script>

<style scoped>
.header-view{
  text-align: center;
  background: #409EFF;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: white;
}
  .text{
    font-size: 15px;
  }
</style>
