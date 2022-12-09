<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MainNavbar from "@/components/navbar.vue";
import TheHeader from "@/components/header.vue";
</script>

<template>
  <main-navbar />
    <the-header />
  <RouterView />
</template>

<style scoped>

</style>
