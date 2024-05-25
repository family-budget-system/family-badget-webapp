<script setup lang="ts">

import BngBankIcon from "@/assets/icons/BngBankIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {PropType} from "vue";
import {OperationItemType} from "@/modules/operations/@types";
import {formatCurrencyUtils} from "@/utils/format-currency.utils.ts";
import BngChaticon from "@/assets/icons/BngChatIcon.vue";
import BngChatIcon from "@/assets/icons/BngChatIcon.vue";

const props = defineProps({
  operation: {
    type: Object as PropType<OperationItemType>,
    required: true
  }
})
</script>

<template>
  <div class="card card--white grid grid-cols-12 gap-6">
    <div class="col-span-2">
      <div class="p-3 border-[1px] rounded-full border-richBlack text-UCLABlue inline-flex"><bng-icon><bng-bank-icon /></bng-icon></div>
    </div>

    <div class="col-span-4 flex flex-col">
      <div class="text-richBlack font-semibold mb-1">{{ operation.category.title }}</div>
      <div class="flex items-center gap-1 text-sm text-glaucous">
        <bng-icon size="18"><bng-bank-icon /></bng-icon>
        <div>{{ operation.bill.title }}</div>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <bng-icon size="18"><bng-chat-icon /></bng-icon>
        <div>{{ operation.comment }}</div>
      </div>
    </div>

    <div class="place-self-end col-span-6 self-start text-richBlack font-semibold">
      <span>{{ formatCurrencyUtils(operation.amount, operation.bill.currency.code_name) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>