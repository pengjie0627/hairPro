import Vue from 'vue'
// 自定义指令标准模板
export default class CommonDirective {
  static init() {
    Vue.directive('formValidate', {
      bind: function (el, bind, newVNode){
        console.log('bind');
      },
      inserted: function (el, bind, newVNode){
        console.log('inserted');
      },
      update: function (el, bind, newVNode, oldVNoe){
        console.log('update');
        console.log(el)
        console.log(bind)
        console.log(newVNode)
        console.log(oldVNoe)
        if (!bind.value) {
          el.children[0].style.border = '1px solid red'
          el.focus()
        } else {
          el.children[0].style.border = '1px solid #dcdfe6'
        }
      },
      componentUpdated: function (el, bind, newVNode, oldVNoe){
        console.log('componentUpdated');
      },
      unbind: function (el, bind, vNode){
        console.log('unbind');
      }
    })
  }
}
