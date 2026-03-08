import userHttp from "@/utils/network/user";

export default {
  namespaced: true, //开启命名空间
  state: () => ({
    code: null, //用户业务状态码
    data: null, //响应体
    message: "", //响应中的业务信息
  }),

  actions: {
    // 用户登录
    async login({ state }, { userName, userPassword }) {
      const result = await userHttp.post("/user/login", {
        userName,
        userPassword,
      });

      console.log("<store/user.js>:login() execute, result:", result);

      state.code = result.code;
      state.data = result.data;
      state.message = result.message;
    },
  },

  mutations: {},
};
