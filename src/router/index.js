import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import GamePage from "../views/GamePage";
import { auth } from "@/firebaseConfig";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/game/:id",
    component: GamePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.path === "/login") {
      next();
    } else {
      const user = await auth.getCurrentUser()
      console.log(user)
      console.log(auth.currentUser)
      if (auth.currentUser === null) {
        console.log("here")
        next({ path: "/login" })
      }
    }
    next();
  });

export default router;
