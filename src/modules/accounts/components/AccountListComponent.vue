<script setup lang="ts">
import {useBillsStore} from "@/modules/accounts/store/BillsStore.ts";
import BngIcon from "@/components/ui/BngIcon.vue";
import {formatCurrencyUtils} from "@/utils/format-currency.utils.ts";

const billsStore = useBillsStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      class="card card--white text-richBlack flex items-center justify-between gap-24"
      v-for="bill of billsStore.bills"
      :key="bill.id"
    >
      <div class="flex gap-6 items-center">
        <bng-icon
          v-if="bill.billType"
          size="32"
        >
          <component :is="`bng-${billsStore.getBillType(bill.billType).icon}-icon`" />
        </bng-icon>
        <div class="flex flex-col gap-1">
          <div class="text-richBlack font-semibold text-lg">{{ bill.title }}</div>
          <div class="text-sm text-ceil">{{ billsStore.getBillType(bill.billType).title }}</div>
        </div>
      </div>
      <div>{{ formatCurrencyUtils(bill.balance, "KZT") }}</div>
    </div>
  </div>
</template>