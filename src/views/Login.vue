<template>
  <div class="login-container">
    <h1>登录</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input id="username" v-model.trim="form.username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input id="password" v-model.trim="form.password" type="password" placeholder="请输入密码" />
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit">登录</button>
    </form>
  </div>
  
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    validate() {
      if (!this.form.username) {
        this.errorMessage = '请输入用户名'
        return false
      }
      if (!this.form.password) {
        this.errorMessage = '请输入密码'
        return false
      }
      this.errorMessage = ''
      return true
    },
    onSubmit() {
      if (!this.validate()) return
      // Fake auth: accept any non-empty username/password
      localStorage.setItem('token', 'demo-token')
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  text-align: left;
}
.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 6px;
  font-weight: 600;
}
input[type="text"], input[type="password"] {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.error {
  color: #d93025;
  margin-bottom: 12px;
}
button[type="submit"] {
  width: 100%;
  background: #42b983;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
}
button[type="submit"]:hover {
  background: #359a6f;
}
</style>

