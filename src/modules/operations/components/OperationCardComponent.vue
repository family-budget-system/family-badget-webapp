<script setup lang="ts">

import BngIcon from "@/components/ui/BngIcon.vue";
import {PropType} from "vue";
import {OperationItemType} from "@/modules/operations/@types";
import {formatCurrencyUtils} from "@/utils/format-currency.utils.ts";
import BngChatIcon from "@/assets/icons/BngChatIcon.vue";
import {useBillsStore} from "@/modules/accounts/store/BillsStore.ts";
import {TransactionTypeEnum} from "@/@types/transaction.types.ts";

const props = defineProps({
  operation: {
    type: Object as PropType<OperationItemType>,
    required: true
  }
})

const billsStore = useBillsStore()
</script>

<template>
  <div class="card card--white grid grid-cols-12 gap-6">
    <div class="col-span-2">
      <div class="p-2 border-[1px] rounded-full border-richBlack text-UCLABlue inline-flex">
        <div class="w-[24px] h-[24px]" v-html="operation.category.icon.svgContent"></div>
      </div>
    </div>

    <div class="col-span-4 flex flex-col">
      <div class="text-richBlack font-semibold mb-1">{{ operation.category.title }}</div>
      <div class="flex items-center gap-1 text-sm text-glaucous">
        <bng-icon v-if="operation.bill.billType" size="18"><component :is="`bng-${billsStore.getBillType(operation.bill.billType).icon}-icon`" /></bng-icon>
        <div>{{ operation.bill.title }}</div>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <bng-icon size="18"><bng-chat-icon /></bng-icon>
        <div>{{ operation.comment }}</div>
      </div>
    </div>

    <div
      :class="{
        'text-laurelGreenSolid': operation.transaction_type === TransactionTypeEnum.income,
        'text-tuscanySolid': operation.transaction_type === TransactionTypeEnum.consumption
      }"
      class="place-self-end col-span-6 self-start">
      <span v-if="operation.transaction_type === TransactionTypeEnum.income">+ </span>
      <span v-else-if="operation.transaction_type === TransactionTypeEnum.consumption">- </span>
      <span>{{ formatCurrencyUtils(operation.amount, operation.bill.currency.code_name) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>