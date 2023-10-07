<template>
  <div class="search-page">
    <div class="search-page-header">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="Search" />
      <van-search
        ref="target"
        shape="round"
        v-model="keyword"
        placeholder="Search by title"
        @search="onSearch"
      />
    </div>
    <div class="before-search" v-if="!hasSearched">
      <van-cell class="trending-posts-header">
        <van-icon class="trending-posts-header-icon" name="chart-trending-o" />
        <span class="trending-posts-header-label">Trending</span>
      </van-cell>

      <div class="search-page-trending-posts">
        <TrendingList></TrendingList>
      </div>

      <van-divider :style="{ padding: '0 10px' }"> Advertisement </van-divider>

      <div class="search-page-ads-image"></div>
    </div>

    <div class="after-search" v-if="hasSearched">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="THE END"
        class="list"
      >
        <div v-if="searchedPostList.length === 0" class="no-search">
          <div>
            <van-icon
              name="warn-o"
              size="40px"
              style="width: 100%; justify-content: center; display: flex"
            />
          </div>
          <div
            style="
              text-align: center;
              max-width: 80%;
              margin-right: auto;
              margin-left: auto;
            "
          >
            <p>Cannot find any search result. Please try other keywords.</p>
          </div>
        </div>
        <PostItem
          v-for="(item, index) in searchedPostList"
          :key="index"
          :data="item"
        />
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { SearchInstance } from 'vant'
import TrendingList from '@cp/trendingList.vue'
import { getSearchPosts } from '@/api/search'
import { Post } from '@/types'
import PostItem from '@cp/postItem.vue'

export default {
  name: 'search',
  components: {
    TrendingList,
    PostItem,
  },
  setup() {
    //back to homepage
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }

    // autofocus
    const target = ref<SearchInstance>()
    onMounted(() => {
      target.value?.focus()
    })

    // get posts by keyword
    const keyword = ref<string>('')
    const searchedPostList = ref<Array<Post[]>>([])
    const loading = ref<boolean>(false)
    const finished = ref<boolean>(false)
    const hasSearched = ref<boolean>(false)

    const fillData = (value: any) => {
      for (let i = 0; i < value.data.length; i = i + 2) {
        if (i + 1 !== value.data.length) {
          searchedPostList.value.push([value.data[i], value.data[i + 1]])
        } else {
          searchedPostList.value.push([value.data[i], {}])
        }
      }
    }

    const onSearch = () => {
      hasSearched.value = true
      searchedPostList.value = []
      console.log(keyword.value)
      getSearchPosts(keyword.value as string, {}).then((value) => {
        console.log(value)
        fillData(value)
        loading.value = false
        finished.value = true
      })
    }

    return {
      loading,
      finished,
      target,
      keyword,
      searchedPostList,
      hasSearched,
      onClickLeft,
      onSearch,
    }
  },
}
</script>

<style scoped lang="less">
.search-page {
  overflow: hidden;
  .search-page-header {
    position: fixed;
    z-index: 1;
    width: 100%;
  }

  .trending-posts-header {
    margin-top: 30%;
    background-color: white;
    top: 0;
    .trending-posts-header-icon {
      color: red;
      margin: 1vw 2vw 1vw 1vw;
    }
    .trending-posts-header-label {
      color: red;
    }
  }

  .search-page-trending-posts {
    overflow: auto;
    height: 60vw;
  }

  .search-page-ads-image {
    width: 80%;
    height: 200px;
    border-radius: 20px;
    background-image: url('@/assets/images/adv.jpeg');
    background-size: cover;
    object-fit: cover;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  .after-search {
    margin-top: 30%;
  }
}
</style>
