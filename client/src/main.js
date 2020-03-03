import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入Element-UI配置文件
import "./plugins/element.js";

Vue.config.productionTip = false;

//进入下一个页面后自动跳转到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

//实例化一个Vue对象
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
