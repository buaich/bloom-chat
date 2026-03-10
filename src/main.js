import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import VueTutClock from "vue-tut-clock";

Vue.config.productionTip = false;

Vue.use(VueTutClock);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
