import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from "@/lib/router"


const app = createApp(App)
        .use(router)



app.mount('#app')
