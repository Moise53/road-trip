import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;