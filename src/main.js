import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import store from './store/index'

const app = createApp(App)

let basePath = process.env.NODE_ENV === 'production' ? 'https://ingeqrmaker-maxifrega21.b4a.run' : 'http://localhost:3001'
let baseApiPath = process.env.NODE_ENV === 'production' ? 'https://ingeqrmaker-maxifrega21.b4a.run/qr' : 'http://localhost:3001/qr'
app.provide('basePath', basePath)
app.provide('apiUrl', baseApiPath)

app.use(store)

app.config.globalProperties.emitter = mitt()
app.mount('#app')
