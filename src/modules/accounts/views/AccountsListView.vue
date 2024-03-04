<script setup lang="ts">

import BngIcon from "@/components/ui/BngIcon.vue";
import BngPlusIcon from "@/assets/icons/BngPlusIcon.vue";
import AccountListComponent from "@/modules/accounts/components/AccountListComponent.vue";
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="title">Карты и счета</div>

    <div class="action-button">
      <bng-icon><bng-plus-icon /></bng-icon>
      <div>Добавить карту, вклад, кредит...</div>
    </div>

    <AccountListComponent />
  </div>
  <div class="flex flex-col gap-6">
    <div class="card"></div>
  </div>
</template>

<style scoped>

</style>