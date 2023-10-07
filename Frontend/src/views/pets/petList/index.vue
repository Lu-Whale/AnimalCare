<template>
  <div class="pet-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="My Pets"
      class="myNav"
      fixed
    />
    <PetList></PetList>
  </div>
</template>

<script lang="ts">
import PetList from '@views/pets/petList/components/petList.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    PetList,
  },
  setup() {
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }

    return {
      router,
      onClickLeft,
    }
  },
}
</script>

<style scoped lang="less">
.pet-page {
  .pet-list-container {
    margin-top: 60px;
    .pet-list {
      margin: 10px;
    }
  }
}
</style>
