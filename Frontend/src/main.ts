import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import piniaPersist from 'pinia-plugin-persist'

// 全局样式
import '@less/global.less'

// //mockjs
// import '@/mock'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App)
  .use(pinia) // 启用 Pina
  .use(router)
  .mount('#app')
