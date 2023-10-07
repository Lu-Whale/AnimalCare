import request from '@/utils/request'

export const GetFriendList = (params: object): Promise<any> => {
  return request('/friends', 'get', params)
}

export const GetFriendRequestList = (params: object): Promise<any> => {
  return request('/friends/requests', 'get', params)
}

export const AcceptFriendRequest = (
  id: string,
  params: object
): Promise<any> => {
  return request(`/friends/${id}`, 'post', params)
}

export const RejectFriendRequest = (
  id: string,
  params: object
): Promise<any> => {
  return request(`/friends/${id}`, 'delete', params)
}

export const SendFriendRequest = (id: string, params: object): Promise<any> => {
  return request(`/friends/${id}`, 'get', params)
}

export const CheckFriendshipStatus = (
  id: string,
  params: object
): Promise<any> => {
  return request(`/friends/status/${id}`, 'get', params)
}

export const DeleteFriend = (id: string, params: object): Promise<any> => {
  return request(`/friends/delete/${id}`, 'delete', params)
}
