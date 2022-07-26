<template>
  <div class="chat-list" ref="chatList">
    <el-scrollbar ref="scrollbarRef" height="100%" always>
      <div v-for="item in itemList"
           :key="item.username"
           :ref="`item-${item.username}`"
           :class="{ 'item-active': active === item.username }">
        <chat-item :item-data="item" @itemClick="onItemClick" @itemClose="onItemClose"/>
      </div>
      <div v-if="!itemList.length">
        <p>暂无消息</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import ChatItem from "@/components/chat/box/ChatItem";

export default {
  // 聊天列表组件
  name: "ChatList",
  components: {
    ChatItem
  },
  data() {
    return {
      active: '',
    }
  },
  props: {
    itemList: {
      type: Array,
      /*
      default: () => ([
        {
          // 用户名
          username: 'JwChat1',
          // 头像
          avatar: '',
          // 描述
          dept: 'test1',
          // 未读消息数
          msgNum: 5,
        },
        {
          // 用户名
          username: 'JwChat2',
          // 头像
          avatar: '',
          // 描述
          dept: 'test2',
          // 未读消息数
          msgNum: 2,
        }
      ]),
      */
      required: true
    }
  },
  methods: {
    /**
     * 子组件点击事件
     * @param username
     */
    onItemClick(username) {
      console.log("chat-list:子组件点击的username:", username)
      // 1.可以设置点击过的样式
      this.active = username;
      // 2.emit父组件，切换聊天的界面
      this.$emit('itemListClick', username)
    },
    /**
     * 子组件点击关闭事件
     * @param username
     */
    onItemClose(username) {
      console.log("chat-list:子组件点击的username:", username)
      // 1.itemList中删除当前item
      // 2.emit父组件，切换聊天的界面
      this.$emit('itemListClose', username)
    }
  }
}
</script>

<style scoped lang='scss'>
.chat-list {
  border-right: 1px solid black;
  width: 20%;
}

.item-active {
  background: #f0f0f0;
}
</style>