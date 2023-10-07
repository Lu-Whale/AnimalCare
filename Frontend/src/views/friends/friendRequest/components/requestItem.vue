<template>
  <div class="friend-request-item">
    <van-swipe-cell>
      <van-card
        class="request-card"
        :desc="friendRequest!.description"
        :title="friendRequest!.name"
        :thumb="`${friendRequest!.userAvatar}`"
        centered
      />
      <template #right>
        <van-button
          class="approve-button"
          square
          type="primary"
          text="Approve"
          @click="handleApprove"
        />
        <van-button
          class="deny-button"
          square
          type="danger"
          text="Deny"
          @click="handleDeny"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import 'vant/es/dialog/style'
import { User } from '@/types'
import { Dialog } from 'vant'
import { AcceptFriendRequest, RejectFriendRequest } from '@/api/friends'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    friendRequest: Object as () => User,
  },
  setup(props, { emit }) {
    const handleApprove = () => {
      // isApprove.value = true
      AcceptFriendRequest(props.friendRequest!.userId, {}).then(() => {
        emit('updateTable')
      })
    }
    const handleDeny = () => {
      Dialog.confirm({
        title: 'Are you sure to reject this friend request?',
        message: 'Click OK to reject this friend request',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
        .then(() => {
          // on confirm
          RejectFriendRequest(props.friendRequest!.userId, {}).then(() => {
            emit('updateTable')
          })
        })
        .catch(() => {
          // on cancel
        })
    }
    return {
      handleApprove,
      handleDeny,
    }
  },
})
</script>

<style scoped lang="less">
.request-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.approve-button {
  height: 100%;
}
.deny-button {
  height: 100%;
}
</style>
