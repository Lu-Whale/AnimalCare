<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Add Pet"
      class="myNav"
      fixed
    />
    <van-divider style="margin-top: 60px; padding: 0 16px; font-size: large">
      <van-icon name="records" style="margin-right: 5px" />add pet basic
      info</van-divider
    >
    <div class="petBasicInfo">
      <van-image
        round
        :src="avatarUrl"
        class="avatar"
        fit="cover"
        @click="triggerUpload"
      >
        <template v-slot:loading>
          <van-icon name="plus" />
          <span>Avatar</span>
        </template>
      </van-image>
      <van-uploader
        v-show="false"
        :after-read="afterReadAvatar"
        ref="target"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
      />
      <div class="nameWrapper">
        <van-cell-group class="name" inset>
          <van-field
            v-model="petName"
            placeholder="Add name here"
            label="Pet Name:"
            autofocus
          />
        </van-cell-group>
      </div>
    </div>
    <div class="addPet">
      <van-cell-group class="intro" inset>
        <van-field
          v-model="description"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="Add your pet description here"
          show-word-limit
        />
      </van-cell-group>
      <van-divider style="padding: 0 16px; font-size: large"
        ><van-icon name="add-o" style="margin-right: 5px" />upload pet
        image</van-divider
      >
      <div class="add-pet-image">
        <van-uploader
          v-model="petImageList"
          multiple
          :max-count="6"
          class="img"
          upload-text="Pet Images"
          upload-icon="plus"
        />
      </div>
      <van-divider style="padding: 0 16px; font-size: large"
        ><van-icon name="records" style="margin-right: 5px" />choose pet
        category</van-divider
      >
      <div class="tag-choice-container">
        <van-radio-group v-model="checked">
          <van-cell-group inset>
            <van-cell title="Cat" clickable @click="checked = 'cat'">
              <template #right-icon>
                <van-radio name="cat" />
              </template>
            </van-cell>
            <van-cell title="Dog" clickable @click="checked = 'dog'">
              <template #right-icon>
                <van-radio name="dog" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="add-post-button">
        <van-button
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          class="postBtn"
          @click="onClickSubmitPet"
        >
          Add Pet
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { createPet } from '@/api/pet'
import { Notify, Toast } from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
export default {
  setup() {
    // route back
    const route = useRouter()
    const onClickLeft = () => {
      route.back()
    }

    // add or change avatar
    const avatarUrl = ref('')
    const showUploader = ref(true)
    const afterReadAvatar = (file: any) => {
      avatarUrl.value = file.content
    }
    const target = ref()
    const triggerUpload = () => {
      // target.value.click()
      console.log('clear image buffer...')
      target.value.chooseFile()
    }

    // input or change pet name
    const petName = ref('')

    // input or change introduction
    const description = ref('')

    // input or change pet image
    const petImageList = ref([])
    const petImageListArr = computed(() => {
      return petImageList.value.map((item: any) => item.content)
    })
    // cat or dog
    const checked = ref('cat')
    const onClickSubmitPet = () => {
      createPet({
        avatarUrl: avatarUrl.value,
        petName: petName.value,
        petDescription: description.value,
        petImageListArr: petImageListArr.value,
        category: checked.value,
      }).then((value) => {
        console.log(value)
        Notify({ type: 'success', message: 'Successfully add pet.' })
        route.back()
      })
    }
    //oversize
    const onOversize = () => {
      Toast.fail('image size show be smaller than 10MB')
    }

    return {
      petName,
      showUploader,
      avatarUrl,
      target,
      petImageList,
      description,
      checked,

      onClickLeft,
      afterReadAvatar,
      triggerUpload,
      onClickSubmitPet,
      onOversize,
    }
  },
}
</script>

<style scoped lang="less">
.petBasicInfo {
  //padding-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  .avatar {
    width: 110px;
    height: 110px;
    border: 2px solid white;
  }
  .name {
    width: 200px;
    height: 40px;
    vertical-align: middle;
  }
}

.addPet {
  margin: 20px 20px;
  .intro {
    margin: 0;
  }
  .add-pet-image {
    margin: 15px 2px 5px;
    display: flex;
    justify-content: space-evenly;
    background-color: white;
    border-radius: 4px;

    .img {
      flex: 1;
      :deep(.van-uploader__upload) {
        margin: 4px;
        width: 157px;
        height: 157px;
      }
      :deep(.van-uploader__preview-image) {
        width: 157px;
        height: 157px;
      }
      :deep(.van-uploader__preview) {
        margin: 4px;
      }
    }
  }
}
.add-post-button {
  padding-top: 30px;
  text-align: center;

  .postBtn {
    width: 300px;
  }
}
</style>
