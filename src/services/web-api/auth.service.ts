import {BASE_API_URL} from "@/config/const.ts";
import {Api} from "@/services/web-client.ts";
import {AuthorizationResponse, LoginPayload, UserInfoResponse} from "@/services/web-api/@types/AuthTypes.ts";


export class AuthService {
  private static baseUrl = BASE_API_URL

  public static async login(payload: LoginPayload) {
    const { data } = await Api.post(`${this.baseUrl}/auth/login`, payload)
    return data as AuthorizationResponse
  }

  public static async fetchUserInfo() {
    const { data } =  await Api.post(`${this.baseUrl}/auth/userInfo`)
    return data as UserInfoResponse
  }
}