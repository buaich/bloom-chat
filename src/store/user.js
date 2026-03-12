import userHttp from "@/utils/network/user";

export default {
  namespaced: true, //开启命名空间

  state: () => ({
    code: null, //用户业务状态码
    data: null, //响应体
    message: "", //响应中的业务信息
  }),

  actions: {
    /**
     * @description 用户认证
     * @param {Object} state -当前模块的state
     * @param {string} userName -用户名
     * @param {string} userPhone -用户电话号码
     * @param {string} userPassword -用户密码
     * @param {string} way -认证方式
     * @returns {undefined}
     */
    async authenticate({ commit }, { userName, userPhone, userPassword, way }) {
      let result = null;

      if (way === "login") {
        result = await userHttp.post("/user/login", {
          userName,
          userPassword,
        });
      } else if (way === "register") {
        result = await userHttp.post("/user/register", {
          userName,
          userPhone,
          userPassword,
        });
      } else {
        return;
      }

      // 同步更新state
      commit("SET_CODE", result.code);
      commit("SET_DATA", result.data);
      commit("SET_MESSAGE", result.message);
    },

    /**
     * @description 清除用户信息
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
