<template>
  <div class="friend-item">
    <van-swipe-cell>
      <van-card
        class="friend-card"
        :desc="friend!.description"
        :title="friend!.name"
        :thumb="`${friend!.userAvatar}`"
        centered
        @click="toUserPage(friend!.userId)"
      />
      <template #right>
        <van-button
          square
          text="Delete"
          type="danger"
          class="delete-button"
          @click="handleDelete"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { Dialog } from 'vant'
import { User } from '@/types'
import 'vant/es/dialog/style'
import { defineComponent } from 'vue'
import { DeleteFriend } from '@/api/friends'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    friend: Object as () => User,
  },
  setup(props, { emit }) {
    const handleDelete = () => {
      Dialog.confirm({
        title: 'Are you sure to delete this friend?',
        message: 'Click OK to delete this friend',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
        .then(() => {
          DeleteFriend(props.friend!.userId, {}).then(() => {
            emit('updateTable')
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const router = useRouter()
    const toUserPage = (id: string) => {
      router.push({
        name: 'user',
        params: {
          userId: id,
        },
      })
    }
    return {
      router,
      toUserPage,
      handleDelete,
    }
  },
})
</script>

<style scoped lang="less">
.friend-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
