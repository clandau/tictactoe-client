import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "@/firebaseConfig";
import vuetify from "./plugins/vuetify";

let app = null;

Vue.config.productionTip = false;

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
          this.$router.push({ name: "Login" });
        }
      },

      vuetify,
      render: (h) => h(App, { props: { user } }),
    }).$mount("#app");
  }
});
