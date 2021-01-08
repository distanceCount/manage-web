import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './config/http'
import MyComponent from './components/MyComponent'
import qs from 'qs'
Vue.prototype.$qs=qs;
Vue.use(MyComponent);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)  // 把 App变量的 数据填充到#app的div中
}).$mount('#app')
