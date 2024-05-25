import {BillItemType} from "@/modules/accounts/@types";
import {PageableDataResponse} from "@/@types";


export interface OperationsList extends PageableDataResponse {
  items: OperationItemType[]
}

export type OperationItemType = {
  id: number
  amount: number
  transaction_type: string
  payment_date: string
  payer: string
  comment: string
  createdAt: string
  updatedAt: string
  bill: BillItemType
  category: CategoryItemType
}

export type CategoryItemType = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  isDefault: boolean
}

export type CreateTransactionType = {
  transactionType: string
  billId: number
  amount: number
  categoryId: number
  paymentDate: string
  payer: string
  comment: string
}

