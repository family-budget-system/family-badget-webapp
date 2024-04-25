import {defineStore} from "pinia";
import {computed} from "vue";
import {BillTypeEnum} from "@/@types/bills.types.ts";

export const useRefsStore = defineStore('refsStore', () => {
  const billTypesRefs = computed(() => [
    { name: "Наличные", value: BillTypeEnum.CASH },
    { name: "Банковский счет", value: BillTypeEnum.BANK_BILL },
    { name: "Карта", value: BillTypeEnum.CARD },
    { name: "Кредит", value: BillTypeEnum.CREDIT },
    { name: "Депозит", value: BillTypeEnum.DEPOSIT },
  ])

  return {
    billTypesRefs
  }
})