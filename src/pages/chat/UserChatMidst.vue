<template>
  <div class="chat-area">
    <div class="chat-header">
      <h3>friend name</h3>
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

    <div class="input-area">
      <input placeholder="Type a message..." class="message-input" />
      <button class="send-btn">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserChatMidst",
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 原窗口样式 */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}
.chat-header {
  padding: 10px 15px;
  background: #ecf0f1;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
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
.input-area {
  display: flex;
  padding: 12px 15px;
  background: white;
  border-top: 1px solid #eee;
}
.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}
.message-input:focus {
  outline: none;
  border-color: #3498db;
}
.send-btn {
  padding: 0 20px;
  margin-left: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
.send-btn:hover {
  background: #2980b9;
}
</style>
