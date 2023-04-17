import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import ConfirmationPage from "../views/ConfirmationPage.vue";
import HistoryPage from "../views/HistoryPage.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: ConfirmationPage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryPage,
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