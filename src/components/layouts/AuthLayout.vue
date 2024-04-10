<script setup lang="ts">

import AppHeader from "@/components/app/AppHeader.vue";
</script>

<template>
  <AppHeader show-only-logo />
  <main class="max-sm:mx-2 mx-4 max-md:mt-8 max-xl:mt-12 xl:mt-24 flex justify-center items-center">
    <router-view />
  </main>
</template>

<style scoped>

</style>