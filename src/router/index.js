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
    next: "/dashboard"
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
    meta: { requiresAuth: true },
  },
  {
    path: "/game/:id",
    component: GamePage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next({ path: "/login" });
  } else if (to.path === "/login" && currentUser) {
    next("/");
  }
});

export default router;
