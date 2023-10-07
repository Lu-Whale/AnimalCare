<template>
  <div class="loginContainer">
    <van-nav-bar title="Login Page" class="navBar" />
    <van-form @submit="onSubmit" class="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="Username"
          placeholder="username"
          :rules="[{ validator: usernameValidatorLogin }]"
          left-icon="friends-o"
          autocomplete="off"
        />
        <van-field
          ref="fieldRef"
          v-model="password"
          :type="inputType"
          name="password"
          label="Password"
          placeholder="password"
          :rules="[{ validator: passwordValidator }]"
          left-icon="shield-o"
          :right-icon="iconShow"
          @click-right-icon="showPwd()"
        />
      </van-cell-group>
      <br />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="isLoading"
          loading-type="spinner"
          class="loginBtn"
        >
          Sign in
        </van-button>
        <van-button @click="show = true" round type="default" class="signUpBtn"
          >Sign up
        </van-button>
      </div>
    </van-form>
    <p class="forgot" @click="forgotShow = true">Forgot password?</p>
    <van-overlay :show="show">
      <sign-up @complete="show = false" />
    </van-overlay>
    <van-dialog
      v-model:show="forgotShow"
      title="Reset your password"
      close-on-click-overlay
      show-cancel-button
      confirm-button-text="OK"
      cancel-button-text="Cancel"
      @closed="resetForm"
      @confirm="resetPass"
    >
      <van-form ref="targetForm">
        <van-cell-group inset>
          <van-field
            v-model="emailUser"
            placeholder="Username"
            :rules="[{ validator: usernameValidatorLogin }]"
            autocomplete="off"
          >
          </van-field>
          <van-field
            v-model="Email"
            name="Email"
            placeholder="Email"
            :rules="[{ validator: emailValidator }]"
            autocomplete="off"
            ref="emailTarget"
          >
            <template #button>
              <van-button
                size="small"
                type="primary"
                @click="sendEmail"
                :loading="isSending"
                :disabled="isDisable"
                class="codeBtn"
                >{{ codeText }}</van-button
              >
            </template>
          </van-field>
          <van-field v-model="code" placeholder="Verification Code" />
          <van-field
            v-model="newPassword"
            placeholder="New Password"
            :rules="[{ validator: passwordValidator }]"
            type="password"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FieldType } from 'vant'
import {
  usernameValidatorLogin,
  passwordValidator,
  emailValidator,
} from '@/utils/validator'
import SignUp from './components/signUp.vue'
import { getUserInfo, resetPassword } from '@/api/user'
import { useRouter } from 'vue-router'
import { Dialog, Toast, Notify } from 'vant'
import 'vant/es/dialog/style'
import { FormInstance } from 'vant/lib/form'
import { FieldInstance } from 'vant/lib/field'
import { useUserStore } from '@/stores'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import { sendCode } from '@/api/user'

const show = ref<boolean>(false)

//handle submit
const username = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()
const onSubmit = (): void => {
  isLoading.value = true
  getUserInfo({
    userName: username.value,
    password: password.value,
  })
    .then((value) => {
      let { data } = value
      userStore.setUser(data)
      isLoading.value = false
      router.push({ name: 'home' })
      Notify({ type: 'success', message: 'Welcome' })
    })
    .catch((err) => {
      isLoading.value = false
      Toast(err.response.data.message)
    })
}

//show password or not
const iconShow = ref<string>('closed-eye')
const inputType = ref<FieldType>('password')
const showPwd = (): void => {
  if (iconShow.value === 'closed-eye') {
    iconShow.value = 'eye-o'
    inputType.value = 'text'
  } else {
    iconShow.value = 'closed-eye'
    inputType.value = 'password'
  }
}

// forgot password
const VanDialog = Dialog.Component
const forgotShow = ref(false)
const emailUser = ref('')
const Email = ref('')
const code = ref('')
const newPassword = ref('')
const targetForm = ref<FormInstance>()
const emailTarget = ref<FieldInstance>()
const isSending = ref(false)
const codeText = ref<string | number>('Send Code')
const isDisable = ref(false)
const resetForm = () => {
  Email.value = ''
  code.value = ''
  newPassword.value = ''
  emailUser.value = ''
  targetForm.value?.resetValidation()
}
const sendEmail = () => {
  if (
    targetForm.value?.getValidationStatus().Email === 'passed' &&
    emailUser.value
  ) {
    isSending.value = true
    isDisable.value = true
    console.log('click')
    sendCode({
      email: Email.value,
      userName: emailUser.value,
    })
      .then(() => {
        isSending.value = false
        codeText.value = 20
        let timer = setInterval(() => {
          ;(codeText.value as number) = (codeText.value as number) - 1
          if (codeText.value === 0) {
            codeText.value = 'Send Code'
            isDisable.value = false
            clearInterval(timer)
          }
        }, 1000)
        Toast('Code has been sent')
      })
      .catch((err) => {
        Toast(err)
      })
  } else {
    Toast('Please enter a valid email address')
  }
}
const resetPass = () => {
  resetPassword({
    userName: emailUser.value,
    code: code.value,
    password: newPassword.value,
  })
    .then(() => {
      Toast('Success')
    })
    .catch((err) => {
      Toast(err.response.statusText)
    })
}
</script>

<style scoped lang="less">
.forgot {
  color: @color-blue;
  text-decoration: underline;
  margin-left: 20px;
}
.navBar {
  background-color: @color-blue;
  :deep(.van-nav-bar__title) {
    color: @color-white;
    font-style: italic;
    font-size: 20px;
  }
}
:deep(.van-nav-bar .van-icon) {
  color: @color-white;
  font-size: large;
}
.loginForm {
  margin-top: 100px;
  .signUpBtn {
    :deep(.van-button__text) {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
    }
    margin-left: 50px;
    width: 250px;
    height: 40px;
    border-color: black;
  }
  .loginBtn {
    :deep(.van-button__text) {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
    }
    width: 250px;
    height: 40px;
    margin-bottom: 20px;
    margin-left: 50px;
  }
}
</style>
