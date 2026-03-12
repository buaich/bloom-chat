import userHttp from "@/utils/network/user";

export default {
  namespaced: true,

  state: () => ({
    code: null, //用户业务状态码
    data: null, //响应体
    message: "", //响应中的业务信息
  }),

  actions: {
    async getAllMessages({ commit, rootState }, { receiver }) {
      // 获取当前登录的用户名
      const sender = rootState.userStore.data.userName;

      try {
        // 异步获取消息列表
        const result = await userHttp.get(`/message/${sender}/${receiver}`);

        // 同步更新state
        commit("SET_CODE", result.code);
        commit("SET_DATA", result.data);
        commit("SET_MESSAGE", result.message);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description 清除消息
     * @returns {undefined}
     */
    clear({ commit }) {
      commit("SET_CODE", null);
      commit("SET_DATA", null);
      commit("SET_MESSAGE", "");
    },
  },

  mutations: {
    SET_CODE(state, newCode) {
      state.code = newCode;
    },

    SET_DATA(state, newData) {
      state.data = newData;
    },

    SET_MESSAGE(state, newMessage) {
      state.message = newMessage;
    },

    APPEND_MESSAGE(state, newMessage) {
      if (!Array.isArray(state.data)) {
        state.data = [];
      }
      state.data.push(newMessage);
    },
  },
  /**
   * @description 清除消息
   * @returns {undefined}
   */
  clear({ commit }) {
    commit("SET_CODE", null);
    commit("SET_DATA", null);
    commit("SET_MESSAGE", "");
  },
};
