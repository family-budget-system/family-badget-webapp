import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {BillTypeEnum, CurrencyEnum} from "@/@types/bills.types.ts";
import {BillItemType} from "@/modules/accounts/@types";
import {BillsService} from "@/services/web-api/bills.service.ts";


export const useBillsStore = defineStore("billsStore", () => {
  const bills: Ref<BillItemType[]> = ref([])

  const fetchBills = async () => {
    bills.value = await BillsService.fetchBills()
  }

  const getBillTypeTitle = (type: BillTypeEnum) => {
    if (BillTypeEnum.CASH === type) return "Наличные"
    else if (BillTypeEnum.CARD === type) return "Карта"
    else if (BillTypeEnum.BANK_BILL === type) return "Банковский счет"
    else if (BillTypeEnum.DEPOSIT === type) return "Депозит"
    else return "Кредит"
  }

  return {
    bills,
    fetchBills,
    getBillTypeTitle,
  }
})