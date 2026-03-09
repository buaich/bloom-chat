<template>
  <div class="user-register">
    <h1 class="user-register-title">register</h1>
    <div class="user-register-form">
      <div class="form-item">
        <input type="text" v-model="userName" placeholder="username" required />
      </div>
      <div class="form-item">
        <input
          type="text"
          v-model="userPhone"
          placeholder="phone number"
          required
        />
      </div>
      <div class="form-item">
        <input
          type="password"
          v-model="userPassword"
          placeholder="user password"
          required
        />
      </div>
      <div class="form-item">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="confirm password"
          required
        />
      </div>
      <div class="btn-wrapp">
        <button class="btn btn-register" @click.prevent="register">
          register
        </button>
        <button class="btn btn-login" @click="goToLogin">login</button>
      </div>
    </div>
    <p v-if="message !== ''">{{ message }}</p>
  </div>
</template>

<script lang="js">
import { mapActions,mapState } from 'vuex';

export default {
  name: "UserRegister",
  data() {
    return {
      userName: "",
      userPhone:"",
      userPassword: "",
      confirmPassword: "",
      ...mapState("userStore",["message"])
    };
  },
  methods: {
    ...mapActions("userStore",["authenticate"]),

    register() {
      // 密码输入不一致
      if (this.userPassword !== this.confirmPassword) {
        console.log(this.userPassword, this.confirmPassword);

      }

      // 调用统一API进行认证
      this.authenticate({userName:this.userName, userPhone:this.userPhone,userPassword:this.userPassword,way:"register"})
    },

    goToLogin(){
      this.$router.push({name:"login"})
    }
  },
};
</script>

<style scoped>
/* #region 总体样式 */
.user-register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
}
.user-register-title {
  font-size: 32px;
  margin-bottom: 20px;
  text-transform: capitalize;
}
.user-register-form {
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
.btn-register {
  background-color: #795548;
  color: white;
  margin-right: 10px;
}
.btn-register:hover {
  opacity: 0.9;
}

.btn-login {
  background-color: #2196f3;
  margin-right: 10px;
  color: white;
}
.btn-login:hover {
  opacity: 0.9;
}
</style>
