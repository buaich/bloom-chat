<template>
  <div class="user-login">
    <!-- 用户登录界面标题 -->
    <h1 class="user-login-title">login</h1>
    <!-- 用户登录表单 -->
    <form class="user-llogin-form">
      <!-- 用户名输入框 -->
      <div class="form-item">
        <input type="text" v-model="username" placeholder="username" required />
      </div>
      <div class="form-item">
        <!-- 密码输入框 -->
        <input
          type="password"
          v-model="password"
          placeholder="password"
          required
        />
      </div>
      <div class="btn-wrapper">
        <button class="btn btn-login" @click.prevent="login">login</button>
        <button class="btn btn-register" @click.prevent="goToRegister">
          register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="js">
import userHttp from '@/utils/network/user';

export default {
  name: "UserLogin",
  data() {
    return {
      username: "", //用户名
      password: "", //密码
    };
  },
  methods: {

    login() {
      if(this.username !== "" || this.password !== ""){
        userHttp.post("/user/login",{
          userName:this.username,
          userPassword:this.password
        })
      }
    },

    // 编程式路由导航，跳转到注册页
    goToRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
/* #region 总体样式 */
.user-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
}
.user-login-title {
  font-size: 32px;
  margin-bottom: 20px;
  text-transform: capitalize;
}
.user-login-form {
  width: 300px;
  display: flex;
  flex-direction: column;
}
/* #endregion */

.form-item {
  margin-bottom: 15px;
}
.form-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-wrapper {
  display: flex;
}
.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 auto;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-login {
  background-color: #2196f3;
  color: white;
  margin-right: 10px;
}
.btn-login:hover {
  opacity: 0.9;
}
.btn-register {
  background-color: orange;
}
</style>
