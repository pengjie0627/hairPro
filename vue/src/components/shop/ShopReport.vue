<template>
    <div>
      <HeaderView title="门店报表" :isShowBack="true"></HeaderView>
      <!--<ContentView>-->
        <!---->
      <!--</ContentView>-->
      <div :style="{height: height,overflow: 'auto'}">
        <el-tabs type="border-card">
          <el-tab-pane label="今天">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart1"></div>
            <div class="sum">合计总额：20000.00元</div>
          </el-tab-pane>
          <el-tab-pane label="本周">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart2"></div>
            <div class="sum">合计总额：20000.00元</div>
          </el-tab-pane>
          <el-tab-pane label="本月">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart3"></div>
            <div class="sum">合计总额：20000.00元</div>
          </el-tab-pane>
          <el-tab-pane label="本年">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart4"></div>
            <div class="sum">合计总额：20000.00元</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import echarts from 'echarts'
  export default {
    components: {
      HeaderView,
      ContentView
    },
    data() {
      return {
        chart: null,
        height: ''
      }
    },
    created: function() {
      this.height = document.documentElement.clientHeight - 100 + 'px'
    },
    methods: {
      initChart(chart, xData, yData) {
        chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }]
        })
      }
    },
    mounted: function () {
      let that = this
      this.chart1 = echarts.init(this.$refs.myEchart1);
      this.chart2 = echarts.init(this.$refs.myEchart2);
      this.chart3 = echarts.init(this.$refs.myEchart3);
      this.chart4 = echarts.init(this.$refs.myEchart4);
      this.initChart(this.chart1, [], [])
      this.initChart(this.chart2, [], [])
      this.initChart(this.chart3, [], [])
      this.initChart(this.chart4, [], [])
      window.onresize = function () {
        that.height = document.documentElement.clientHeight - 100 + 'px'
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    }
  }
</script>

<style scoped>
.sum{
  color: green;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
</style>
