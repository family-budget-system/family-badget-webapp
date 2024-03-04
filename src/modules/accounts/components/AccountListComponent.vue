<script setup lang="ts">
import {useBillsStore} from "@/modules/accounts/store/BillsStore.ts";
import BngBankIcon from "@/assets/icons/BngBankIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {BillTypeEnum} from "@/@types/bills.types.ts";
import BngCashIcon from "@/assets/icons/BngCashIcon.vue";
import BngCreditCardIcon from "@/assets/icons/BngCreditCardIcon.vue";
import {formatCurrencyUtils} from "@/utils/format-currency.utils.ts";

const billsStore = useBillsStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="card card--white text-richBlack flex items-center justify-between gap-24" v-for="bill of billsStore.bills" :key="bill.id">
      <div class="flex gap-6">
        <bng-icon v-if="bill.billType === BillTypeEnum.BANK_BILL"><bng-bank-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CASH"><bng-cash-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CARD"><bng-credit-card-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.CREDIT"><bng-credit-card-icon /></bng-icon>
        <bng-icon v-if="bill.billType === BillTypeEnum.DEPOSIT"><bng-credit-card-icon /></bng-icon>
        <div>{{ bill.name }}</div>
      </div>
      <div>{{ formatCurrencyUtils(bill.balance) }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>