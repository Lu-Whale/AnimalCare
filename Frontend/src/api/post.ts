import request from '@/utils/request'

export const getPosts = (params: object): Promise<any> => {
  return request('/getPosts', 'get', params)
}

export const submitPosts = (params: object): Promise<any> => {
  return request('/post/newPost', 'post', params)
}

export const getImage = (params: object): Promise<any> => {
  return request('/getImage', 'get', params)
}

export const getPostById = (url: string, params: object): Promise<any> => {
  return request(`/getPost/${url}`, 'get', params)
}

export const getProfile = (params: object): Promise<any> => {
  return request(`/profile`, 'get', params)
}

export const createLove = (url: string, params: object): Promise<any> => {
  return request(`/love/${url}`, 'get', params)
}

export const deleteLove = (url: string, params: object): Promise<any> => {
  return request(`/love/${url}`, 'delete', params)
}

export const getProfileById = (url: string, params: object): Promise<any> => {
  return request(`/profile/${url}`, 'get', params)
}

export const deletePostById = (url: string, params: object): Promise<any> => {
  return request(`/post/deletePost/${url}`, 'delete', params)
}

export const addComment = (postId: string, params: object): Promise<any> => {
  return request(`/Post/addComment/${postId}`, 'post', params)
}

export const getCommets = (postId: string, params: object): Promise<any> => {
  return request(`getCommentsByPostId/${postId}`, 'get', params)
}
export const getPostsOrderByLove = (params: object): Promise<any> => {
  return request(`getPostsOrderByLove`, 'get', params)
}
