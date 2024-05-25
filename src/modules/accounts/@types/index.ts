import {BillTypeEnum} from "@/@types/bills.types.ts";
import {RefValueItem} from "@/@types/refs.types.ts";


export interface CreateBillDto {
  title: string;

  billType: BillTypeEnum;

  currencyId: number;

  balance: number;
}

export interface BillItemType {
  id: number,
  title: string,
  billType: BillTypeEnum,
  balance: number,
  createdAt: string,
  updatedAt: string,
  transactions: any[],
  currency: RefValueItem,
}

export interface BillModelForm {
  title: string;
  billType: BillTypeEnum;
  currencyId: number | null;
  balance: string;
}