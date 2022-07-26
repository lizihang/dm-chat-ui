<template>
  <div class="chat-msg-list" ref="chatMsgList">
    <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
      <div ref="innerRef">
        <div v-for="(msgData,index) in msgDataList" :key="index">
          <chat-msg-item :msg-data="msgData"/>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import ChatMsgItem from "@/components/chat/message/ChatMsgItem";

export default {
  name: "ChatMsgList",
  components: {
    ChatMsgItem
  },
  props: {
    msgDataList: Array
  },
  watch: {
    msgDataList: function () {
      console.log("msg list 监听到msgDataList变化", this.msgDataList)
      this.scrollToBottom();
    }
  },
  methods: {
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        let innerHeight = this.$refs.innerRef.clientHeight
        console.log("inner client height:", innerHeight)
        this.$refs.scrollbarRef.setScrollTop(innerHeight - 320)
      })
    },
    scroll(value) {
      console.log(value)
    },
  }
}
</script>

<style scoped>
.chat-msg-list {
  width: 100%;
}
</style>