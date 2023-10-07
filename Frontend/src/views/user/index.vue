<template>
  <div class="userContainer" @load="onLoadFriendButton">
    <van-nav-bar
      title="User Profile"
      class="userNav"
      fixed
      left-arrow
      @click-left="onClickLeft"
      placeholder
    />
    <BasicInfo
      class="user-page-basic-info"
      type="user"
      :friendStatus="friendStatus"
    />
    <van-divider :style="{ padding: '0 10px' }"> User's Posts </van-divider>
    <div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="THE END"
        @load="onLoad"
      >
        <div v-if="posts.length === 0" class="pet-gallery-alter">
          <div>
            <van-icon
              name="smile-o"
              size="40px"
              style="width: 100%; justify-content: center; display: flex"
            />
          </div>
          <div style="text-align: center">
            <p>This guy is very lazy to add posts</p>
          </div>
        </div>
        <PostItem
          v-for="(item, index) in posts"
          :key="index"
          :data="item"
          :avatar="avatar"
        />
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicInfo from '@views/my/components/basicInfo.vue'
import PostItem from '@/components/postItem.vue'
import { Post } from '@/types'
import { ref } from 'vue'
import { getProfileById } from '@/api/post'
import { useRoute, useRouter } from 'vue-router'
import { CheckFriendshipStatus } from '@/api/friends'
const posts = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const route = useRoute()
const avatar = ref('')
const friendStatus = ref('')
const onLoadFriendButton = () => {
  console.log('check friendship')
}
const onLoad = () => {
  loading.value = true
  CheckFriendshipStatus(route.params.userId as string, {}).then((value) => {
    console.log('check:', value)
    const { data } = value
    if (data == 'Requesting') {
      friendStatus.value = 'Request Sent'
    } else if (data == 'Friend') {
      friendStatus.value = 'Delete Friend'
    } else {
      friendStatus.value = 'Add Friend'
    }
  })
  getProfileById(route.params.userId as string, {}).then((value) => {
    console.log('get profile:', value)
    avatar.value = value.data.userImageAddress
    const {
      data: { postList },
    } = value
    for (let i = 0; i < postList.length; i = i + 2) {
      if (i + 1 !== postList.length) {
        posts.value.push([postList[i], postList[i + 1]])
      } else {
        posts.value.push([postList[i], {}])
      }
    }
    loading.value = false
    finished.value = true
  })
}
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="less">
.user-page-basic-info {
}
</style>
