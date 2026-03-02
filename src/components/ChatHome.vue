<template>
  <div class="chat-home" :class="{ moon: isNight }" ref="chatHome">
    <!-- 主页主题 -->
    <div class="chat-home-theme" @click="changeTheme">
      <!-- 主题标识图 -->
      <img class="theme-tag" :src="dynamicThemeTagSrc" />
      <!-- 主题名称 -->
      <span class="theme-name">{{ dynamicThemeName }}</span>
    </div>
    <!-- 主页名称 -->
    <h1 class="chat-home-name" ref="chatHomeName">night chat</h1>
    <!-- 主页按钮 -->
    <div class="chat-home-buttons">
      <router-link to="/login" class="btn btn-login"
        >&nbsp;login&nbsp;</router-link
      >
      <router-link to="/register" class="btn btn-register"
        >register</router-link
      >
    </div>
  </div>
</template>

<script>
// 引用图片资源
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

export default {
  name: "ChatHome", //指定组件名称

  data() {
    return {
      isNight: true, //主题标识

      moonSrc: moon, //主题标识图src
      sunSrc: sun,
    };
  },

  computed: {
    //动态主题图src
    dynamicThemeTagSrc() {
      return this.isNight ? this.moonSrc : this.sunSrc;
    },

    //动态主题名称
    dynamicThemeName() {
      return this.isNight ? "night" : "light";
    },
  },

  methods: {
    changeTheme() {
      this.isNight = !this.isNight; //更改主题标识
      if (this.isNight) {
        this.$refs.chatHome.style.color = "white"; //更改字体颜色
        this.$refs.chatHomeName.innerText = "night chat"; //更改主页名称
      } else {
        this.$refs.chatHome.style.color = "gray";
        this.$refs.chatHomeName.innerText = "light chat";
      }
    },
  },
};
</script>

<style scoped>
/* #region chat-home 默认为夜晚主题 */
.chat-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
  border-top-left-radius: 20px;
  transition: all 0.5s ease;
}
/* 夜晚 */
.chat-home.moon {
  background-color: #121212;
  color: #ffffff;
}
/* #endregion */

/* #region chat-home-theme */
.chat-home-theme {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.theme-tag {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.theme-name {
  margin-right: 20px;
  border: 1px solid transparent;
  height: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* #endregion */

/* #region chat-home-name */
.chat-home-name {
  margin-top: 100px;
  font-size: 50px;
}
/* #endregion */

/* #region chat-home-buttons */
.chat-home-buttons {
  margin-top: 30px;
}
.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-login {
  background-color: #2196f3;
  color: white;
}

.btn-register {
  background-color: #795548;
  color: white;
}

.btn-login:hover,
.btn-register:hover {
  opacity: 0.9;
}
/* #endregion */
</style>
