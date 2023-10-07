<template>
  <van-cell
    class="trending-item"
    @click="handleItemClick(trendingPost!.postId)"
  >
    <van-icon class="trending-icon" name="fire" />
    <span class="trending-topic">{{ trendingPost!.topic }}</span>
  </van-cell>
</template>

<script lang="ts">
import { TrendingPost } from '@/types'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    trendingPost: Object as () => TrendingPost,
  },
  setup() {
    const router = useRouter()
    const handleItemClick = (id: number) => {
      console.log(id)
      router.push({
        name: 'post',
        params: {
          postId: id,
        },
      })
    }
    return {
      router,
      handleItemClick,
    }
  },
})
</script>

<style scoped lang="less">
.trending-item {
  background-color: white;
  .trending-icon {
    color: red;
    margin: 1vw 2vw 1vw 1vw;
    //z-index: 1;
  }
}
</style>
