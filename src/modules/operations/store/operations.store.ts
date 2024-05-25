import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {OperationItemType} from "@/modules/operations/@types";
import {TransactionService} from "@/services/web-api/transaction.service.ts";
import {PageableType} from "@/services/web-api/@types/pageable.types.ts";
import {PageableMeta} from "@/@types";


export const useOperationsStore = defineStore('operationsStore', () => {
  const operations = ref(new Map<string, OperationItemType[]>)
  const operationPageMeta: Ref<PageableMeta | null> = ref(null)
  const pageableOptions: Ref<PageableType> = ref({
    limit: 10,
    page: 0
  })

  const fetchOperations = async () => {
    const list  = await TransactionService.fetchTransactionList(pageableOptions.value)
    operationPageMeta.value = list.meta
    list.items.forEach(transaction => {
      if (operations.value.has(transaction.payment_date)) {
        operations.value.get(transaction.payment_date)!.push(transaction)
      } else {
        operations.value.set(transaction.payment_date, [transaction])
      }
    })
  }

  const setPageOption = (page: number) => {
    pageableOptions.value.page = page
  }

  const resetPageableOptions = () => {
    pageableOptions.value = {
      limit: 10,
      page: 0,
    }
  }

  return {
    operations,
    operationPageMeta,
    pageableOptions,

    fetchOperations,
    setPageOption,
    resetPageableOptions
  }
})