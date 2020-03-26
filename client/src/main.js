import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入Element-UI配置文件
import "./plugins/element.js";
//引入axios
import axios from 'axios';

import Router from 'vue-router'

//vue-router版本问题配置
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

//axios配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//进入下一个页面后自动跳转到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

//实例化一个Vue对象
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
