<template>
  <router-view v-slot="{ Component }">
    <transition :name="aniName" mode="out-in">
      <keep-alive :include="keep">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, toRef } from 'vue'
import { useRouteStore } from '@/stores/index'

//only login page has animation
const router = useRouter()
const aniName = ref<string>('')
// 调用全局钩子
const routerStore = useRouteStore()
const keep = toRef(routerStore, 'keepAlive')
router.beforeEach((to, from) => {
  if (to.path === '/login' || from.path === '/login') {
    aniName.value = 'ani'
  } else if (to.path === '/addPost' || to.path === '/addPet') {
    aniName.value = 'add'
  } else {
    aniName.value = ''
  }
  //搜索路由缓存
  if (to.path === '/search' && from.path === '/home') {
    routerStore.addKeepAlive('search')
  } else if (to.path === '/home' && from.name === 'search') {
    routerStore.deleteKeepAlive('search')
  }
})
</script>
<style scoped lang="less">
.ani-enter-active,
.ani-leave-active {
  transition: all 0.5s ease-out;
}

.ani-enter-from,
.ani-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.ani-enter-to,
.ani-leave-from {
  transform: none;
  opacity: 1;
}
.add-enter-active {
  transition: all 0.5s ease-out;
}
.add-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.add-enter-to {
  transform: none;
  opacity: 1;
}
</style>
