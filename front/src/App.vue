<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainNavbar from "@/components/navbar.vue";
import TheHeader from "@/components/header.vue";
</script>

<template>
    <the-header />
    <main-navbar />
    <RouterView />

</template>

<style scoped>

</style>
