<template>
  <div class="chat-container">
    <UserChatTop />
    <div class="chat-main">
      <UserChatLeft />
      <UserChatMidst />
    </div>
  </div>
</template>

<script>
import UserChatLeft from "./chat/UserChatLeft.vue";
import UserChatMidst from "./chat/UserChatMidst.vue";
import UserChatTop from "./chat/UserChatTop.vue";

export default {
  name: "UserChatLayout",
  components: { UserChatLeft, UserChatMidst, UserChatTop },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.chat-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
