<template>
  <div class="pageContainer">
    <div class="post-page-header">
      <van-nav-bar
        left-arrow
        title="Post"
        class="myNav"
        fixed
        @click-left="$router.back()"
      />
      <div class="avatarBanner" style="">
        <van-image
          round
          fit="cover"
          :src="pageContent.userAvatar"
          class="avatar"
          @click="handleAvatarClick"
        />
        <span>{{ pageContent.nickName }}</span>
        <span class="date">{{ format(pageContent.timestamp) }}</span>
      </div>
    </div>
    <div class="post-content-container">
      <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
        <van-swipe-item v-for="image in pageContent.imageUrlList" :key="image">
          <img :src="image" @click="handlePreview" />
        </van-swipe-item>
      </van-swipe>
      <van-divider />
      <div class="content">
        <h3>{{ pageContent.topic }}</h3>
        <p>{{ pageContent.content }}</p>
      </div>
    </div>
    <van-popup
      closeable
      v-model:show="show"
      round
      position="bottom"
      class="popup"
    >
      <template #default>
        <h3 class="comment-button">Comments</h3>
        <CommentList :id="postId" ref="target" />
        <div class="newComment">
          <van-cell-group inset>
            <van-field
              v-model="message"
              rows="1"
              autosize
              label="Comment:"
              type="textarea"
              placeholder="Enter your comment"
            />
          </van-cell-group>
          <van-button type="primary" round size="small" @click="postMessage"
            >Send</van-button
          >
        </div>
      </template>
    </van-popup>

    <div class="footer">
      <van-button
        type="primary"
        size="large"
        round
        color="linear-gradient(to right, #4e9aec, #2b89ee)"
        class="footer-button"
        @click="clickComment"
      >
        <van-icon name="chat-o" style="margin-right: 5px" />
        Comments
      </van-button>
      <div>
        <van-icon :name="icon" size="25px" color="red" @click="clickLove" />
        <p class="post-page-love">{{ pageContent.love }}</p>
      </div>
    </div>
  </div>
</template>
)
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import CommentList from './commentList.vue'
import { getPostById, createLove, deleteLove, addComment } from '@/api/post'
import { ImagePreview } from 'vant'
import 'vant/es/image-preview/style'
import { computed } from 'vue'
import { Notify } from 'vant'
import 'vant/es/notify/style'
import { useUserStore } from '@/stores'
import { format } from '@/utils/day'
const route = useRoute()
//render page
const pageContent = reactive({
  postId: '',
  topic: '',
  userAvatar: '',
  nickName: '',
  userName: '',
  imageUrlList: [] as string[],
  content: '',
  commentList: [],
  love: 0,
  loved: false,
  userId: '',
  timestamp: 0,
})
const postId = route.params.postId as string
getPostById(postId, {}).then((value) => {
  const { data } = value
  console.log(data)
  pageContent.postId = data.postId
  pageContent.love = data.love
  pageContent.loved = data.loved
  pageContent.userId = data.userId
  pageContent.topic = data.topic
  pageContent.userAvatar = `${data.userAvatar}`
  pageContent.nickName = data.nickName
  pageContent.userName = data.userName
  data.imageUrlList.forEach((item: string[]) => {
    pageContent.imageUrlList.push(`${item}`)
  })
  pageContent.content = data.postContent
  pageContent.timestamp = data.posTime
})
//comment
const show = ref(false)
const message = ref('')
const postMessage = () => {
  addComment(pageContent.postId, { commentContent: message.value }).then(
    (value) => {
      if (value.status === 200) {
        message.value = ''
        show.value = false
        Notify({ type: 'success', message: 'Success.' })
      }
    }
  )
}

//avatar click
const router = useRouter()
const userStore = useUserStore()
console.log(userStore.userId)
const handleAvatarClick = () => {
  if (pageContent.userId === userStore.userId) {
    router.push({
      name: 'my',
    })
  } else {
    router.push({
      name: 'user',
      params: {
        userId: pageContent.userId,
      },
    })
  }
}
//preview images
const handlePreview = () => {
  ImagePreview(pageContent.imageUrlList)
}

//click love
const icon = computed(() => {
  return pageContent.loved ? 'like' : 'like-o'
})
const clickLove = async () => {
  if (!pageContent.loved) {
    await createLove(pageContent.postId, {})
    pageContent.loved = true
    pageContent.love++
    Notify({
      type: 'success',
      message: 'Thank you for your like!',
      duration: 500,
    })
  } else {
    await deleteLove(pageContent.postId, {})
    pageContent.loved = false
    pageContent.love--
  }
}
//comment
const target = ref<InstanceType<typeof CommentList> | null>(null)
const clickComment = () => {
  target.value?.onLoad()
  show.value = true
}
</script>

<style scoped lang="less">
.pageContainer {
  padding-top: 44px;
  :deep(.van-button--large) {
    width: 80%;
  }
  :deep(.van-popup--bottom) {
    height: 500px;
  }

  .post-page-header {
    position: fixed;
    z-index: 1;
    width: 100%;
    .avatarBanner {
      font-size: 16px;
      padding: 10px 0 10px 20px;
      display: flex;
      justify-self: start;
      align-items: center;
      background-color: white;
      .avatar {
        width: 60px;
        height: 60px;
        margin-right: 20px;
      }
      .date {
        margin-left: auto;
        margin-right: 20px;
        color: #969799;
      }
    }
  }

  .post-content-container {
    font-size: 16px;
    margin-top: 82px;
    overflow: auto;
    margin-bottom: 50px;
    //background-color: white;
    .imgSwipe {
      margin-top: 20px;
      height: 200px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .content {
      //margin: 20px 20px;
      padding: 0 20px;
      word-wrap: break-word;
      height: 320px;
      overflow-y: scroll;
      background-color: white;
    }
  }

  .footer {
    border-top: 1px solid lightgray;
    padding-top: 15px;
    padding-bottom: 15px;
    z-index: 1;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    .footer-button {
      width: 300px;
    }
    .post-page-love {
      text-align: center;
      margin: 0;
    }
  }

  .popup {
    .comment-button {
      text-align: center;
    }
    .newComment {
      display: flex;
      align-items: center;
      margin-top: 25px;
      margin-right: 25px;
    }
  }
}
</style>
