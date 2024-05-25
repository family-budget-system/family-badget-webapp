import {BillItemType, CreateBillDto} from "@/modules/accounts/@types";
import {Api} from "@/services/web-client.ts";


export class BillsService {
  public static baseUrl = "/bills"

  public static async saveNewBill(payload: CreateBillDto) {
    return await Api.post(`${this.baseUrl}`, payload)
  }

  public static async fetchBills(): Promise<BillItemType[]> {
    const res = await Api.get(`${this.baseUrl}`)
    return res.data
  }
}