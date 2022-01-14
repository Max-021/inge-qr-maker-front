import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import store from './store/index'

const app = createApp(App)
app.provide('apiUrl', 'http://localhost:3001/qr')
app.use(store)

app.config.globalProperties.emitter = mitt()
app.mount('#app')
