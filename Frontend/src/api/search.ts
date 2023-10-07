import request from '@/utils/request'

export const getTrendingPosts = (params: object): Promise<any> => {
  return request('/search/trendingPosts', 'get', params)
}

export const getAdvertisement = (params: object): Promise<any> => {
  return request('/search/advertisement', 'get', params)
}

export const getSearchPosts = (
  keyword: string,
  params: object
): Promise<any> => {
  return request(`/search/${keyword}`, 'get', params)
}
