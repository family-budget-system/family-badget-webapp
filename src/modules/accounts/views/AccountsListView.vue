<script setup lang="ts">

import BngIcon from "@/components/ui/BngIcon.vue";
import BngPlusIcon from "@/assets/icons/BngPlusIcon.vue";
import AccountListComponent from "@/modules/accounts/components/AccountListComponent.vue";
import AddBillDialog from "@/modules/accounts/components/AddBillDialog.vue";
import {onMounted, ref} from "vue";
import {useBillsStore} from "@/modules/accounts/store/BillsStore.ts";

const addBillDialog = ref(null)

const showAddBillDialog = () => {
  (addBillDialog.value as any).showDialog()
}

const billsStore = useBillsStore()

onMounted(async () => {
  fetchBills()
})

const fetchBills = async () => {
  await billsStore.fetchBills()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="title">Карты и счета</div>

    <div @click="showAddBillDialog" class="action-button">
      <bng-icon><bng-plus-icon /></bng-icon>
      <div>Добавить карту, вклад, кредит...</div>
    </div>

    <AccountListComponent />
  </div>

  <AddBillDialog @billCreated="fetchBills" ref="addBillDialog" />
</template>

<style scoped>

</style>