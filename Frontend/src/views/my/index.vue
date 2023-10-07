<template>
  <div class="myContainer">
    <van-nav-bar title="My Profile" class="myNav" fixed />
    <BasicInfo type="my" />
    <van-divider :style="{ padding: '0 10px' }"> My Posts </van-divider>
    <div
      class="add-first-post"
      @click="toAddPostPage"
      @load="onLoad"
      v-if="posts.length === 0"
    >
      <van-button
        icon="add-o"
        type="primary"
        block
        color="linear-gradient(to right, burlywood, salmon)"
        >Click to add your first post</van-button
      >
    </div>
    <div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="THE END"
        @load="onLoad"
        class="list"
      >
        <div v-if="posts.length !== 0">
          <PostItem
            v-for="(item, index) in posts"
            :key="index"
            :data="item"
            :avatar="avatarUrl"
            @update-posts="updatePosts"
          />
        </div>
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/components/postItem.vue'
import { getProfile } from '@/api/post'
import { ref } from 'vue'
import { Post } from '@/types'
import BasicInfo from '@views/my/components/basicInfo.vue'
import { useRouter } from 'vue-router'
const posts = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const avatarUrl = ref('')
getProfile({}).then((value) => {
  avatarUrl.value = value.data.userImageAddress
})
const onLoad = () => {
  posts.value = []
  loading.value = true
  getProfile({}).then((value) => {
    const {
      data: { postList },
    } = value
    // console.log('post length:', value.data.length)
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

//updatePosts
const updatePosts = () => {
  onLoad()
}
const router = useRouter()
const toAddPostPage = () => {
  router.push('/addPost')
}
</script>

<style lang="less" scoped>
.myContainer {
  width: 100%;
  overflow: auto;
  .add-first-post {
    margin: 0 20px;
    text-align: center;
  }
  .logout {
    font-size: 32px;
    top: 60px;
    right: 20px;
    position: absolute;
  }
  .list {
    margin-bottom: 50px;
  }
  //padding-bottom: 50px;
  //padding-top: 50px;
}
</style>
