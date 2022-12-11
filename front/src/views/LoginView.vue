<template class="flex-container">
    <div class="content container">
        <div class="id-container">
            <div class="id-field">
                <div class="input-container">
                    <label class="input-label" for="Email">Email</label>
                    <input v-model="email" class="input-box" type="text" />
                </div>
                <div class="form-group">
                    <label class="input-label" for="apikey">API key</label>
                    <input v-model="apikey" class="input-box" type="text" />
                </div>
                <div>
                    <input @click="login()" type="submit" value="Login" class="submit" />
                </div>
            </div>
            <div class="explanation">
                To get an API key, gow to <a class="text-link" href="https://newsapi.org/register">NewsAPI.org</a>
                and register an account.
                <br />
                After that, you will recieve an API key, that you can use to use this site.
                <br />
                While logged in, the API key will be stored in your browser.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import router from "@/router";
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
    email = "";
    apikey = "";
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


.explanation {
    margin-top: 15%;
    margin-left: 1rem;
}

@media (max-width: 1000px) {
    .explanation {
        margin-top: 2rem;
    }
}
</style>