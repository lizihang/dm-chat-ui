<template>
  <div class="chat-main">
    <chat-msg-list :msg-data-list="msgDataList"/>
    <chat-input @msgSubmit="onMsgSubmit"/>
  </div>
</template>

<script>
import ChatMsgList from "@/components/chat/message/ChatMsgList";
import ChatInput from "@/components/chat/input/ChatInput";

export default {
  name: "ChatMain",
  components: {
    ChatMsgList,
    ChatInput
  },
  props: {
    msgDataList: Array
  },
  methods: {
    onMsgSubmit(message) {
      console.log("chat-main msg:", message)
      this.$emit('sendMessage', message);
    }
  }
}
</script>

<style scoped>
.chat-main {
  width: 79%;
  height: 100%;
}
</style>