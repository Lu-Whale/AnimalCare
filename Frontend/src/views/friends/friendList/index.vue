<template>
  <div class="friend-page">
    <van-nav-bar title="My Friends" class="myNav" fixed />
    <van-divider style="margin-top: 60px; padding: 0 16px; font-size: large"
      >Click to view friend requests</van-divider
    >

    <div class="friend-request-button-container">
      <van-button
        class="request-button"
        round
        type="success"
        @click="toRequestPage"
        >Friend Requests: {{ reqNum }}
      </van-button>
    </div>
    <van-divider style="padding: 0 16px; font-size: large">Friends</van-divider>
    <div class="friend-list-container">
      <FriendList></FriendList>
    </div>
  </div>
</template>

<script lang="ts">
import FriendList from '@views/friends/friendList/components/friendList.vue'
import { useRouter } from 'vue-router'
import { GetFriendRequestList } from '@/api/friends'
import { ref } from 'vue'
export default {
  components: { FriendList },

  setup() {
    const router = useRouter()
    const reqNum = ref(0)
    const toRequestPage = () => {
      router.push({
        name: 'friendRequest',
      })
    }
    GetFriendRequestList({}).then((value) => {
      reqNum.value = value.data.length
    })
    return {
      reqNum,
      toRequestPage,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-page {
  width: 100%;
  .friend-request-button-container {
    justify-content: center;
    display: flex;
    background-color: white;
    padding: 10px 0;
    .request-button {
      width: 300px;
      background-color: coral;
      border: 1px solid coral;
    }
  }
  .friend-list-container {
    margin: 10px;
    .friend-list {
      margin: 10px;
    }
  }
}
</style>
