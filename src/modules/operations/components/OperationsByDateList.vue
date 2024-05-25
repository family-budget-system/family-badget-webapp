<script setup lang="ts">

import {computed, PropType} from "vue";
import {OperationItemType} from "@/modules/operations/@types";
import OperationCardComponent from "@/modules/operations/components/OperationCardComponent.vue";
import {formatPublishedDate} from "@/utils/format-date.utils.ts";

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  operations: {
    type: Array as PropType<OperationItemType[]>,
    default: [],
  }
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="text-lg text-richBlack font-semibold">{{ formatPublishedDate(new Date(date)) }}</div>
    <div v-for="operation of operations" :key="operation.id" class="flex flex-col gap-6">
      <OperationCardComponent :operation="operation" />
    </div>
  </div>
</template>

<style scoped>

</style>