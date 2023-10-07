<template>
  <div class="addPost">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Add Post"
      class="myNav"
      fixed
    />
    <van-divider style="padding: 0 16px; font-size: large"
      ><van-icon name="add-o" style="margin-right: 5px" /> upload post
      images</van-divider
    >
    <div class="add-post-upload-image">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="6"
        class="img"
        accept="image/png, image/jpeg"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
        upload-text="Post Images"
        upload-icon="plus"
      />
    </div>
    <van-divider style="padding: 0 16px; font-size: large">
      <van-icon name="records" style="margin-right: 5px" />add
      title</van-divider
    >
    <van-cell-group inset>
      <van-field v-model="title" placeholder="Please add title here" />
    </van-cell-group>

    <van-divider style="padding: 0 16px; font-size: large">
      <van-icon name="records" style="margin-right: 5px" />add
      description</van-divider
    >

    <van-cell-group inset>
      <van-field
        v-model="description"
        rows="4"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="Please add description of your post here"
        show-word-limit
      />
    </van-cell-group>

    <van-divider style="padding: 0 16px; font-size: large">
      <van-icon name="records" style="margin-right: 5px" />add tag</van-divider
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
        @click="onClickSubmitPost"
      >
        Add Post
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { submitPosts } from '@/api/post'
import { computed } from 'vue'
import { Notify, Toast } from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
export default {
  setup() {
    const fileList = ref([])
    const title = ref('')
    const description = ref('')
    // cat or dog
    const checked = ref('cat')

    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }
    const fileListArr = computed(() => {
      return fileList.value.map((item: any) => item.content)
    })
    const onClickSubmitPost = () => {
      submitPosts({
        postTopic: title.value,
        postContent: description.value,
        base64Data: fileListArr.value,
        tag: checked.value,
      }).then((value) => {
        console.log(value)
        Notify({ type: 'success', message: 'Successfully add post.' })
        router.back()
      })
    }
    //oversize
    const onOversize = () => {
      Toast.fail('image size show be smaller than 10MB')
    }

    return {
      title,
      description,
      fileList,
      checked,

      onClickLeft,
      onClickSubmitPost,
      onOversize,
    }
  },
}
</script>

<style scoped lang="less">
.addPost {
  padding-top: 50px;

  .add-post-upload-image {
    margin: 15px 15px 5px;
    border-radius: 4px;
    display: flex;
    justify-content: space-evenly;
    background-color: white;
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
