<template>
    <div>
      <HeaderView title="门店报表" :isShowBack="true"></HeaderView>
      <!--<ContentView>-->
        <!---->
      <!--</ContentView>-->
      <div :style="{height: height,overflow: 'auto'}">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="今天" name="tab1">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart1"></div>
            <div class="sum">合计总额：{{getSumAmount | amountFmt}}元</div>
          </el-tab-pane>
          <el-tab-pane label="本周" name="tab2">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart2"></div>
            <div class="sum">合计总额：{{getSumAmount | amountFmt}}元</div>
          </el-tab-pane>
          <el-tab-pane label="本月" name="tab3">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart3"></div>
            <div class="sum">合计总额：{{getSumAmount | amountFmt}}元</div>
          </el-tab-pane>
          <el-tab-pane label="本年" name="tab4">
            <div style="width: 300px;height: 300px;margin: 0 auto"  ref="myEchart4"></div>
            <div class="sum">合计总额：{{getSumAmount | amountFmt}}元</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import HeaderView from '@/components/cmp/HeaderView.vue'
  import ContentView from '@/components/cmp/contentView.vue'
  import echarts from 'echarts'
  import HttpClient from 'http/httpClient.js'
  export default {
    components: {
      HeaderView,
      ContentView
    },
    data() {
      return {
        chart: null,
        height: '',
        activeName: 'tab1',
        customArray: []
      }
    },
    watch: {
      activeName(newVal, oldVa) {
        let oDate = ''
        if (newVal === 'tab1') {
          oDate = 'today'
          this.getAmountByDate(oDate, this.chart1)
        } else if(newVal === 'tab2') {
          oDate = 'week'
          this.getAmountByDate(oDate, this.chart2)
        } else if(newVal === 'tab3') {
          oDate = 'month'
          this.getAmountByDate(oDate, this.chart3)
        } else {
          oDate = 'year'
          this.getAmountByDate(oDate, this.chart4)
        }
      }
    },
    created: function() {
      this.height = document.documentElement.clientHeight - 100 + 'px'
    },
    computed: {
      getSumAmount() {
        let oSum = 0
        this.customArray.forEach(item => {
          oSum += item.amount
        })
        return oSum
      }
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
            data: xData,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '金额',
            type: 'bar',
            barWidth: '60%',
            data: yData
          }]
        })
      },
      getAmountByDate(date, chart) {
        HttpClient.get(`/shop/reportAmount?shopUuid=${this.$route.query.uuid}&date=${date}`).then(resp => {
          if (resp.success) {
            this.customArray = resp.data
            if (resp.data && resp.data.length > 0) {
              let oX = []
              let oY = []
              resp.data.forEach(item => {
                oX.push(item.hairTime)
                oY.push(item.amount)
              })
              this.initChart(chart, oX, oY)
            }
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      }
    },
    mounted: function () {
      let that = this
      this.chart1 = echarts.init(this.$refs.myEchart1);
      this.chart2 = echarts.init(this.$refs.myEchart2);
      this.chart3 = echarts.init(this.$refs.myEchart3);
      this.chart4 = echarts.init(this.$refs.myEchart4);

      this.getAmountByDate('today', this.chart1)
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
