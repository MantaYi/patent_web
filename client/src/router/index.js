import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () =>
      import('../views/homeViews/Home.vue')
  },
  {
    path: "/consult",
    name: "Consult",
    component: () =>
      import("../views/consultViews/Consult.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/userViews/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/userViews/Register.vue")
  },
  {
    path: "/space",
    name: "Space",
    component: () =>
      import("../views/userViews/space/Space.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
