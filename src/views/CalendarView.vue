<template>
  <div class="calendar-view">
    <header class="topbar">
      <h2>日历</h2>
      <button @click="logout">退出登录</button>
    </header>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue'

export default {
  name: 'CalendarView',
  components: { Calendar },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
button {
  background: #ff6b6b;
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #e65a5a;
}
</style>

