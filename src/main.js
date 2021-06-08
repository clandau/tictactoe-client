import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "@/firebaseConfig";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

auth.onAuthStateChanged((user) => {
  console.log(user);
});