<script setup lang="ts">

import TipsLayout from "@/components/layouts/TipsLayout.vue";
import {useTipsStore} from "@/stores/TipsStore.ts";
import OperationCardComponent from "@/modules/operations/components/OperationCardComponent.vue";
import {useOperationsStore} from "@/modules/operations/store/operations.store.ts";
import loadingHook from "@/hooks/loadingHook.ts";
import BngObserver from "@/components/ui/BngObserver.vue";
import {computed} from "vue";
import OperationsByDateList from "@/modules/operations/components/OperationsByDateList.vue";

const tipsStore = useTipsStore()
const operationsStore = useOperationsStore()
const { isLoading, loadData } = loadingHook()

const lastPage = computed(() => {
  if (!operationsStore.operationPageMeta) return false
  return operationsStore.operationPageMeta?.totalPages === operationsStore.operationPageMeta?.currentPage
})

const intersect = async () => {
  if (lastPage.value) return
  operationsStore.setPageOption(operationsStore.pageableOptions.page + 1)
  await operationsStore.fetchOperations()
}

const operationsByDate = computed(() => {
  return Object.fromEntries(operationsStore.operations.entries())
})

</script>

<template>
  <div class="flex flex-col gap-6">
    <TipsLayout v-if="tipsStore.visibleOperationTips.length">
      <component v-for="tip of tipsStore.visibleOperationTips" :key="tip.componentName" :is="tip.componentName" />
    </TipsLayout>


    <div>
      <div class="title mb-6">Операции</div>

      <div class="flex flex-col gap-6">
        <OperationsByDateList
          v-for="(operations, key) in operationsByDate"
          :key="key"
          :date="key.toString()"
          :operations="operations"
        />
      </div>

      <bng-observer v-if="!lastPage && !isLoading" @intersect="intersect" />
    </div>
  </div>
  <div class="flex flex-col gap-6">
    <div class="card"></div>
  </div>
</template>

<style scoped>

</style>