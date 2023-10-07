<template>
  <div class="homeContainer">
    <div class="search">
      <van-nav-bar title="Home" class="myNav" />
      <van-search
        v-model="searchVal"
        shape="round"
        placeholder="Search by title"
        @focus="onFocus"
      />

      <van-dropdown-menu>
        <van-dropdown-item
          v-model="option"
          :options="options"
          @change="onChange"
          class="popUp"
        />
      </van-dropdown-menu>
    </div>
    <div class="home-post-list-container">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="THE END"
        @load="onLoad"
        class="list"
      >
        <PostItem v-for="(item, index) in postList" :key="index" :data="item" />
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Post } from '@/types'
import { getPosts, getPostsOrderByLove } from '@/api/post'
import PostItem from '@/components/postItem.vue'

const searchVal = ref('')
const router = useRouter()
const onFocus = () => {
  router.push('/search')
}

//render posts
const postList = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const option = ref(0)
const options = [
  { text: 'Sort by time', value: 0 },
  { text: 'Sort by likes', value: 1 },
]
const page = reactive({
  currPage: 0,
  pageSize: 30,
})
let totalPosts = ref(+Infinity)
const fillData = (value: any) => {
  for (let i = 0; i < value.data.length; i = i + 2) {
    if (i + 1 !== value.data.length) {
      postList.value.push([value.data[i], value.data[i + 1]])
    } else {
      postList.value.push([value.data[i], {}])
    }
    totalPosts.value = value.data[i].totalPosts
    page.currPage = page.currPage + 2
    if (postList.value.length * 2 >= totalPosts.value) {
      finished.value = true
      break
    }
  }
  if (totalPosts.value - postList.value.length * 2 < page.pageSize) {
    page.pageSize = totalPosts.value - postList.value.length * 2
  }
}
const onLoad = () => {
  loading.value = true
  if (option.value === 0) {
    getPosts({ ...page }).then((value) => {
      if (value.data.length === 0) {
        finished.value = true
      }
      fillData(value)
      loading.value = false
    })
  } else {
    getPostsOrderByLove({ ...page }).then((value) => {
      if (value.data.length === 0) {
        finished.value = true
      }
      fillData(value)
      loading.value = false
    })
  }
}
//dropdown menu
const onChange = (value: number) => {
  console.log(value)
  postList.value = []
  finished.value = false
  totalPosts.value = 0
  page.currPage = 0
  page.pageSize = 30
  onLoad()
}
</script>

<style lang="less" scoped>
.homeContainer {
  margin-bottom: 38px;
  overflow: auto;
  width: 100%;
  .popUp {
    :deep(.van-popup) {
      position: relative;
    }
  }
  .search {
    // position: fixed;
    // z-index: 1;
    // width: 100%;
    .dropDown {
      :deep(.van-dropdown-menu__bar) {
        box-shadow: none;
      }
    }
  }

  .home-post-list-container {
    // margin-top: 160px;
    .list {
      height: 74vh;
      overflow-y: scroll;
    }
  }
}
</style>
