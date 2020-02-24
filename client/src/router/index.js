import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')
  },
  {
    path: "/consult",
    name: "Consult",
    component: () =>
      import("../views/consultViews/Consult.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
