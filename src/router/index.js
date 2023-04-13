// import { createWebHistory, createRouter } from "vue-router";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Layout from "@/layout/page";
import PageNotFound from "@/views/PageNotFound.vue";

// 라우터 인스턴스 생성
var router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/MainPage",
      component: Layout,
      children: [
        {
          path: "/MainPage",
          component: () => import("@/views/MainPage"),
          meta: {
            title: "MainPage",
            depth: "0",
          },
        },
        {
          path: "Page1",
          component: () => import("@/views/Page1"),
          meta: {
            title: "Page1",
            depth: "1",
          },
          props: true,
        },
        {
          path: "Page2",
          component: () => import("@/views/Page2"),
          meta: {
            title: "Page2",
            depth: "2",
          },
        },
        {
          path: "Page3",
          component: () => import("@/views/Page3"),
          meta: {
            title: "Page3",
            depth: "3",
          },
        },
        {
          path: "Page4",
          component: () => import("@/views/Page4"),
          meta: {
            title: "Page4",
            depth: "4",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    },
    {
      path: "/404",
      component: PageNotFound,
      meta: {
        title: "PageNotFound",
      },
    },
  ],
});

// 인스턴스에 라우터 인스턴스를 등록
new Vue({
  router: router,
});

export default router;
