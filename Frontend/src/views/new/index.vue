<template>
  <div class="newContainer" @touchstart="() => {}">
    <van-nav-bar title="Create New" fixed />
    <div class="panels">
      <div class="Panel" @click="$router.push('/addPost')">
        <van-icon name="plus" />
        New Post
      </div>
      <div class="Panel" @click="$router.push('/addPet')">
        <van-icon name="plus" />
        New Pet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.newContainer {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-image: url('@/assets/images/new_background.jpg');
  background-size: cover;

  .panels {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 140px 20px;

    .Panel {
      height: 200px;
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.4s;
      position: relative;
      text-align: center;
      line-height: 200px;
      font-size: 30px;
      font-weight: bolder;

      &:active {
        background-color: @color-blue;
        opacity: 0.5;
      }

      &::after {
        position: absolute;
        content: '';
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: inherit;
        transform: translate(-50%, -50%);
        box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
        opacity: 0;
      }

      &:active::after {
        opacity: 1;
      }
    }
  }
}
</style>
