<template>
  <div class="friend-request-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="My Friend Request"
      class="myNav"
      fixed
    />
    <RequestList></RequestList>
  </div>
</template>

<script lang="ts">
import router from '../../../router'
import { ref } from 'vue'
import { GetFriendRequestList } from '@/api/friends'
import { NewFriendRequest } from '@/types'
import RequestList from '@views/friends/friendRequest/components/requestList.vue'

export default {
  components: { RequestList },

  setup() {
    const friendRequestList = ref<NewFriendRequest[]>([])
    const loading = ref(false)
    const finished = ref(false)

    const onLoad = () => {
      GetFriendRequestList({}).then((value) => {
        console.log(value)
        for (let i = 0; i < value.data.length; i++) {
          const request: NewFriendRequest = {
            userName: value.data[i].userName,
            requestText: value.data[i].requestText,
            userAvatar: value.data[i].userImageAddress,
          }
          friendRequestList.value.push(request)
        }
        loading.value = false
        finished.value = true
      })
    }

    const onClickLeft = () => {
      router.back()
    }

    return {
      friendRequestList,
      loading,
      finished,

      onLoad,
      onClickLeft,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-request-page {
  margin-top: 60px;
  .friend-request-list-container {
    margin: 20px;
    .friend-request-list {
      margin: 10px;
    }
  }
}
</style>
