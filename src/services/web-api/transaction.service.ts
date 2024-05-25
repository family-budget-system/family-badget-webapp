import {PageableType} from "@/services/web-api/@types/pageable.types.ts";
import {Api} from "@/services/web-client.ts";
import {CreateTransactionType, OperationsList} from "@/modules/operations/@types";


export class TransactionService {
  private static baseUrl = 'transaction'

  public static async fetchTransactionList(options: PageableType): Promise<OperationsList> {
    const res = await Api.get(`${this.baseUrl}/list`, { params: options })
    return res.data
  }

  public static async createTransaction(payload: CreateTransactionType) {
    return await Api.post(`${this.baseUrl}`, payload)
  }
}