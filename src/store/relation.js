import userHttp from "@/utils/network/user";

export default {
  namespaced: true,

  state: () => ({
    code: null, //用户业务状态码
    data: null, //响应体
    message: "", //响应中的业务信息
  }),

  actions: {
    /**
     * @description 获取用户关系
     * @param {Object} state - 当前模块的state
     * @param {string} userName -用户名
     * @returns {undefined}
     */
    async getAllRelations({ commit }, { userName }) {
      if (userName === "") return;

      try {
        const result = await userHttp.get(`/user/relation/all/${userName}`);

        // 同步更新state
        commit("SET_CODE", result.code);
        commit("SET_DATA", result.data);
        commit("SET_MESSAGE", result.message);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description 清除关系
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
  },
};
