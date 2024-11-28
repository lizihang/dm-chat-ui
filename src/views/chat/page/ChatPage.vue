<template>
  <div class="chat-page">
    <chat-header :username="toName"/>
    <div class="chat-page-main">
      <chat-list :item-list="itemList" @itemListClick="onItemListClick" @itemListClose="onItemListClose"/>
      <chat-main :msg-data-list="msgDataList" @sendMessage="onSendMessage"/>
    </div>
  </div>
</template>

<script>
import ChatHeader from "@/components/chat/page/ChatHeader";
import ChatList from "@/components/chat/box/ChatList";
import ChatMain from "@/components/chat/page/ChatMain";
import {getOnlineUserList, getMsgData} from "@/api/chat";
import useWebsocket from "@/api/websocket";

export default {
  // 聊天界面
  name: "ChatPage",
  components: {
    ChatHeader,
    ChatList,
    ChatMain
  },
  data() {
    return {
      ws: {},
      // 当前用户
      username: '',
      // 当前聊天对象
      toName: '',
      // 在线用户列表
      itemList: [],
      /*
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
      */
      // 当前聊天对象的聊天记录
      msgDataList: [],
      /*
      msgDataList: [
        {
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
        },
        {
          // 是否为自己发送的消息
          mine: true,
          // 发送人
          fromName: 'dm',
          // 发送人头像
          avatar: require('@/assets/image/profile.jpg'),
          // 发送时间
          date: '2022-05-17 12:00:00',
          // 内容
          content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
        },
        {
          // 是否为自己发送的消息
          mine: true,
          // 发送人
          fromName: 'dm',
          // 发送人头像
          avatar: require('@/assets/image/profile.jpg'),
          // 发送时间
          date: '2022-05-17 12:00:00',
          // 内容
          content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
        },
        {
          // 是否为自己发送的消息
          mine: true,
          // 发送人
          fromName: 'dm',
          // 发送人头像
          avatar: require('@/assets/image/profile.jpg'),
          // 发送时间
          date: '2022-05-17 12:00:00',
          // 内容
          content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
        },
        {
          // 是否为自己发送的消息
          mine: true,
          // 发送人
          fromName: 'dm',
          // 发送人头像
          avatar: require('@/assets/image/profile.jpg'),
          // 发送时间
          date: '2022-05-17 12:00:00',
          // 内容
          content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
        },
        {
          // 是否为自己发送的消息
          mine: true,
          // 发送人
          fromName: 'dm',
          // 发送人头像
          avatar: require('@/assets/image/profile.jpg'),
          // 发送时间
          date: '2022-05-17 12:00:00',
          // 内容
          content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
        }
      ]
      */
      msgDataMap: {
        dm: [
          {
            // 是否为自己发送的消息
            mine: true,
            // 发送人
            fromName: 'admin',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 10:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          },
          {
            // 是否为自己发送的消息
            mine: false,
            // 发送人
            fromName: 'dm',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 12:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          },
          {
            // 是否为自己发送的消息
            mine: false,
            // 发送人
            fromName: 'dm',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 12:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          }
        ],
        dm2: [
          {
            // 是否为自己发送的消息
            mine: true,
            // 发送人
            fromName: 'admin',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 12:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          },
          {
            // 是否为自己发送的消息
            mine: false,
            // 发送人
            fromName: 'dm2',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 12:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          },
          {
            // 是否为自己发送的消息
            mine: false,
            // 发送人
            fromName: 'dm2',
            // 发送人头像
            avatar: require('@/assets/image/profile.jpg'),
            // 发送时间
            date: '2022-05-17 12:00:00',
            // 内容
            content: '这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息',
          }
        ],
      }
    }
  },
  methods: {
    onItemListClick(username) {
      console.log("chat-page:子组件点击的username:", username)
      let dataList = this.msgDataMap[username]
      if (dataList) {
        this.msgDataList = this.msgDataMap[username]
      } else {
        this.msgDataList = []
      }
      this.toName = username;
    },
    onItemListClose(username) {
      console.log("chat-page:子组件点击的username:", username)
      this.deleteItem(username)
    },
    onSendMessage(message) {
      console.log("chat-page-main msg:", message)
      if (!message.trim()) {
        return;
      }
      let msgItem = {
        sendName: this.username,
        receiveName: this.toName,
        sendTime: new Date(),
        content: message
      }
      this.ws.send(JSON.stringify(msgItem))
      //
      this.msgDataList.push(msgItem);
    },
    // test methods
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
    },
    handleMessage(e) {
      console.log("接收到数据：", e);
      let data = JSON.parse(e.data)
      console.log("接收到数据：", data);
      // 1.上线消息
      if (data.type === 1) {
        let username = data.username;
        this.$message({
          type: 'success',
          message: '用户<' + username + '>上线了!'
        });
        let index = this.queryItemIndex(username);
        if (index === -1) {
          this.itemList.push(data);
        }
      }
      // 2.下线消息
      if (data.type === 2) {
        this.deleteItem(data.username);
      }
      // 3.聊天消息
      if (data.type === 3) {
        console.log(data)
        this.msgDataList.push(data);
      }
    },
    initData() {
      // 初始化在线用户
      let username = localStorage.getItem("username");
      getOnlineUserList(username).then(res => {
        let items = res.data.data;
        console.log("item list =", items)
        // 如果有在线用户，初始化toName和聊天记录
        if (items.length > 0) {
          this.itemList = items;
          this.toName = this.itemList[0].username;
          getMsgData(this.username, this.toName).then(res => {
            let dataList = res.data.data;
            if (dataList) {
              this.msgDataList = res.data.data;
            } else {
              this.msgDataList = []
            }
          });
        }
      });
    }
  },
  created() {
    // 1.初始化当前用户名
    this.username = localStorage.getItem("username")
    // 2.初始化数据
    this.initData();
    // 3.初始化websocket
    this.ws = useWebsocket(this.handleMessage, this.username);
  }
}
</script>

<style scoped>
.chat-page {
  border: 1px solid black;
  width: 750px;
  height: 550px;
}

.chat-page-main {
  display: flex;
  height: 92%;
  border-top: 1px solid black;
}
</style>