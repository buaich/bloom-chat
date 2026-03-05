<template>
  <div class="user-register">
    <h1 class="user-register-title">register</h1>
    <form class="user-register-form">
      <div class="form-item">
        <input type="text" v-model="username" placeholder="username" required />
      </div>
      <div class="form-item">
        <input type="text" v-model="sex" placeholder="sex" required />
      </div>
      <div class="form-item">
        <input
          type="password"
          v-model="password"
          placeholder="password"
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
        <button class="btn btn-register" @click="onSubmit">register</button>
        <button class="btn btn-login" @click="goToLogin">login</button>
      </div>
    </form>
  </div>
</template>

<script lang="js">
import axios from 'axios';

export default {
  name: "UserRegister",
  data() {
    return {
      username: "",
      sex:"",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      axios.post("http://localhost:3000/api/user/register",{
        username:this.username,
        password:this.password,
        sex:this.sex
      })
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
