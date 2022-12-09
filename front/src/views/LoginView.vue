<template>
    <div class="id-container">
        <div class="id-field">
            <div class="input-container">
                <label class="input-label" for="Email">Email</label>
                <input v-model="email" class="input-box" type="text" />
            </div>
            <div class="form-group">
                <label class="input-label" for="Password">Password</label>
                <input v-model="apikey" class="input-box" type="text" />
            </div>
            <div>
                <input @click="login()" type="submit" value="Login" class="submit" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import router from "@/router";
import {useCounterStore} from "@/stores/counter";
import {useIdentityStore} from "@/stores/identity";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default class Login extends Vue {
    email = "user@email.com";
    apikey = "password";
    identity = useIdentityStore();

    mounted() {
        if (this.identity.identifyUsingLocalStorage()) {
            router.push("/feed");
        }
    }

    async login() : Promise<void> {
        // alert(`testing ${this.email} with ${this.password}`)
        console.log('submitClicked');
        this.identity.identify(this.email, this.apikey);
        await router.push("/feed");
    }
}
</script>

<style scoped>
@import "@/assets/identity.css";
</style>