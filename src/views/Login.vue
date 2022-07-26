<template>
  <div>
    <input type="text" placeholder="请输入用户名" v-model="username"/>
    <button @click="enterClick">进入</button>
  </div>
</template>

<script>
import {login} from "@/api/login";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
    }
  },
  methods: {
    enterClick() {
      if (this.username) {
        console.log("username:" + this.username)
        // 保存用户名
        localStorage.setItem("username", this.username);
        login(this.username).then(res => {
          if (res.data.status === 200) {
            // 跳转页面
            this.$router.replace('/chat')
          }
        })
      } else {
        alert("请输入用户名！")
      }
    }
  },
}
</script>
