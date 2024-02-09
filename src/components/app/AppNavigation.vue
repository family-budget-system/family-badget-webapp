<script setup lang="ts">
  import {computed} from "vue";
  import BngIcon from "@/components/ui/BngIcon.vue";
  import BngWrenchIcon from "@/assets/icons/BngWrenchIcon.vue";
  import {useI18n} from "vue-i18n";
  import BngPlusIcon from "@/assets/icons/BngPlusIcon.vue";
  import {useRoute, useRouter} from "vue-router";

  const { t } = useI18n()

  const menuItems = computed(() => [
    { icon: "swap", value: "operations" },
    { icon: "creditCard", value: "accounts" },
    { icon: "notebookMultiple", value: "plans" },
    { icon: "poll", value: "analytics" },
    { icon: "detail", value: "reports" },
    { icon: "user", value: "personalArea" },
  ])

  const route = useRoute()
  const router = useRouter()

  const isUsedRoute = (value: string) => {
    return route.fullPath.includes(value)
  }
</script>

<template>
  <div class="card card--white border-none flex flex-col px-9 gap-6 justify-between">
    <div class="flex flex-col gap-6">
      <div v-for="(item, i) of menuItems" :key="i">
        <div class="navigation-item" :class="{ 'text-brightNavyBlueSolid': isUsedRoute(item.value) }" @click="router.push({ name: item.value })">
          <bng-icon><component :is="`bng-${item.icon}-icon`" /></bng-icon>
          <div>{{ $t(`navigation.${item.value}`) }}</div>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <bng-icon><bng-wrench-icon /></bng-icon>
      <div>{{ $t("navigation.administration") }}</div>
    </div>
  </div>
</template>

<style scoped>
  .navigation-item {
    @apply flex gap-2 items-center hover:text-glaucous cursor-pointer;
  }
</style>