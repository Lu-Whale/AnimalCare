import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    keepAlive: <string[]>[],
  }),
  actions: {
    addKeepAlive(route: string) {
      if (!this.keepAlive.includes(route)) {
        this.keepAlive.push(route)
      }
    },
    deleteKeepAlive(route: string) {
      this.keepAlive = this.keepAlive.filter((item) => {
        return item !== route
      })
    },
  },
})
