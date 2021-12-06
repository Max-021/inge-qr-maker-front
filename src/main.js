import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const app = createApp(App)
app.provide('apiUrl', 'http://localhost:3001/qr')

app.config.globalProperties.emitter = mitt()
app.mount('#app')
