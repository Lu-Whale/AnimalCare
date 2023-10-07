<template>
  <div class="basic-info-container">
    <div class="basic-info">
      <div class="profile-page-option-container" v-if="type === 'my'">
        <van-button
          icon="exchange"
          type="primary"
          @click="handleLogoutClick"
          class="basic-info-logout-button"
          size="small"
          color="linear-gradient(to right, burlywood, salmon)"
          >Log out</van-button
        >
        <van-button
          icon="edit"
          type="primary"
          @click="handleEditClick"
          class="basic-info-edit-button"
          size="small"
          color="linear-gradient(to right, burlywood, salmon)"
          >{{ status }}</van-button
        >
      </div>
      <div class="avatarLine">
        <van-image
          round
          :src="avatarUrl"
          class="avatar"
          fit="cover"
          @click="avatarClick"
        />
        <van-uploader
          accept="image/png, image/jpeg"
          v-model="fileList"
          ref="target"
          v-show="false"
          v-if="type === 'my'"
          :max-size="10 * 1024 * 1024"
          @oversize="onOversize"
        ></van-uploader>
        <div class="basic-info-display-info">
          <p class="basic-info-display-nickname">
            {{ nickName }}
          </p>
          <p class="basic-info-display-username">username: {{ userName }}</p>
        </div>
      </div>
      <van-row class="basic-info-bottom">
        <!--        <span class="basic-info-description-prefix">About me: </span>-->
        <van-col span="16">
          <span class="basic-info-description-content">{{ description }}</span>
        </van-col>

        <van-col
          span="8"
          class="basic-info-add-friend-container"
          v-if="type === 'user'"
        >
          <van-button
            hairline
            plain
            type="primary"
            @click="sendFriend"
            class="basic-info-send-button"
            size="small"
          >
            {{ friendStatus }}
          </van-button>
        </van-col>
      </van-row>

      <div class="change-info-container" v-if="status !== 'Edit'">
        <van-divider
          :style="{
            padding: '0 10px',
            color: 'white',
            borderColor: 'white',
          }"
        >
          Change your profile below
        </van-divider>
        <div>
          <van-cell-group inset>
            <van-field
              v-model="nickName"
              label="Nick Name: "
              placeholder="Please enter nick name"
              :disabled="type === 'my' && disable"
              :readonly="type === 'user'"
            />
            <van-field
              v-model="description"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="Description of yourself"
              :disabled="type === 'my' && disable"
              :readonly="type === 'user'"
              :show-word-limit="type === 'my'"
            />
          </van-cell-group>
        </div>
      </div>
    </div>
    <div class="pet-gallery-container">
      <van-divider :style="{ padding: '0 10px' }"> Pet Gallery </van-divider>
      <div
        class="add-first-pet"
        @click="toAddPetPage"
        v-if="petList.length === 0 && type === 'my'"
      >
        <van-button
          icon="add-o"
          type="primary"
          block
          color="linear-gradient(to right, burlywood, salmon)"
          >Click to add your first pet</van-button
        >
      </div>
      <div
        v-if="petList.length === 0 && type === 'user'"
        class="pet-gallery-alter"
      >
        <div>
          <van-icon
            name="smile-o"
            size="40px"
            style="width: 100%; justify-content: center; display: flex"
          />
        </div>
        <div style="text-align: center">
          <p>This guy is very lazy to add pets</p>
        </div>
      </div>

      <div class="swipeBanner" v-if="petList.length !== 0">
        <van-swipe vertical :autoplay="3000" lazy-render class="swipe">
          <van-swipe-item v-for="pet in petList" :key="pet"
            ><pet-item @click="toPetPage" :pet="pet"
          /></van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import PetItem from '@views/my/components/petItem.vue'
import { usePostStore } from '@/stores/post'
import { computed } from 'vue'
import { getProfile, getProfileById } from '@/api/post'
import { logout } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/user'
import { Notify, Toast, Dialog } from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import { useUserStore } from '@/stores'
import { SendFriendRequest, DeleteFriend } from '@/api/friends'
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'my',
  },
  friendStatus: {
    type: String,
    default: 'Add Friend',
  },
})
//data
const postStore = usePostStore()
const disable = computed(() => !postStore.isDeleteShow)
const description = ref('')
const nickName = ref('')
const userName = ref('')
const defaultUrl = ref('')
const petList = ref([])
const route = useRoute()
if (props.type === 'my') {
  getProfile({}).then((value) => {
    const { data } = value
    defaultUrl.value = `${data.userImageAddress}`
    nickName.value = data.nickName
    userName.value = data.userName
    description.value = data.description
    petList.value = data.petList
  })
} else {
  getProfileById(route.params.userId as string, {}).then((value) => {
    const { data } = value
    defaultUrl.value = `${data.userImageAddress}`
    nickName.value = data.nickName
    userName.value = data.userName
    description.value = data.description
    petList.value = data.petList
  })
}
const router = useRouter()
const toPetPage = () => {
  if (props.type === 'my') {
    router.push({
      name: 'pets',
      params: {
        type: 'my',
      },
    })
  }
}

const toAddPetPage = () => {
  if (props.type === 'my') {
    router.push('/addPet')
  }
}

//upload avatar
const target = ref<any>(null)
const fileList = ref<any>([])
const avatarClick = () => {
  if (status.value === 'Save') {
    target.value.chooseFile()
  }
}
const avatarUrl = computed(() => {
  return !fileList.value.length
    ? defaultUrl.value
    : fileList.value[fileList.value.length - 1].content
})
//changeEdit
const status = computed(() => (postStore.isDeleteShow ? 'Save' : 'Edit'))
const handleEditClick = () => {
  if (status.value === 'Edit') {
    postStore.isDeleteShow = true
  } else {
    postStore.isDeleteShow = false
    updateUserInfo({
      userImageAddress: fileList.value.length
        ? fileList.value[fileList.value.length - 1].content
        : '',
      nickName: nickName.value,
      description: description.value,
    }).then((value) => {
      if (value.message === 'Success') {
        Notify({ type: 'success', message: 'Successfully update.' })
      }
    })
  }
}
//logout
const userStore = useUserStore()
const handleLogoutClick = () => {
  logout({}).then(() => {
    userStore.$reset()
    router.push({
      name: 'login',
    })
  })
}

//Unmounted
onUnmounted(() => {
  postStore.isDeleteShow = false
})

const sendFriend = () => {
  console.log('send friend request')
  console.log(route.params.userId)
  console.log('friend status:', props.friendStatus)
  Toast.clear()
  if (props.friendStatus == 'Add Friend') {
    SendFriendRequest(route.params.userId as string, {}).then((value) => {
      console.log(value)
      const { data } = value
      console.log(data)
      if (data == 'Directly be friends') {
        Toast.success('Congrats! Add friend successfully!')
      } else if (data == 'Request have been sent') {
        window.location.reload()
        Toast.success('Your request has been successfully sent!')
      } else {
        Toast.fail('An error occurred!')
      }
    })
  } else if (props.friendStatus == 'Request Sent') {
    SendFriendRequest(route.params.userId as string, {}).then((value) => {
      console.log(value)
      const { message } = value
      console.log(message)
      if (message == 'Do not add again') {
        Toast.fail('Please do not request multiple times!')
      } else if (message == 'You are already friends') {
        window.location.reload()
        Toast.success('Congrats! Add friend successfully!')
      } else {
        Toast.fail('An error occurred!')
      }
    })
  } else if (props.friendStatus == 'Delete Friend') {
    DeleteFriend(route.params.userId as string, {}).then(() => {
      Dialog.confirm({
        title: 'Are you sure to delete this friend?',
        message: 'Click OK to delete this friend',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(() => {
        window.location.reload()
      })
    })
  }
}
//
const onOversize = () => {
  Toast.fail('image size show be smaller than 10MB')
}
</script>

<style scoped lang="less">
.basic-info-container {
  //margin: 30px 10px;
  .basic-info {
    background-image: url('@/assets/images/user_background.jpg');
    padding-bottom: 10px;
    background-size: auto 100%;
    background-size: cover;
    //object-fit: scale-down;
  }

  .basic-info-options {
    margin-top: 15px;
    width: 100%;
    z-index: 1;
    position: fixed;
    background-color: white;
  }
  .profile-page-option-container {
    width: 100%;
    margin-top: 55px;
    display: inline-block;
    .basic-info-edit-button {
      width: 80px;
      color: white;
      float: right;
      margin-right: 5px;
    }
    .basic-info-logout-button {
      width: 80px;
      color: white;
      float: right;
      margin-right: 10px;
    }
  }

  .avatarLine {
    display: flex;
    //align-items: center;
    //justify-content: space-around;
    margin: 0 10px 10px 20px;
    padding-top: 20px;
    .avatar {
      width: 120px;
      height: 120px;
      //margin-right: 20px;
      border: 2px solid white;
    }
    :deep(.van-button--round) {
      border-radius: 20px;
    }
    .basic-info-display-info {
      margin-top: auto;
      font-size: 32px;
      margin-bottom: auto;
      margin-left: 10px;
      font-family: 'Gill Sans', sans-serif;
      .basic-info-display-nickname {
        margin: 0;
        color: white;
        font-size: 25px;
        font-weight: bolder;
      }
      .basic-info-display-username {
        margin: 0;
        font-size: 18px;
        color: lighten(black, 30%);
      }
    }
  }
  .basic-info-bottom {
    //font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: 16px;
    margin-left: 40px;
    margin-right: 20px;
    .basic-info-description-content {
      color: lighten(black, 30%);
      word-break: break-word;
    }
    .basic-info-add-friend-container {
      width: 100%;
      margin-top: 5px;
      .basic-info-send-button {
        color: crimson;
        float: right;
        margin-right: 10px;
      }
    }
    //font-weight: lighter;
  }
  .add-first-pet {
    margin: 0 20px;
    text-align: center;
    color: #faad14;
  }
  .swipeBanner {
    // margin-left: 18px;
    margin-top: 18px;
    padding: 0 15px;
    position: relative;
    .swipe {
      height: 150px;
    }
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      background-color: #39a9ed;
      border-radius: 15px;
      margin: auto;
    }
  }

  .pet-gallery-container {
    text-align: center;
    .pet-gallery-alter {
      //background-color: white;
    }
  }
}
</style>
