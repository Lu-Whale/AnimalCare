import request from '@/utils/request'

export const GetPetList = (params: object): Promise<any> => {
  return request('/getPetList', 'get', params)
}

export const createPet = (params: object): Promise<any> => {
  return request('/pet/newPet', 'post', params)
}

export const getPetById = (url: string, params: object): Promise<any> => {
  return request(`/pet/${url}`, 'get', params)
}
export const deletePetById = (id: number, params: object): Promise<any> => {
  return request(`/pet/${id}`, 'delete', params)
}
