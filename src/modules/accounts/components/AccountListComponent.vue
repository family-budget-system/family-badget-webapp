<script setup lang="ts">
import {useBillsStore} from "@/modules/accounts/store/BillsStore.ts";
import BngBankIcon from "@/assets/icons/BngBankIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {BillTypeEnum} from "@/@types/bills.types.ts";
import BngCashIcon from "@/assets/icons/BngCashIcon.vue";
import BngCreditCardIcon from "@/assets/icons/BngCreditCardIcon.vue";
import {formatCurrencyUtils} from "@/utils/format-currency.utils.ts";
import {computed, onMounted} from "vue";

const billsStore = useBillsStore()

onMounted(async () => {
  await billsStore.fetchBills()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="card card--white text-richBlack flex items-center justify-between gap-24" v-for="bill of billsStore.bills" :key="bill.id">
      <div class="flex gap-6 items-center">
        <bng-icon v-if="bill.billType === BillTypeEnum.BANK_BILL" size="32"><bng-bank-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CASH" size="32"><bng-cash-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CARD" size="32"><bng-credit-card-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CREDIT" size="32"><bng-credit-card-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.DEPOSIT" size="32"><bng-credit-card-icon /></bng-icon>
        <div class="flex flex-col gap-1">
          <div class="text-richBlack font-semibold text-lg">{{ bill.title }}</div>
          <div class="text-sm text-ceil">{{ billsStore.getBillTypeTitle(bill.billType) }}</div>
        </div>
      </div>
      <div>{{ formatCurrencyUtils(bill.balance, "KZT") }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>