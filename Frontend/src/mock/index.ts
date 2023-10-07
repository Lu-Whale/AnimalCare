import Mock from 'mockjs'
import fake from './login'

Mock.setup({
  // 0.2s~0.3s delay
  timeout: '500-1000',
})

Mock.mock(/\/getUserInfo/, 'get', fake.getUserInfo)
Mock.mock(/\/getPosts/, 'get', fake.getPosts)
