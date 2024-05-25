import {defineStore} from "pinia";
import {computed, ref, Ref} from "vue";
import {BillTypeEnum} from "@/@types/bills.types.ts";
import {RefValueItem} from "@/@types/refs.types.ts";
import {RefsService} from "@/services/web-api/refs.service.ts";

export const useRefsStore = defineStore('refsStore', () => {
  const billTypesRefs = computed(() => [
    { name: "Наличные", value: BillTypeEnum.CASH },
    { name: "Банковский счет", value: BillTypeEnum.BANK_BILL },
    { name: "Карта", value: BillTypeEnum.CARD },
    { name: "Кредит", value: BillTypeEnum.CREDIT },
    { name: "Депозит", value: BillTypeEnum.DEPOSIT },
  ])

  const initRefs = async () => {
    await Promise.all([
      fetchCurrency()
    ])
  }

  const currencyRefs: Ref<RefValueItem[]> = ref([])
  const fetchCurrency = async () => {
    currencyRefs.value = await RefsService.fetchRefValuesByRefCodeName('currency')
  }

  return {
    billTypesRefs,
    initRefs,
    currencyRefs
  }
})