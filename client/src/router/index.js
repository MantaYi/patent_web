import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
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
