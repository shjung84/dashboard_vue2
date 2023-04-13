import "@/assets/css/normalize.css";
import "@/assets/css/layout.scss";
import "@/assets/css/style.scss";
import "@/assets/css/vue2-scrollbar.scss";
import "@/assets/css/tailwindcss.css";
import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "store";

import VueScrollbar from "vue2-scrollbar";
import ElementUI from "element-ui";
import VCalendar from "v-calendar";

import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

Vue.config.productionTip = false;

Vue.use(VueScrollbar);
Vue.use(ElementUI, {
  size: "small",
  zIndex: 3000,
});
Vue.use(VCalendar, {
  // componentPrefix: "vc",
});

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
