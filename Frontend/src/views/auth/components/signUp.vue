<template>
  <div class="signup" ref="target">
    <div class="signUpBox">
      <van-form
        @submit="onSubmit"
        @failed="onFailed"
        class="sigUpForm"
        ref="form"
      >
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="Username"
            placeholder="username"
            :rules="[{ validator: usernameValidator }]"
            left-icon="friends-o"
            autocomplete="off"
            @end-validate="onEnd"
          />
          <van-icon name="success" class="success" v-if="isSuccessShow" />
          <van-field
            v-model="Email"
            name="Email"
            label="Email"
            placeholder="email"
            :rules="[{ validator: emailValidator }]"
            left-icon="envelop-o"
            autocomplete="off"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="Password"
            placeholder="password"
            :rules="[{ validator: passwordValidator }]"
            left-icon="shield-o"
          />
          <van-field
            v-model="repassword"
            type="password"
            name="repassword"
            label=""
            placeholder="confirm password"
            :rules="[{ validator: repasswordValidator }]"
            left-icon="shield-o"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            class="submitBtn"
            native-type="submit"
            :loading="isLoading"
          >
            Sign Up
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  usernameValidator,
  passwordValidator,
  emailValidator,
} from '@/utils/validator'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { FormInstance, Toast } from 'vant'
import { signUp } from '@/api/user'
import 'vant/es/toast/style'

const username = ref('')
const password = ref('')
const repassword = ref('')
const Email = ref('')
const repasswordValidator = (pwd: string): string | boolean => {
  if (pwd !== password.value) {
    return 'Please confirm your password!'
  } else {
    return true
  }
}

//handle signUp
const isLoading = ref<boolean>(false)
const onSubmit = (): void => {
  signUp({
    userName: username.value,
    password: password.value,
    email: Email.value,
    userImageAddress: `https://avatars.dicebear.com/api/adventurer/${username.value}.jpg`,
  }).then((value) => {
    if (value.message === 'Success') {
      Toast('success')
      emit('complete')
    }
  })
}
const onFailed = () => {
  Toast('invalid input')
}
//handle clickoutside to close the layout
const target = ref(null)
const emit = defineEmits(['complete'])
const form = ref<FormInstance | null>(null)
onClickOutside(target, () => {
  if (form.value) {
    form.value.resetValidation()
    username.value = ''
    password.value = ''
    repassword.value = ''
    Email.value = ''
    isSuccessShow.value = false
  }
  emit('complete')
})

//success icon show or not
const isSuccessShow = ref(false)
const onEnd = (res: any) => {
  if (res.status === 'passed') {
    console.log(res.status)
    isSuccessShow.value = true
  } else {
    isSuccessShow.value = false
  }
}
</script>

<style lang="less" scoped>
.signup {
  width: 300px;
  border-radius: 40px;
  background-color: whitesmoke;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.signUpBox {
  margin-top: 130px;
  position: relative;
  .success {
    position: absolute;
    font-size: 25px;
    right: 25px;
    top: 10px;
    z-index: 2;
    color: green;
  }
}
.submitBtn {
  margin-top: 50px;
  .signUpForm {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
