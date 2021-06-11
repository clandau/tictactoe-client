import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import GamePage from "../views/GamePage";
import { auth } from "@/firebaseConfig";

Vue.use(VueRouter);

const routes = [
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
    path: "/gamepage",
    component: GamePage,
    name: "GamePage",
    props: true,
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
  } else if (currentUser && to.path === "/login" || to.path === "/" ) {
    next({ path: "/dashboard"});
  } else next()
});

export default router;
