import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {persistUserLoginData, persistAllUserData, clearUserData} from '@/services/local'

export const useIdentityStore = defineStore('identity', {
    state: () => ({
        email: null as string | null,
        apikey: null as string | null,
        identified: false,

        name: null as string | null,
    }),
    actions: {
        identify(email: string, key: string) {
            this.email = email;
            this.apikey = key;
            this.identified = true;
            persistUserLoginData(this.email, this.apikey)
        },
        identifyUsingLocalStorage(): boolean {
            if (localStorage.identified === "true") {
                this.email = localStorage.email;
                this.apikey = localStorage.apiKey;
                this.identified = true;
                return true;
            }
            return false;
        },
        setName(name: string) {
            this.name = name;
        },
        setEmail(email: string) {
            this.email = email;
        },
        setAPIKey(key: string) {
            this.apikey = key;
        },
        updateLocalStorage() {
            persistAllUserData(this.email, this.apikey, this.name)
        },
        forget() {
            clearUserData();
            this.identified = false;
            this.email = null as string | null;
            this.apikey = null as string | null;
        }
    }
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }
})