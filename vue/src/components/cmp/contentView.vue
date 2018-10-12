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
    this.deviceHeight = (document.documentElement.clientHeight - this.$parent.$children[0].$refs.header.clientHeight)+'px'
  }
}
</script>

<style scoped>
.content-view{
  background: white;
}
</style>
