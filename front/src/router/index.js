import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/",
    name: "auth",
    component: Auth,
  },
];

function ifAuthenticated  (to, from, next)  {
  if (localStorage.getItem("user")) {
   next();
   return;
 }
  router.push({  name: 'auth' });
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;