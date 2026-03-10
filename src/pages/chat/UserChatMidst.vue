<template>
  <div class="midst">
    <div class="header">
      <p class="target">{{ name }}</p>
    </div>

    <div class="messages-container" ref="box">
      <div
        v-for="(msg, idx) in currentMessages"
        :key="idx"
        class="message"
        :class="{ 'message-sent': msg.senderName === currentUser }"
      >
        <div class="message-content">
          <span class="sender">{{ relations.friendName }}:</span>
          <span class="text">{{ msg.content }}</span>
          <span class="time">{{ formatTime(msg.timestamp) }}</span>
        </div>
      </div>
    </div>

    <div v-show="name !== ''" class="input-box-wrapper">
      <input placeholder="Type a message..." class="input-box" />
      <button class="btn">Send</button>
    </div>
  </div>
</template>

<script>
import legman from "@/utils/legman/bus.js";

export default {
  name: "UserChatMidst",
  data() {
    return {
      name: "",
      timerId: null, //计时器id
      currentTime: "",
    };
  },

  methods: {},

  created() {
    // 监听事件，获取聊天对象的名称
    legman.on("chat", ({ name }) => (this.name = name));
  },
};
</script>

<style scoped>
/* 原窗口样式 */
.midst {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}
.header {
  padding: 10px 15px;
  background: #ecf0f1;
  border-bottom: 1px solid #ddd;
  display: flex;
}
.messages-container {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
}
.message {
  margin-bottom: 12px;
  display: flex;
}
.message-sent {
  justify-content: flex-end;
}
.message-content {
  display: inline-block;
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 18px;
  background: #e3f2fd;
}
.message-sent .message-content {
  background: #c8e6c9;
  border-radius: 18px 6px 18px 18px;
}
.sender {
  font-weight: bold;
  font-size: 0.85em;
  color: #2c3e50;
  display: block;
}
.text {
  display: block;
  margin-top: 4px;
  line-height: 1.4;
}
.time {
  font-size: 0.7em;
  color: #7f8c8d;
  display: block;
  margin-top: 4px;
  text-align: right;
  opacity: 0.7;
}

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
