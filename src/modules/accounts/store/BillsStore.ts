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

  const getBillType = (type: BillTypeEnum): { icon: string, title: string } => {
    if (BillTypeEnum.CASH === type) return {
      title: "Наличные",
      icon: "cash"
    }
    else if (BillTypeEnum.CARD === type) return {
      title: "Карта",
      icon: "credit-card"
    }
    else if (BillTypeEnum.BANK_BILL === type) return {
      title: "Банковский счет",
      icon: "bank"
    }
    else if (BillTypeEnum.DEPOSIT === type) return {
      title: "Депозит",
      icon: "credit-card"
    }
    else return {
        title: "Кредит",
        icon: "credit-card"
      }
  }

  return {
    bills,
    fetchBills,
    getBillType,
  }
})