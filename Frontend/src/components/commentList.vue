<template>
  <div class="listContainer">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="No more comments"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommentItem from './commentItem.vue'
import { getCommets } from '@/api/post'
const porps = defineProps<{ id: string }>()
const loading = ref(false)
const finished = ref(false)
const comments = ref<any[]>([])
const onLoad = () => {
  loading.value = true
  getCommets(porps.id, {}).then((value) => {
    comments.value = []
    const { data } = value
    data.forEach((item: any) => {
      comments.value.push({
        userName: item.userName,
        nickName: item.nickName,
        avatar: item.userAvatar,
        content: item.commentContent,
        timestamp: item.commentTime,
        userId: item.userId,
      })
    })

    loading.value = false
    finished.value = true
  })
}
defineExpose({
  onLoad,
})
</script>

<style scoped lang="less">
.listContainer {
  margin: 0px 10px;
  height: 350px;
  overflow-y: scroll;
}
</style>
