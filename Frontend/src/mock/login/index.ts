import { Post } from '@/types'
import Mock from 'mockjs'

export default {
  getUserInfo: () => {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(
        Mock.mock({
          id: '@id',
          name: '@cname',
        })
      )
    }
    return { msg: 'success mock data', data: arr }
  },
  getPosts: () => {
    const arr: Array<Post> = []
    for (let i = 0; i < 6; i++) {
      arr.push(
        Mock.mock({
          postImgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          postTitle: 'dkhsdaflkjasefluohsdklfujyafkjlhsdlkfusadkfl',
          postId: '@id',
          userId: '@id',
          userImgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        })
      )
    }
    return { msg: 'success mock data', data: arr }
  },
}
