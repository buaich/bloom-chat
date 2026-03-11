<template>
  <div class="midst">
    <div class="header">
      <p class="target">{{ receiver }}</p>
      <p :class="'status-' + status">{{ status }}</p>
    </div>

    <div class="messages">
      <div
        v-for="{ content, sender, createdAt, messageId } in messages"
        :key="messageId"
        class="message-wrapper"
        :class="{ 'message-sender': currentUser === sender }"
      >
        <div class="message">
          <span class="sender-name">{{ sender }}:</span>
          <span class="content">{{ content }}</span>
          <span class="time-strip">{{ createdAt }}</span>
        </div>
      </div>
    </div>

    <div v-show="receiver !== ''" class="input-box-wrapper">
      <input placeholder="Type a message..." class="input-box" />
      <button class="btn">Send</button>
    </div>
  </div>
</template>

<script>
import legman from "@/utils/legman/bus.js";
import rootStore from "@/store/index.js";

export default {
  name: "UserChatMidst",
  data() {
    return {
      currentUser: rootStore.state.userStore.data.userName,
      receiver: "",
      status: "offline",
      messages: null,
    };
  },

  methods: {},

  created() {
    // 监听事件，获取聊天对象名称以及消息列表
    legman.on("chat", ({ receiver, messages }) => {
      this.receiver = receiver;
      this.messages = messages;
    });
  },
};
</script>

<style scoped>
/* #region 整体布局样式 */
.midst {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}
/* #endregion */

/* #region 头部展示栏样式 */
.header {
  height: 40px;
  background: #ecf0f1;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
.target {
  margin-right: 5px;
}
.status-offline {
  color: red;
}
.status-online {
  color: greenyellow;
}
/* #endregion */

/* #region 消息相关样式 */
.messages {
  flex: 1;
  padding: 15px;
  /* 超过父元素高度，自动开启滚动条 */
  overflow-y: auto;
  background: #f9f9f9;
}
.message-wrapper {
  margin-bottom: 12px;
  display: flex;
}
.message-sender {
  justify-content: flex-end;
}
.message {
  display: inline-block;
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 18px;
  background: #e3f2fd;
}
.message-sender .message {
  background: #c8e6c9;
  border-radius: 18px 6px 18px 18px;
}
.sender-name {
  font-weight: bold;
  font-size: 0.85em;
  color: #2c3e50;
  display: block;
}
.content {
  display: block;
  margin-top: 4px;
  line-height: 1.4;
}
.time-strip {
  font-size: 0.7em;
  color: #7f8c8d;
  display: block;
  margin-top: 4px;
  text-align: right;
  opacity: 0.7;
}
/* #endregion */

/* #region 聊天输入框相关样式 */
.input-box-wrapper {
  display: flex;
  padding: 12px 15px;
  background: white;
  border-top: 1px solid #eee;
}
.input-box {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}
.input-box:focus {
  outline: none;
  border-color: #3498db;
}
.btn {
  padding: 0 20px;
  margin-left: 10px;
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
.btn:hover {
  background: rgb(148, 233, 20);
}
/* #endregion */
</style>
