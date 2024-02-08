<script setup lang="ts">
  import {computed} from "vue";
  import BngIcon from "@/components/ui/BngIcon.vue";
  import BngWrenchIcon from "@/assets/icons/BngWrenchIcon.vue";
  import {useI18n} from "vue-i18n";
  import BngPlusIcon from "@/assets/icons/BngPlusIcon.vue";
  import {useRoute, useRouter} from "vue-router";

  const { t } = useI18n()

  const menuItems = computed(() => [
    { icon: "home", value: "home" },
    { icon: "group", value: "consumers" },
    { icon: "receipt", value: "contracts" },
    { icon: "building-house", value: "objects" },
    { icon: "calculator", value: "calculation" },
    { icon: "detail", value: "reports" },
    { icon: "money", value: "payments" },
    { icon: "user", value: "personalArea" },
  ])

  const route = useRoute()
  const router = useRouter()

  const goToRoute = (value: string) => {
    if (value === "contracts") {
      router.push({ name: "contractCard", params: { id: 8 } })
    } else if (value === "consumers") {
      router.push({ name: "consumerCard", params: { id: 4 } })
    }
  }

  const isUsedRoute = (value: string) => {
    return route.fullPath.includes(value)
  }
</script>

<template>
  <div class="card card--white border-none flex flex-col px-9 gap-6 justify-between">
    <div class="flex flex-col gap-6">
      <div v-for="(item, i) of menuItems" :key="i">

        <div v-if="item.value === 'contracts'" class="flex gap-2 justify-between items-center">
          <div class="navigation-item" :class="{ 'text-brightNavyBlueSolid': isUsedRoute(item.value) }" @click="goToRoute(item.value)">
            <bng-icon><component :is="`bng-${item.icon}-icon`" /></bng-icon>
            <div>{{ $t(`navigation.${item.value}`) }}</div>
          </div>
          <bng-icon @click.stop="router.push({ name: 'createContract' })" class="text-brightNavyBlueSolid cursor-pointer"><bng-plus-icon /></bng-icon>
        </div>

        <div v-else class="navigation-item" :class="{ 'text-brightNavyBlueSolid': isUsedRoute(item.value) }" @click="goToRoute(item.value)">
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