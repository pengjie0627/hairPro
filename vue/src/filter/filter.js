import Vue from 'vue'
export default class commonFilter {
  static init() {
    Vue.filter('shopSize', function (value) {
      if (value || value === 0) {
        switch (value) {
          case '0':
            return '5人以下'
          break;
          case '1':
            return '5-10人'
            break;
          case '2':
            return '10-50人'
            break;
          case '3':
            return '50人以上'
            break;
        }
      } else {
        return ''
      }
    })
    Vue.filter('amountFmt', function (value) {
      if (value) {
        return parseFloat(value).toFixed(2)
      } else {
        return '0.00'
      }
    })
  }
}
