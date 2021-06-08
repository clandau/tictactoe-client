import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import GamePage from "../components/GamePage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../component/Login.vue"),
  },
  { 
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/game/:id",
    component: GamePage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
