import request from '@/utils/request'

export const getUserInfo = (params: object): Promise<any> => {
  return request('/login', 'post', params)
}

export const signUp = (params: object): Promise<any> => {
  return request('/signup', 'post', params)
}
export const checkId = (params: object): Promise<any> => {
  return request('/username', 'get', params)
}
export const sendCode = (params: object): Promise<any> => {
  return request('/email', 'post', params)
}
export const resetPassword = (params: object): Promise<any> => {
  return request('/validate', 'post', params)
}
export const updateUserInfo = (params: object): Promise<any> => {
  return request('/edit', 'post', params)
}
export const logout = (params: object): Promise<any> => {
  return request('/logout', 'get', params)
}
