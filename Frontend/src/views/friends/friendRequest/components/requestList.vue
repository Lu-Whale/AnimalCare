<template>
  <van-list
    class="friend-list"
    v-model="loading"
    :finished="finished"
    finished-text="THE END"
    @load="onLoad"
  >
    <div v-if="requestList.length === 0" class="no-request">
      <div>
        <van-icon
          name="envelop-o"
          size="40px"
          style="width: 100%; justify-content: center; display: flex"
        />
      </div>
      <div style="text-align: center">
        <p>You don't have any friend invitation yet</p>
      </div>
    </div>
    <RequestItem
      v-for="(item, index) in requestList"
      :friendRequest="item"
      :key="index"
      @updateTable="handleUpdate"
    />
  </van-list>
</template>

<script lang="ts">
import RequestItem from '@/views/friends/friendRequest/components/requestItem.vue'
import { defineComponent, ref } from 'vue'
import { GetFriendRequestList } from '@/api/friends'
import { User } from '@/types'

export default defineComponent({
  components: { RequestItem },
  setup() {
    const requestList = ref<User[]>([])
    const loading = ref(true)
    const finished = ref(false)
    const onLoad = () => {
      GetFriendRequestList({}).then((value) => {
        console.log('request list:', value)
        for (let i = 0; i < value.data.length; i++) {
          const request: User = {
            name: value.data[i].nickName,
            description: value.data[i].description,
            userAvatar: value.data[i].userImageAddress,
            userId: value.data[i].id,
          }
          requestList.value.push(request)
        }
        loading.value = false
        finished.value = true
      })
    }
    const handleUpdate = () => {
      requestList.value = []
      onLoad()
    }
    return {
      loading,
      finished,
      requestList,
      onLoad,
      handleUpdate,
    }
  },
})
</script>
