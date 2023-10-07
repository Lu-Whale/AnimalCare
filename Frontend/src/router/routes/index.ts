import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      keepAlive: false,
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          keepAlive: false,
          idx: 1,
        },
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
        meta: {
          keepAlive: false,
          idx: 2,
        },
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('@/views/friends/friendList/index.vue'),
        meta: {
          keepAlive: false,
          idx: 3,
        },
      },
      {
        path: 'new',
        name: 'new',
        component: () => import('@/views/new/index.vue'),
        meta: {
          keepAlive: false,
          idx: 4,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/auth/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/addPost',
    name: 'addPost',
    component: () => import('@views/new/posts/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/addPet',
    name: 'addPet',
    component: () => import('@views/new/pets/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/pets/:type',
    name: 'pets',
    component: () => import('@views/pets/petList/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@views/search/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: () => import('@/components/postPage.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/friendList',
    name: 'friendList',
    component: () => import('@views/friends/friendList/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/friendRequest',
    name: 'friendRequest',
    component: () => import('@views/friends/friendRequest/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/pet/:petId',
    name: 'pet',
    component: () => import('@views/pets/petProfile/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
]

export default routes
