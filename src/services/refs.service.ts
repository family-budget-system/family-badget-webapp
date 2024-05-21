import {Api} from "@/services/web-client.ts";
import {RefValueItem} from "@/@types/refs.types.ts";


export class RefsService {
  public static refValuesUrl = "/reference-values"

  public static async fetchRefValuesByRefCodeName(refCodeName: string): Promise<RefValueItem[]> {
    const res = await Api.get(`${this.refValuesUrl}`, { params: { refCodeName } })
    return res.data
  }
}