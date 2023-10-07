<template>
  <div class="petContainer">
    <van-image class="petImg" :src="`${pet.petImageAddress}`" fit="cover" />
    <div class="petInfo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhenhuichongtubiaozhizuo-kuozhan-"></use>
      </svg>
      <span>{{ pet.petName }}</span>
      &nbsp;
      <svg class="icon petIcon" aria-hidden="true">
        <use xlink:href="#icon-pet"></use>
      </svg>
      <span>{{ pet.category }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  pet: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="less">
.petContainer {
  position: relative;
  .petImg {
    width: 350px;
    height: 150px;
  }
  .petInfo {
    width: 250px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    padding: 0 10px;
    bottom: 15px;
    line-height: unset;
    span {
      font-size: medium;
    }
  }
}
</style>
