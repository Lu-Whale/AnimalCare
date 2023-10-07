<template>
  <van-list
    class="friend-list"
    v-model="loading"
    :finished="finished"
    finished-text="THE END"
    @load="onLoad"
  >
    <div v-if="friendList.length === 0" class="no-friend">
      <div>
        <van-icon
          name="flower-o"
          size="40px"
          style="width: 100%; justify-content: center; display: flex"
        />
      </div>
      <div style="text-align: center">
        <p>Try to add some friends</p>
      </div>
    </div>
    <FriendItem
      v-for="(item, index) in friendList"
      :friend="item"
      :key="index"
      @updateTable="handleUpdate"
    />
  </van-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GetFriendList } from '@/api/friends'
import { User } from '@/types'
import FriendItem from '@views/friends/friendList/components/friendItem.vue'

export default defineComponent({
  components: {
    FriendItem,
  },
  setup() {
    const friendList = ref<User[]>([])
    const finished = ref<boolean>(false)
    const loading = ref<boolean>(true)
    const onLoad = () => {
      GetFriendList({}).then((value) => {
        friendList.value = []
        for (let i = 0; i < value.data.length; i++) {
          const friend: User = {
            name: value.data[i].nickName,
            description: value.data[i].description,
            userAvatar: value.data[i].userImageAddress,
            userId: value.data[i].id,
          }
          friendList.value.push(friend)
        }
        loading.value = false
        finished.value = true
      })
    }
    const handleUpdate = () => {
      friendList.value = []
      onLoad()
    }
    return {
      finished,
      loading,
      friendList,
      onLoad,
      handleUpdate,
    }
  },
})
</script>

<style scoped lang="less">
.no-friend {
}
</style>
