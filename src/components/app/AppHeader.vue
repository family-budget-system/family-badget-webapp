<script setup lang="ts">

import BngTextField from "@/components/ui/BngTextField.vue";
import BngSelect from "@/components/ui/BngSelect.vue";
import BngExitIcon from "@/assets/icons/BngExitIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import router from "@/router";

defineProps({
  showOnlyLogo: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="card card--white border-none rounded-none grid grid-cols-12 gap-12 py-3 items-center">
    <div class="col-span-2 cursor-pointer" @click="router.push({ name: 'home' })">
      <img src="@/assets/images/logo.png" class="basis-[155px]" alt="">
    </div>

    <div v-if="!showOnlyLogo" class="col-span-5">
      <BngTextField
        class="w-full"
        placeholder="Поиск"
        secondary
        size="small"
        prepend-inner-icon="search"
      />
    </div>

    <div v-if="!showOnlyLogo" class="col-span-3 flex items-center gap-3 relative">
      <BngSelect
        placeholder="Счёт"
        size="small"
      />
    </div>

    <div v-if="!showOnlyLogo" class="col-span-2 justify-self-end text-auroMetalSaurus hover:text-brightNavyBlueSolid cursor-pointer">
      <div class="flex gap-2 items-center">
        <div>Выход</div>
        <bng-icon><bng-exit-icon /></bng-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>