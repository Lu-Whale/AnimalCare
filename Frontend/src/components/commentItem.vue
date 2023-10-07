<template>
  <div class="commentItem">
    <van-image
      round
      fit="cover"
      :src="`${comment.avatar}`"
      class="avatar"
      @click="handleAvatarClick"
    />
    <div class="comment-content">
      <div class="header">
        <p style="color: gray">
          {{ comment.nickName }}
        </p>
        <span class="time">{{ format(comment.timestamp) }}</span>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from '@/utils/day'
import { useRouter } from 'vue-router'
const props = defineProps<{ comment: any }>()
const router = useRouter()
const handleAvatarClick = () => {
  router.push({
    name: 'user',
    params: {
      userId: props.comment.userId,
    },
  })
}
</script>

<style scoped lang="less">
.commentItem {
  display: flex;
  justify-content: left;
  border-bottom: 1px solid #efefef;
  padding-top: 10px;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .comment-content {
    //margin-right: 10px;
    width: 290px;
    word-wrap: break-word;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .time {
      color: gray;
      font-size: 12px;
    }
  }
}
</style>
