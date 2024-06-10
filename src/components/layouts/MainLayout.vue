<script setup lang="ts">

import AppHeader from "@/components/app/AppHeader.vue";
import AppNavigation from "@/components/app/AppNavigation.vue";
import LastTransfersWidjet from "@/components/widjets/LastTransfersWidjet.vue";
</script>

<template>
  <div class="flex flex-col gap-6">
    <AppHeader />
    <div class="mx-6 grid grid-cols-[2fr_7fr_3fr] gap-12 items-start">
      <AppNavigation class="min-h-[500px] h-[70vh]" />

      <router-view />

      <div class="flex flex-col gap-6">
        <LastTransfersWidjet />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>