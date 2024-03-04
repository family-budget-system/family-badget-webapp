<script setup lang="ts">

import TipsLayout from "@/components/layouts/TipsLayout.vue";
import {useTipsStore} from "@/stores/TipsStore.ts";

const tipsStore = useTipsStore()
</script>

<template>
  <div class="flex flex-col gap-6">
    <TipsLayout v-if="tipsStore.visibleOperationTips.length">
      <component v-for="tip of tipsStore.visibleOperationTips" :key="tip.componentName" :is="tip.componentName" />
    </TipsLayout>

    <div class="title">Операции</div>
  </div>
  <div class="flex flex-col gap-6">
    <div class="card"></div>
  </div>
</template>

<style scoped>

</style>