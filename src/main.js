import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "@/firebaseConfig";

let app = null;

Vue.config.productionTip = false

auth.onAuthStateChanged(async () => {
  if (!app) {
      //wait to get user
      const user = await auth.currentUser;
  
      //start app
      app = new Vue({
        router,
        created() {
          //redirect if user not logged in
          if (!user) {
            this.$router.push("/login");
          }
        },
        render: h => h(App)
      }).$mount("#app");
    }
  });
