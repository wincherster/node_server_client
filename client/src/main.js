import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import _ from "lodash"; // 深拷贝

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
