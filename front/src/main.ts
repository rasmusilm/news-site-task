import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')

import {useIdentityStore} from "@/stores/identity";
const identityStore = useIdentityStore()

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.permitAll)) {
        next()
    } else {
        if (!identityStore.identified) {
            next({ name: 'login' })
        } else {
            next() // go to wherever I'm going
        }
    }
})
