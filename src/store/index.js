import Vue from "vue";
import Vuex from "vuex";
import userStore from "./user.js";
import chatStore from "./chat.js";
import relationStore from "./relation.js";
import messageStore from "./message.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    chatStore,
    relationStore,
    messageStore,
  },
});
