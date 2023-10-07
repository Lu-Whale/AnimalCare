import { Toast } from 'vant'
import 'vant/es/toast/style'
import { checkId } from '@/api/user'
export const usernameValidator = async (
  username: string
): Promise<string | boolean> => {
  if (!/^[\da-zA-Z]{6,10}$/.test(username)) {
    return 'Username must contain 6-10 alphabetical and numeric characters!'
  }
  Toast.loading({
    forbidClick: true,
  })
  const res = await checkId({ userName: username })
  Toast.clear()
  if (res.message === 'Fail') {
    return 'Username already exists!'
  }
  return true
}

export const usernameValidatorLogin = (username: string): string | boolean => {
  if (!/^[\da-zA-Z]{6,10}$/.test(username)) {
    return 'Username must contain 6-10 alphabetical and/or numeric characters!'
  }
  return true
}

export const passwordValidator = (password: string): string | boolean => {
  if (!/[A-Za-z\d]{6,}$/.test(password)) {
    return 'Password must contain at least 6 alphabetical and/or numeric characters!'
  } else {
    return true
  }
}
export const emailValidator = (str: string): string | boolean => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) {
    return 'Invalid Email address'
  } else {
    return true
  }
}
