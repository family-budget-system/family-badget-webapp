import {defineStore} from "pinia";
import {computed} from "vue";
import {BillTypeEnum, CurrencyEnum} from "@/@types/bills.types.ts";


export const useBillsStore = defineStore("billsStore", () => {
  const bills = computed(() => [
    {
      id: 1,
      billType: BillTypeEnum.CASH,
      balance: 11000,
      name: "Моя наличка",
      currency: CurrencyEnum.KZT,
    },
    {
      id: 2,
      billType: BillTypeEnum.CARD,
      balance: 122657,
      name: "Каспи ред",
      currency: CurrencyEnum.KZT,
    },
    {
      id: 3,
      billType: BillTypeEnum.CARD,
      balance: 122657,
      name: "Основная карта",
      currency: CurrencyEnum.KZT,
    }
  ])

  return {
    bills
  }
})