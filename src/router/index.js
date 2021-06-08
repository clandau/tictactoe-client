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

router.beforeEach((to, from, next) => {
  console.log(to, from)
    if (to.path === "/login") {
      console.log("here")
      next();
    } else {
      if (!auth.currentUser) {
        next({ path: "/login" })
      }
    }
  })

export default router;
