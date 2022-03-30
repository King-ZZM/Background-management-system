import Vue from 'vue'
import App from './App.vue'
// 导入路由,全局使用
import router from './router'
// 引入local
import local from '@/utils/local'

// 优化页面滚动
import 'default-passive-events'

// 自定义指令
Vue.directive('auto',{
  inserted:function(el,data){
    let role = local.get('role')
    // console.log(el, data);
    if(role !== data.value){
      el.remove()  // 如果不等,就移除节点
    }
  }
})




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
