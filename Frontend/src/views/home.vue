<template>
  <div class="home">
    <van-button @click="sendReq()">send</van-button>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user'
const params = {
  id: 123,
}
const sendReq = () => {
  getUserInfo(params).then((value) => {
    console.log(value)
  })
}
</script>

<style lang="less" scoped></style>
