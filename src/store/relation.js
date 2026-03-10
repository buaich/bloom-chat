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
    async getAllRelations({ state }, { userName }) {
      if (userName === "") return;

      try {
        const result = await userHttp.get(`/user/relation/all/${userName}`);
        console.log(result);

        state.code = result.code;
        state.message = result.message;
        state.data = result.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
