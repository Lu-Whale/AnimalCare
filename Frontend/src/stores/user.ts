import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    userId: window.localStorage.getItem('userId'),
  }),
  actions: {
    setUser(userId: string): void {
      // 这里的 this 是当前的 Store 实例
      this.userId = userId
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
})
