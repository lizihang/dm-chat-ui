<template>
  <div class="home">
    <el-container>
      <el-header height="65px" style="padding: 0">
        <el-row>
          <h1>简易聊天室</h1>
          <el-button type="primary" @click="logout">登出</el-button>
        </el-row>
        <el-row>
          欢迎 {{ username }}
        </el-row>
      </el-header>
      <el-main>
        <div style="width: 800px">
          <el-row>
            <p>toName<input type="text" v-model="toName"/></p>
          </el-row>
          <el-row>
            <el-col :span="20" class="msg-content">
              <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
                <div ref="innerRef">
                  <div v-for="item in msgList" :key="item" >
                    <p v-if="item.fromName===this.username" class="msg-send"> 发送给{{ item.toName }}：{{ item.message }} </p>
                    <p v-else class="msg-receive"> 接收到{{ item.fromName }}：{{ item.message }} </p>
                  </div>
                </div>
              </el-scrollbar>
            </el-col>
            <el-col :span="4" class="msg-content">
              <el-button class="user-list-button" v-for="user in userList" :key="user" @click="chooseUser(user.username)">
                {{ user.username }}
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-input type="textarea" :rows="2" v-model="msg"/>
            <el-button type="primary" @click="sendMsg">发送</el-button>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import useWebsocket from "../api/websocket";

export default {
  name: 'HomeView',
  data() {
    return {
      ws: {},
      username: '',
      toName: '',
      msg: '',
      count: 10,
      msgList: [],
      userList: [
        {
          username: 'admin'
        },
        {
          username: 'dm',
        }
      ],
    }
  },
  methods: {
    logout() {
      console.log("username:" + this.username)
      this.ws.close()
      // 保存用户名
      localStorage.removeItem("username");
      // 跳转页面
      this.$router.replace('/login')
    },

    sendMsg() {
      let _msg = this.msg
      if (!_msg.trim()) {
        return;
      }
      let msgItem = {
        fromName: this.username,
        toName: this.toName,
        message: this.msg
      }
      this.ws.send(JSON.stringify(msgItem))
      //
      this.msgList.push(msgItem);
      // 滚动到底部
      this.scrollAfterSend();
      this.msg = '';
    },

    handleMessage(e) {
      console.log("接收到数据：", e);
      let data = JSON.parse(e.data)
      console.log(data);
      this.msgList.push(data);
      // 滚动到底部
      this.scrollAfterSend();
    },

    // 发送消息后滚动到底部
    scrollAfterSend() {
      let innerHeight = this.$refs.innerRef.clientHeight
      console.log("inner client height:", innerHeight)
      this.$nextTick(() => {
        this.$refs.scrollbarRef.setScrollTop(innerHeight - 320)
      })
    },

    chooseUser(username) {
      console.log("username：", username)
      this.toName = username;
    },

    scroll(value) {
      console.log(value)
    },
  },
  created() {
    this.username = localStorage.getItem("username")
    this.ws = useWebsocket(this.handleMessage, localStorage.getItem("username"));
  }
}
</script>

<style scoped>
.msg-content {
  border: 1px solid black;
}

.user-list-button {
  width: 100%;
  margin-left: 0;
  /*background-color: aqua;*/
}

.msg-send {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: greenyellow;
  color: black;
}

.msg-receive {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
