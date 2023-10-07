<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Pet Page"
      class="myNav"
      fixed
    />
    <div class="petBasicInfo">
      <div class="pet-avatar-line">
        <div class="pet-avatar">
          <van-image
            round
            :src="petContent.petAvatar"
            class="pet-avatar"
            fit="cover"
          />
        </div>
        <div class="pet-name">
          <p class="pet-name-label">Nickname:</p>
          <p class="pet-name-content">
            {{ petContent.petName }}
          </p>
        </div>
      </div>
      <div class="pet-intro">
        <van-cell-group inset>
          <van-field
            v-model="petContent.description"
            rows="2"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="Add text"
            readonly
          />
        </van-cell-group>
      </div>
    </div>
    <van-divider :style="{ padding: '0 10px' }"> Photos </van-divider>
    <div v-if="petContent.petImgList.length !== 0">
      <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
        <van-swipe-item v-for="image in petContent.petImgList" :key="image">
          <img :src="image" @click="handlePreview" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-if="petContent.petImgList.length === 0" class="no-pet-image">
      <div>
        <van-icon
          name="flower-o"
          size="40px"
          style="width: 100%; justify-content: center; display: flex"
        />
      </div>
      <div
        style="
          text-align: center;
          max-width: 80%;
          margin-right: auto;
          margin-left: auto;
        "
      >
        <p>Add some photos for your pet.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { ImagePreview } from 'vant'
import 'vant/es/image-preview/style'
import { getPetById } from '@/api/pet'
import { usePetStore } from '@/stores/pet'

export default {
  setup() {
    // route back
    const route = useRouter()
    const onClickLeft = () => {
      route.back()
    }
    const petContent = reactive({
      petAvatar: '',
      petName: '',
      description: '',
      petImgList: [],
    })

    // get pet info
    const currRoute = useRoute()
    getPetById(currRoute.params.petId as string, {}).then((value) => {
      const { data } = value
      petContent.petAvatar = data.petImageAddress
      petContent.petName = data.petName
      petContent.description = data.petDescription
      petContent.petImgList = data.petImageList
      console.log(data.petImageList)
    })
    const handlePreview = () => {
      ImagePreview(petContent.petImgList)
    }

    // update pet info
    const petStore = usePetStore()
    const status = computed(() => (petStore.isDeleteShow ? 'Save' : 'Edit'))
    console.log(status.value)

    const target = ref<any>(null)
    const fileList = ref<any>([])
    const defaultUrl = ref('')
    const avatarUrl = computed(() => {
      return !fileList.value.length
        ? defaultUrl.value
        : fileList.value[fileList.value.length - 1].content
    })

    const petDescription = ref('')
    const petName = ref('')

    return {
      target,
      fileList,
      petStore,
      status,
      petContent,
      petDescription,
      petName,
      route,
      defaultUrl,
      avatarUrl,
      onClickLeft,
      handlePreview,
    }
  },
}
</script>

<style scoped lang="less">
.imgSwipe {
  margin-top: 20px;
  height: 200px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.petBasicInfo {
  padding-top: 60px;
  background-image: url('@/assets/images/pet_background.jpg');
  background-size: 100% 100%;
  padding-bottom: 20px;

  .pet-avatar-line {
    .pet-avatar {
      margin-left: auto;
      margin-right: auto;
      width: 110px;
      height: 110px;
    }
    .pet-name {
      margin-left: auto;
      margin-right: auto;
      color: white;
      text-align: center;
      display: flex;
      align-items: center;
      .pet-name-label {
        font-size: large;
        margin-right: 10px;
        margin-left: auto;
        color: black;
        font-family: 'Gill Sans', sans-serif;
      }
      .pet-name-content {
        margin-right: auto;
        vertical-align: center;
        font-size: large;
      }
    }
    .pet-edit-button {
      width: 80px;
      margin: auto;
    }
    .pet-intro {
      margin-bottom: 20px;
    }
  }
}
</style>
