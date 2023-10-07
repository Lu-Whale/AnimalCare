<template>
  <div class="trending-list-container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
      loading-text="loading..."
    >
      <TrendingItem
        v-for="(item, index) in trendingPostList"
        :key="index"
        :trendingPost="item"
      ></TrendingItem>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TrendingPost } from '@/types'
import TrendingItem from '@cp/trendingItem.vue'
import { getTrendingPosts } from '@/api/search'

export default defineComponent({
  components: {
    TrendingItem,
  },
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const trendingPostList = ref<TrendingPost[]>([])

    const onLoad = () => {
      // loading.value = true
      getTrendingPosts({}).then((value) => {
        console.log(value)
        const { data } = value
        data.forEach((item: any) => {
          const post: TrendingPost = {
            topic: item.topic,
            postId: item.postId,
          }
          trendingPostList.value.push(post)
        })
        // console.log(trendingPostList.value)
        loading.value = false
        finished.value = true
      })
    }
    return {
      loading,
      finished,
      trendingPostList,
      onLoad,
    }
  },
})
</script>

<style scoped lang="less"></style>
