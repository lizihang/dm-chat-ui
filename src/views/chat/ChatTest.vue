<template>
  <chat-page/>
</template>

<script>
import ChatPage from "@/views/chat/page/ChatPage";

export default {
  name: "ChatTest",
  components: {
    ChatPage
  },
  data() {
    return {
      itemList: [
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
      ],
      msgData: {
        // 是否为自己发送的消息
        mine: false,
        // 发送人
        fromName: 'admin',
        // 发送人头像
        avatar: require('@/assets/image/profile.jpg'),
        // 发送时间
        date: '2022-05-17 10:00:00',
        // 内容
        content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
      }
    }
  },
  methods: {
    onItemListClick(username) {
      console.log("onItemListClick:子组件点击的username:", username)
    },
    onItemListClose(username) {
      console.log("onItemListClose:子组件点击的username:", username)
      this.deleteItem(username)
    },
    addItem() {
      let itemData = {
        // 用户名
        username: 'JwChat3',
        // 头像
        avatar: '',
        // 描述
        dept: 'test3',
        // 未读消息数
        msgNum: 3,
      };
      this.itemList.push(itemData);
    },
    modifyItem(username) {
      username = 'JwChat2';
      console.log("modify:", username);
      let index = this.queryItemIndex(username);
      if (index >= 0) {
        this.itemList[index].msgNum++;
      }
    },
    deleteItem(username) {
      console.log("delete:", username)
      let index = this.queryItemIndex(username)
      if (index >= 0) {
        this.itemList.splice(index, 1);
      }
    },
    queryItemIndex(username) {
      let list = this.itemList;
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i].username === username) {
          index = i;
          break;
        }
      }
      return index
    }
  }
}
</script>

<style scoped>
.test-div {
  display: flex;
}
</style>