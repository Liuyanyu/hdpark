import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";

import login from "@/views/login";
import permission from "@/views/permission";

import environAware from "@/views/environAware";
import energyPerception from "@/views/energyPerception";
import trafficManagement from "@/views/trafficManagement";
import operating from "@/views/operating";
import intelligentSecurity from "@/views/intelligentSecurity";

import lighting from "@/views/lighting";
import irrigate from "@/views/irrigate";
import curing from "@/views/curing";
import landscape from "@/views/landscape";

import ElectricityPanel from "@commons/energyPerceptionCommons/ElectricityPanel";
import EnergySynthetical from "@commons/energyPerceptionCommons/EnergySynthetical";
import WaterPanel from "@commons/energyPerceptionCommons/WaterPanel";

import CommonWarn from "@commons/CommonWarn";
Vue.use(Router);
// 页面刷新时，重新赋值token
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    //  {
    //    path: "/",
    //    name: "login",
    //    component: login
    //  },
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      name: "permission",
      path: "/permission",
      component: permission
    },
    {
      name: "environAware",
      path: "/environAware",
      component: environAware
    },
    {
      name: "energyPerception",
      path: "/energyPerception",
      component: energyPerception
    },
    {
      name: "trafficManagement",
      path: "/trafficManagement",
      component: trafficManagement
    },
    {
      name: "operating",
      path: "/operating",
      component: operating
    },
    {
      name: "intelligentSecurity",
      path: "/intelligentSecurity",
      component: intelligentSecurity
    },
    {
      name: "lighting",
      path: "/lighting",
      component: lighting
    },
    {
      name: "irrigate",
      path: "/irrigate",
      component: irrigate
    },
    {
      name: "curing",
      path: "/curing",
      component: curing
    },
    {
      name: "landscape",
      path: "/landscape",
      component: landscape
    },
    {
      name: "ElectricityPanel",
      path: "/ElectricityPanel",
      component: ElectricityPanel
    },
    {
      name: "EnergySynthetical",
      path: "/EnergySynthetical",
      component: EnergySynthetical
    },
    {
      name: "WaterPanel",
      path: "/WaterPanel",
      component: WaterPanel
    },
    {
      name: "CommonWarn",
      path: "/CommonWarn",
      component: CommonWarn
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   //debugger
//   if (to.path === '/src/views/login') {
//     next();
//   } else {
//     let token = sessionStorage.getItem('Authorization');
//     if (!token) {
//       next('/src/views/login');
//     } else {
//       next();
//     }
//   }
// });
