// store/chat.js
import rootStore from "@/store/index.js"; // 根 store，用于提交到其他模块

export default {
  namespaced: true,

  state: () => ({
    ws: null, // WebSocket 实例
    status: "CLOSED", // 连接状态：CONNECTING / OPEN / CLOSED
    reconnection: 0, // 当前重连尝试次数
    max: 5, // 最大重连次数
    reconnectTimer: null, // 重连定时器ID
  }),

  actions: {
    /**
     * 初始化WebSocket连接
     * @param {Object} context - { commit, dispatch, state }
     */
    init({ commit, dispatch }) {
      // 重置WebSocket连接器
      commit("SET_WS", null);

      // 获取long-token，用于后端校验
      const token = localStorage.getItem("long-token");
      if (!token) {
        console.error("<store/chat.js>: lack long-token!");
        return;
      }

      // 尝试连接
      const wsUrl = `ws://localhost:8081/ws/chat?long-token=${token}`;
      const ws = new WebSocket(wsUrl);
      commit("SET_STATUS", "CONNECTING");
      commit("SET_WS", ws);

      // 注册核心回调
      ws.onopen = () => {
        console.log("WebSocket 连接成功");
        commit("SET_STATUS", "OPEN");
        commit("RESET_RECONNECTION");
      };
      ws.onmessage = (event) => {
        try {
          const newMsg = JSON.parse(event.data);
          // 将新消息追加到messageStore中
          rootStore.commit("messageStore/APPEND_MESSAGE", newMsg);
        } catch (e) {
          console.error("<store/chat.js>: ", e);
        }
      };
      ws.onerror = (error) => {
        console.error("<store/chat.js>: ", error);
        commit("SET_STATUS", "CLOSED");
      };
      ws.onclose = (event) => {
        console.log("<store/chat.js>: websocket disconnect", event);
        commit("SET_STATUS", "CLOSED");
        commit("SET_WS", null);
        // 触发重连
        dispatch("reconnect");
      };
    },

    /**
     * WebSocket重连，带指数退避和防并发
     * @param {Object} context - { state, commit, dispatch }
     */
    reconnect({ state, commit, dispatch }) {
      // 如果已经达到最大重连次数，不再尝试
      if (state.reconnection >= state.max) {
        console.warn("<store/chat.js>: reach max reconnection!");
        return;
      }

      // 如果当前状态是CONNECTING或OPEN，不重复触发重连
      if (state.status === "CONNECTING" || state.status === "OPEN") {
        return;
      }

      // 清除已有的重连定时器
      if (state.reconnectTimer) {
        clearTimeout(state.reconnectTimer);
        commit("SET_RECONNECT_TIMER", null);
      }

      // 计算退避时间：3s, 6s, 12s, 24s ... 最大 30s
      const delay = Math.min(3000 * Math.pow(2, state.reconnection), 30000);

      const timer = setTimeout(() => {
        commit("SET_RECONNECT_TIMER", null);
        dispatch("init");
      }, delay);

      commit("SET_RECONNECT_TIMER", timer);
      commit("INCREMENT_RECONNECTION");
    },

    /**
     * 发送消息
     * @param {Object} context
     * @param {Object} message 与后端的Message对象结构一致
     */
    send({ state }, message) {
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
        console.error("<store/chat.js>: can't send message!");
        return;
      }
      state.ws.send(JSON.stringify(message));
    },

    /**
     * 主动关闭连接（例如退出登录时调用）
     * @param {Object} context
     */
    close({ state, commit }) {
      // 清除重连定时器
      if (state.reconnectTimer) {
        clearTimeout(state.reconnectTimer);
        commit("SET_RECONNECT_TIMER", null);
      }
      if (state.ws) {
        state.ws.close();
        commit("SET_WS", null);
        commit("SET_STATUS", "CLOSED");
      }
    },

    /**
     * @description 清除关系
     * @returns {undefined}
     */
    clear({ commit }) {
      commit("SET_WS", null);
      commit("SET_STATUS", "CLOSED");
    },
  },

  mutations: {
    SET_WS(state, ws) {
      state.ws = ws;
    },
    SET_STATUS(state, status) {
      state.status = status;
    },
    INCREMENT_RECONNECTION(state) {
      state.reconnection++;
    },
    RESET_RECONNECTION(state) {
      state.reconnection = 0;
    },
    SET_RECONNECT_TIMER(state, timer) {
      state.reconnectTimer = timer;
    },
  },
};
