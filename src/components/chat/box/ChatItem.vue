<template>
  <div class="chat-item">
    <div class="item-info" @click="itemClick(itemData.username)">
      <el-badge :value="itemData.msgNum" :max="99" :hidden="itemData.msgNum<1">
        <el-avatar
            size="default"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            :alt="require('@/assets/image/profile.jpg')"
            >
        </el-avatar>
      </el-badge>
      <div class="info">
        <p class="username">{{ itemData.username }}</p>
        <p class="dept">{{ itemData.dept }}</p>
      </div>
    </div>
    <div class="item-close">
      <el-button
          class="close-button"
          type="info"
          icon="Close"
          circle
          size="small"
          @click.stop="itemClose(itemData.username)"
      />
    </div>
  </div>
</template>

<script>
export default {
  // 聊天列表组件中item组件
  name: "ChatItem",
  props: {
    itemData: {
      type: Object,
      username: String,
      avatar: String,
      dept: String,
      msgNum: Number,
      /*
      default: () => ({
        // 用户名
        username: 'JwChat',
        // 头像
        avatar: '',
        // 描述
        dept: 'test',
        // 未读消息数
        msgNum: 1,
      }),
      */
      required: true
    }
  },
  methods: {
    itemClick(username) {
      this.$emit('itemClick', username)
    },
    itemClose(username) {
      this.$emit('itemClose', username)
    }
  }
}
</script>


<style lang='scss' scoped>
.chat-item {
  //border: 1px solid black;
  display: flex;
  margin-top: 5px;
}

.item-info {
  display: flex;
  align-items: center;
  position: relative;
  width: 70%;

  &:hover {
    opacity: 0.8;
  }

  .cover {
    border-radius: 50%;
    margin-right: 12px;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 0;
      padding: 0;
      /* width: 175px; */
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      font-size: 13px;
      cursor: pointer;

      &:last-child {
        font-size: 12px;
      }
    }
  }
}

.item-close {
  width: 30%;
}

.close-button{
  margin-left: 10px;
  margin-top: 10px;
}
</style>