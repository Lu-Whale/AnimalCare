import { defineStore } from 'pinia'

export const usePetStore = defineStore('pet', {
  state: () => ({
    isDeleteShow: false,
  }),
  actions: {},
})
