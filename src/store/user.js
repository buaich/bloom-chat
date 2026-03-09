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
    async authenticate({ state }, { userName, userPhone, userPassword, way }) {
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

      console.log("<store/user.js>:authentication() execute, result:", result);
      // 更新state
      state.code = result.code;
      state.data = result.data;
      state.message = result.message;
    },
  },
};
