<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition :name="aniNmae">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar v-model="currTag" class="tabBar">
      <van-tabbar-item name="home" @click="handlePush('home')" icon="home-o"
        >Home</van-tabbar-item
      >
      <van-tabbar-item name="my" @click="handlePush('my')" icon="user-o"
        >My</van-tabbar-item
      >
      <van-tabbar-item
        name="friends"
        @click="handlePush('friends')"
        icon="friends-o"
        >Friends</van-tabbar-item
      >
      <van-tabbar-item name="new" @click="handlePush('new')" icon="add-o"
        >New</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const currTag = ref(route.name as string)
const router = useRouter()
const handlePush = (tag: string) => {
  currTag.value = tag
  router.push(tag)
}
//animation
const aniNmae = ref('')
onBeforeRouteUpdate((to, from) => {
  currTag.value = to.name as string
  if (Number(from.meta.idx) < Number(to.meta.idx)) {
    aniNmae.value = 'right'
  } else {
    aniNmae.value = 'left'
  }
})
</script>

<style lang="less" scoped>
.tabBar {
  position: fixed;
  bottom: 0;
}
.right-enter-active,
.right-leave-active {
  transition: all 0.5s ease;
}

.right-leave-to {
  transform: translateX(-100%);
  position: fixed;
}
.right-enter-from {
  transform: translateX(100%);
  position: fixed;
}

.right-enter-to,
.right-leave-from,
.left-enter-to,
.left-leave-from {
  transform: none;
  position: fixed;
}

.left-enter-active,
.left-leave-active {
  transition: all 0.5s ease;
}

.left-leave-to {
  transform: translateX(100%);
  position: fixed;
}
.left-enter-from {
  transform: translateX(-100%);
  position: fixed;
}
</style>
