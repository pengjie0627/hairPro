<template>
    <div class="content-view" :style="{height: deviceHeight, overflow: 'auto'}">
      <slot></slot>
    </div>
</template>

<script>
export default {
  data() {
    return {
      deviceHeight: ''
    }
  },
  mounted: function () {
    this.deviceHeight = (document.documentElement.clientHeight - this.$parent.$children[0].$refs.header.clientHeight) - 50 +'px'
    this.windowChange()
  },
  methods: {
    windowChange() {
      let that = this
      window.onresize = function () {
        that.deviceHeight = (document.documentElement.clientHeight - that.$parent.$children[0].$refs.header.clientHeight) - 50 +'px'
      }
    }
  }
}
</script>

<style scoped>
.content-view{
  background: white;
  margin-bottom: 60px;
}
</style>
