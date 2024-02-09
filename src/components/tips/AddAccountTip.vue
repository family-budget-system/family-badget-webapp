<script setup lang="ts">

import BngIcon from "@/components/ui/BngIcon.vue";
import BngButton from "@/components/ui/BngButton.vue";
import BngCreditCardIcon from "@/assets/icons/BngCreditCardIcon.vue";
import {useRouter} from "vue-router";
import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";
import {useTipsStore} from "@/stores/TipsStore.ts";
import {getCurrentInstance} from "vue";

const router = useRouter()


const componentName = getCurrentInstance()?.type.__name
const tipStore = useTipsStore()
const closeTip = () => tipStore.changeVisibleOperationTip(componentName as string, false)
</script>

<template>
  <div class="card flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <bng-icon size="32"><bng-credit-card-icon /></bng-icon>
        <bng-icon @click="closeTip" class="cursor-pointer"><bng-close-icon /></bng-icon>
      </div>
      <div class="section-title">Добавьте Ваш счёт</div>
      <p>Все ваши операции привязываются к определённому счёту, вы можете добавить его в разделе Счета</p>
    </div>
    <bng-button @click="router.push({ name: 'accounts' })">Добавить</bng-button>
  </div>
</template>

<style scoped>

</style>