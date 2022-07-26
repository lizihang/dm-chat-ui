<template>
  <div class="chat-header">
    <div class="chat-header-query">
      <el-button @click="logout">登出</el-button>
    </div>
    <div class="chat-header-current">
      <p>{{ username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 头
  name: "ChatHeader",
  props: {
    username: String,
  },
  methods: {
    logout() {
      localStorage.removeItem("username")
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.chat-header {
  display: flex;
  width: 100%;
  height: 8%;
}

.chat-header-query {
  border-right: 1px solid black;
  width: 20%;
}

.chat-header-current {
  width: 80%;
}
</style>