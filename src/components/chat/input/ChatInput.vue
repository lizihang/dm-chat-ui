<template>
  <div class="chat-msg-input" @keyup.enter="handleSend">
    <textarea class="chat-msg-input-content"
              v-model="currentMsg"
              rows="3"
              ref="msgBox"/>
    <div class="chat-msg-input-button">
      <el-button class="chat-msg-input-button-submit" type="primary" size="default" @click="handleSend">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 消息输入组件
  name: "ChatInput",
  data() {
    return {
      currentMsg: '',
    }
  },
  methods: {
    handleSend(e) {
      const shiftKey = e.shiftKey
      if (shiftKey) {
        return;
      }
      this.$emit('msgSubmit', this.currentMsg);
      this.$nextTick(() => {
        this.currentMsg = ''
      })
    },
  }
}
</script>

<style scoped lang="scss">
.chat-msg-input {
  border-top: 1px solid black;
  padding: 0 10px;
  width: 580px;
  height: 100px;
  overflow: hidden;
  
  &-content {
    display: block;
    width: 100%;
    height: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    resize: none;
    outline: 0;
    background-color: #fff;
    border: 0;
    word-break: break-all;
    font-size: 13px;
    line-height: 17px;
    -webkit-appearance: none;
  }
  
  &-button {
    text-align: right;
  }
  
  &-button-submit {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
  }
}
</style>