<template class="flex-container">
  <nav class="content">
    <ol class="navigation-list">
      <li>
        <RouterLink to="/" class="nav-item">Home</RouterLink>
      </li>
        <li v-if="identity.$state.identified" class="right-side">
            <span class="nav-item" @click="logout()">Logout</span>
        </li>
      <li v-if="identity.$state.identified" class="right-side">
        <RouterLink to="/profile" class="nav-item">Profile</RouterLink>
      </li>
      <span class="right-side" v-else>
        <li>
          <RouterLink to="/login" class="nav-item">Login</RouterLink>
        </li>
      </span>
    </ol>
  </nav>
</template>

<script>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


import {useIdentityStore} from "@/stores/identity";
import {Vue} from "vue-class-component";
import router from "@/router";

export default class MainNavbar extends Vue{
    identity = useIdentityStore();

    logout() {
        console.log('logoutClicked');
        this.identity.forget();
        router.push("/");
    }
}
</script>


<style scoped>
@import "../assets/main.css";
</style>