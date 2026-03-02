<template>
  <div id="app">
    <ChatHome></ChatHome>
  </div>
</template>

<script>
import ChatHome from "./components/ChatHome.vue";

export default {
  name: "App",
  components: { ChatHome },
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
